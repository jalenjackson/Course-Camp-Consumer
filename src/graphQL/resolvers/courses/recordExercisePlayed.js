const User =  require('../../../models/user');
const { TransformObject } = require('../users/merge');
const { createToken } = require("../global/createToken");

exports.recordExercisePlayed = async (args, req) => {
  try {
    const user = await User.findById(req.userId);
    let courseProgress = [{ courseId: args.courseId, exercisesPlayed: {} }];
    if (user.courseProgress && user.courseProgress.length > 0) courseProgress = user.courseProgress;
    let courseProgressIndex = courseProgress
      .findIndex(course => course.courseId === args.courseId );
    
    if (courseProgressIndex === -1) {
      courseProgress.push({ courseId: args.courseId, exercisesPlayed: {} });
      courseProgressIndex = courseProgress.length - 1;
    }
    
    const newCourseObject = courseProgress[courseProgressIndex].exercisesPlayed
      [`${ args.sectionIndex }-${ args.videoIndex }-${ args.exercise }`];
    
    if (newCourseObject) {
      JSON.parse(newCourseObject)[args.exercise] = args.score;
    } else {
      let tmpPlayedExercise = null;
      const exercisePlayed = courseProgress[courseProgressIndex].exercisesPlayed;
      if (typeof exercisePlayed === "string") {
        tmpPlayedExercise = JSON.parse(exercisePlayed);
      } else {
        courseProgress[courseProgressIndex].exercisesPlayed = {};
        tmpPlayedExercise = courseProgress[courseProgressIndex].exercisesPlayed;
      }
      tmpPlayedExercise[`${ args.sectionIndex }-${ args.videoIndex }-${ args.exercise }`] = args.score;
      courseProgress[courseProgressIndex].exercisesPlayed = JSON.stringify(tmpPlayedExercise);
    }
    
    user.courseProgress = courseProgress;
    user.markModified('courseProgress');
    user.save();
  
    const token = createToken(user);
    
    return { token, ...TransformObject(user) }
  } catch (e) {
    throw e;
  }
};