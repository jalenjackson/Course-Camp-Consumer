const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

const s3 = new aws.S3();

const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
  storage: multerS3({
    s3: s3,
    limits: { fieldSize: 50 * 1024 * 1024 },
    bucket: 'brainflop-videos',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
});

module.exports = upload;
