exports.emailTemplate = (name, question) => {
  return `
  <div>
    <h1 style="display: block; margin: 0 auto; margin-top: 30px;font-size: 20px; text-align: center;font-family: Helvetica; color: rgb(80, 80, 90); font-weight: lighter;">Hey ${ name } you asked a question recently. <b>${ question.title }</b>. Someone just answered your question!</h1>
      <a href="https://teamcoursecamp.com/community/${ question._id }" style="color: white; text-decoration: none;">
        <button style="display: block; cursor: pointer; margin: 0 auto; padding: 1rem; margin-top: 40px; border: none; font-size: 17px; font-family: Arial; font-weight: lighter; letter-spacing: .5px; color: white; border-radius: 6px; background: #9881B1">
          View Answer
        </button>
      </a>
  </div>
`;
};