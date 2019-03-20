const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const accepted_extensions = ['jpg', 'png', 'gif', 'jpeg'];

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'course-camp-file-storage',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname)
    },
  }),
  fileFilter: (req, file, cb) => {
    const uploadedExtension = file.originalname.split('.').pop();
    if (accepted_extensions.some(ext => ext.toLowerCase() === uploadedExtension.toLowerCase() )) {
      req.fileValidationError = false;
      return cb(null, true);
    }
    req.fileValidationError = true;
    return cb(new Error('Only JPG, PNG, & GIF files are supported'));
  }
});

module.exports = upload;

