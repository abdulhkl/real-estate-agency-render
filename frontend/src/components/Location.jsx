import { useState, useMemo, useEffect } from "react";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ['places']

export default function Location({ setGeoLocation, selectedPos }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GEOCODE_API_KEY,
        libraries,
    });
    if (!isLoaded) return <div>Loading...</div>;
    return <Map setGeoLocation={setGeoLocation} selectedPos={selectedPos} />;
}


function Map({ setGeoLocation, selectedPos }) {

    var defLat = 25.20
    var defLng = 55.27
    if (selectedPos) {
        defLat = +selectedPos[1]
        defLng = +selectedPos[0]
    }

    const center = useMemo(() => ({ lat: 25.20, lng: 55.27 }), []);
    const [selected, setSelected] = useState(null);

    const onMarkerPositionChanged = (e) => {
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
        setSelected({ lat, lng });
        setGeoLocation(lng, lat)
    }

    useEffect(() => {
        if (selectedPos) {
            setSelected({ lat: defLat, lng: defLng });
        }
    }, [])

    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} setGeoLocation={setGeoLocation} />
            </div>

            {selected ? (
                <GoogleMap
                    zoom={15}
                    center={selected}
                    mapContainerClassName="map-container"

                >

                    <Marker onDragEnd={onMarkerPositionChanged}
                        position={selected} draggable={true} />
                </GoogleMap>

            ) : (
                <GoogleMap
                    zoom={10}
                    center={center}
                    id="myMarker" mapContainerClassName="map-container"

                >
                </GoogleMap>
            )}
        </>
    );
}

const PlacesAutocomplete = ({ setSelected, setGeoLocation }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
        setGeoLocation(lng, lat)
        console.log(lng)
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};