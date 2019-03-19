exports.emailTemplate = `
  <div>
    <h1 style="display: block; margin: 0 auto; margin-top: 30px;font-size: 20px; text-align: center;font-family: Helvetica; color: rgb(80, 80, 90); font-weight: lighter;">Someone just purchased your course! 💰💰💰 Sign in and check your balance to see how much you've earned!</h1>
      <a href="https://teamcoursecamp.com" style="color: white; text-decoration: none;">
        <button style="display: block; cursor: pointer; margin: 0 auto; padding: 1rem; margin-top: 40px; border: none; font-size: 17px; font-family: Arial; font-weight: lighter; letter-spacing: .5px; color: white; border-radius: 6px; background: #9881B1">
          Course Camp
        </button>
      </a>
  </div>
`;

exports.emailTemplate2 = (name, course) => {
 return  `
  <div>
    <h1 style="display: block; margin: 0 auto; margin-top: 30px;font-size: 20px; text-align: center;font-family: Helvetica; color: rgb(80, 80, 90); font-weight: lighter;">Hey ${ name } thanks so much for buying a course! The course <b>${ course.title }</b> is all yours! Make sure you are logged in when you are accessing any content on the course. If you have any questions or concerns feel free to email us at help@teamcoursecamp.com</h1>
      <a href="https://teamcoursecamp.com" style="color: white; text-decoration: none;">
        <button style="display: block; cursor: pointer; margin: 0 auto; padding: 1rem; margin-top: 40px; border: none; font-size: 17px; font-family: Arial; font-weight: lighter; letter-spacing: .5px; color: white; border-radius: 6px; background: #9881B1">
          Course Camp
        </button>
      </a>
  </div>
`;
};