import { useMemo } from "react";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import Marker from '../assets/png/marker.png';
import BackButton from "./BackButton";


function Map({ lat, lng, photo, title, location }) {
    const center = useMemo(() => ({ lat: lat, lng: lng }), []);
    return (
        <GoogleMap zoom={16} center={center} mapContainerClassName="map-container mb-10">
            <MarkerF position={center} draggable={false}
                icon={{
                    path:
                        'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
                    fillColor: '#3662e3',
                    fillOpacity: 1.0,
                    strokeWeight: 5,
                    scale: .4
                }}
            />
            <InfoWindow options={{ pixelOffset: new window.google.maps.Size(0, -5) }}
                position={center}
            >
                <div className="infowindow">
                    {(photo) && (
                        <img src={photo} />
                    )}
                    <p><strong className="text-base">{title} sadad ad sdad adad add</strong><br />
                        {location}</p>

                </div>
            </InfoWindow>
        </GoogleMap >
    );
}

export default Map