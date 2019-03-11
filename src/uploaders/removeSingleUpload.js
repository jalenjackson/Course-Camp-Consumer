const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'us-east-1',
});

let s3 = new aws.S3();

exports.remove = (req, res) => {
  s3.deleteObject({  Bucket: 'new-company', Key: req.body.fileId }, function(err) {
    if (err) {
      res.status(500).json({
        error: true
      })
    } else {
      res.status(200).json({
        message: 'Delete request successful'
      })
    }
  });
};
