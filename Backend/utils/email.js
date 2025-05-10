import { Resend } from "resend";
import {
  verificationEmailTemplate,
  resetPasswordTemplate,
} from "./emailTemplates.js";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email, token) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  try {
    const { data, error } = await resend.emails.send({
      from: "CrimeDB <onboarding@resend.dev>",
      to: [email],
      subject: "Verify Your Email",
      html: verificationEmailTemplate(verificationLink),
    });

    if (error) {
      console.error("Error sending verification email:", error);
      throw new Error("Failed to send verification email");
    }

    console.log("Verification email sent:", data);
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};

export const sendResetPasswordEmail = async (email, token) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  try {
    const { data, error } = await resend.emails.send({
      from: "CrimeDB <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password",
      html: resetPasswordTemplate(resetLink),
    });

    if (error) {
      console.error("Error sending reset password email:", error);
      throw new Error("Failed to send reset password email");
    }

    console.log("Reset password email sent:", data);
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  }
};
