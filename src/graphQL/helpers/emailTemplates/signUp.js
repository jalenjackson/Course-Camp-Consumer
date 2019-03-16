exports.emailTemplate = name => {
  return `
  <div>
    <h1 style="width: 65%; display: block; margin: 0 auto; margin-top: 30px;font-size: 20px; text-align: center;font-family: Helvetica; color: rgb(80, 80, 90); font-weight: lighter;">Hey ${ name }!! We are so stoked you signed up to Course Camp! Course Camp is a great website to learn a skill, or teach others to learn a skill.
    At Course Camp you can create highly interactive courses that will ensure success for the student.
    You can add quizzes, picture quizzes, matching games, coding challenges, coding projects, and crunch challenges to
    every video in every section. The possibilities are endless! </h1>
      <a href="https://teamcoursecamp.com" style="color: white; text-decoration: none;">
        <button style="display: block; cursor: pointer; margin: 0 auto; padding: 1rem; margin-top: 40px; border: none; font-size: 17px; font-family: Arial; font-weight: lighter; letter-spacing: .5px; color: white; border-radius: 6px; background: #9881B1">
          Course Camp
        </button>
      </a>
  </div>
`;
};