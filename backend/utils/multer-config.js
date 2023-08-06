
const multer = require("multer");
let path = require('path');
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
// configure multer for your server folder
var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (req.body.email) {
            var folder = 'users'
        } else {
            var folder = 'properties'
        }
        const path = `./frontend/public/images/${folder}`;
        callback(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

//Filter the image type
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { //If the file uploaded is not any of this file type

        // If error in file type, then attacch this error to the request header
        req.fileValidationError = "You can upload only image files";
        return cb(null, false, req.fileValidationError);
    }
    cb(null, true)
};

//Here we configure what our storage and filefilter will be, which is the storage and imageFileFilter we created above
exports.upload = multer({ storage: storage, fileFilter: imageFileFilter })


const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_AWS,
    secretAccessKey: process.env.ACCESS_SECRET_AWS,
});

//Here we configure what our storage and filefilter will be, which is the storage and imageFileFilter we created above
exports.upload = multer({ storage: storage, fileFilter: imageFileFilter })



exports.uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: "real-estate-agency-app",
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            if (req.body.email) {
                var folder = 'users'
            } else {
                var folder = 'properties'
            }
            cb(null, `${folder}/${Date.now() + "-" + file.originalname}`);
        },
    }),
    if(err) {
        // your error handling goes here
    }
});