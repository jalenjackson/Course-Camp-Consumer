
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
  storage: multerS3({
    s3: s3,
    bucket: 'brainflop-froala',
    metadata: function (req, file, cb) {
      console.log(req)
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
});

module.exports = upload;
