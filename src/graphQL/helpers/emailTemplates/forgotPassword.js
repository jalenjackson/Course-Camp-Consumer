exports.emailTemplate = (token) => {
  return `
  <div>
    <h1 style="display: block; margin: 0 auto; margin-top: 30px;font-size: 20px; text-align: center;font-family: Helvetica; color: rgb(80, 80, 90); font-weight: lighter;">Hey! You requested a password reset. If this wasn't you then ignore this message please.</h1>
      <a href="http://localhost:5000/reset-password/${ token }" style="color: white; text-decoration: none;">
        <button style="display: block; cursor: pointer; margin: 0 auto; padding: 1rem; margin-top: 40px; border: none; font-size: 17px; font-family: Arial; font-weight: lighter; letter-spacing: .5px; color: white; border-radius: 6px; background: #9881B1">
          Reset Password
        </button>
      </a>
  </div>
`;
};