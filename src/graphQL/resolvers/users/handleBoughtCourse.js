const User =  require('../../../models/user');
const Course =  require('../../../models/course');
const { TransformObject } = require('./merge');
const { sendEmail } = require('../../helpers/sendEmail');
const { emailTemplate, emailTemplate2 } = require('../../helpers/emailTemplates/handleBoughtCourse');

exports.handleBoughtCourse = async (args, req) => {
  try {
   const courseIdBuyerPaidFor = args.courseId;
   const amountOwedToSeller = deductPercentageFromPayout(+args.amountPaid, 0.10);
   
   const buyer = await User.findById(req.userId);
   buyer.paidCourses.push(courseIdBuyerPaidFor);
   await buyer.save();
   
   const coursePaidFor = await Course.findById(args.courseId);
   if (!coursePaidFor.studentsEnrolled) {
     coursePaidFor.studentsEnrolled = 1;
   } else {
     coursePaidFor.studentsEnrolled += 1;
   }
   await coursePaidFor.save();
   
   const seller = await User.findById(coursePaidFor.creator);
   seller.moneyMade += amountOwedToSeller;
   sendEmail(seller.email, 'Someone purchased your course!!', emailTemplate);
   sendEmail(buyer.email, 'Thanks for purchasing a course!', emailTemplate2(buyer.name, coursePaidFor));
   await seller.save();
   return TransformObject(buyer);
  } catch (e) {
    throw e;
  }
};

const deductPercentageFromPayout = (num, percentage) => {
  return num - (num * percentage);
};
