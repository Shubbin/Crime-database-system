export const verificationEmailTemplate = (link) => `
  <html>
    <body style="background-color: #f0f8ff; color: #333;">
      <h1>Verify Your Email</h1>
      <p>Please click the link below to verify your email:</p>
      <a href="${link}" style="color: #1e90ff;">Verify Email</a>
    </body>
  </html>
`;

export const resetPasswordTemplate = (link) => `
  <html>
    <body style="background-color: #f0f8ff; color: #333;">
      <h1>Reset Your Password</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${link}" style="color: #1e90ff;">Reset Password</a>
    </body>
  </html>
`;