const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const videoExtensions = require('video-extensions');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'new-company-videos',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
  fileFilter: (req, file, cb) => {
    if (videoExtensions.some(ext => file.originalname.endsWith("." + ext))) {
      req.fileValidationError = false;
      return cb(null, true);
    }
    req.fileValidationError = true;
    return cb(new Error('Only Mov and Mp4 files are supported'));
  }
});

module.exports = upload;

