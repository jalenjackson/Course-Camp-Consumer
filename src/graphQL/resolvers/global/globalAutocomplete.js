const Course = require('../../../models/course');
const { TransformObject } = require('../courses/merge');

exports.globalAutocomplete = async (args) => {
  try {
    const queryREQ = args.term.replace(/[^a-zA-Z0-9 ]/g, '');
    const regex = new RegExp(queryREQ, 'i');
    const courses = await Course.find({
      $or: [{ title: regex }, { description: regex }, { category: regex }],
      'status': 'Approved'
    },
    { '_id': 1,
      'title': 1,
      'description': 1,
      'category': 1,
      'price': 1,
      'color': 1,
      'image': 1,
      'rating': 1,
      'creator': 1,
      'date': 1,
      'summary': 1,
      'sections': 1
    })
    .sort({ 'date':-1 })
    .skip(args.skip)
    .limit(args.limit);
  
    const result = { courseListLength: await Course.count({
        $or: [{ title: regex }, { description: regex }, { category: regex }]
      }) };
    result.courses = courses.map(course => {
      return TransformObject(course);
    });
    
    return result;
    
  } catch (e) { throw e }
};
