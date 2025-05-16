import dotenv from "dotenv"

dotenv.config()
export const verificationEmailTemplate = (token) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>
<body style="margin:0;padding:0;background:#f2f2f2;font-family:Arial,sans-serif;color:#333;">
  <table style="max-width:600px;margin:auto;background:#fff;padding:20px;border-radius:8px;">
    <tr>
      <td style="text-align:center;">
        <h2 style="color:#252f3d;">Verify Your Email</h2>
        <p>Thanks for signing up. Please enter the following verification code to complete your registration:</p>
        <h1 style="font-size:36px;margin:20px 0;color:#000;">${token}</h1>
        <p style="color:#888;">(Code valid for 10 minutes)</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
export const resetPasswordTemplate = (token) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Reset Password</title>
</head>
<body style="background:#f4f6f8;font-family:Arial,sans-serif;padding:20px;">
  <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color:#ff6347;">Reset Your Password</h2>
    <p>Hello,</p>
    <p>You requested a password reset. Click the button below to proceed:</p>
    <p style="text-align:center;margin:30px 0;">
      <a href="${process.env.FRONTEND_URL}/reset-password/${token}" style="background:#ff6347;color:#fff;padding:12px 25px;border-radius:5px;text-decoration:none;">Reset Password</a>
    </p>
    <p>If you didn’t request this, you can ignore this email.</p>
    <p style="margin-top:40px;font-size:12px;color:#999;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
  </div>
</body>
</html>
`;

