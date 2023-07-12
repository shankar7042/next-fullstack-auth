import nodemailer from "nodemailer";
import crypto from "crypto";
import User from "@/models/userModel";

export async function sendMail({
  emailId,
  userId,
  emailType,
}: {
  emailId: string;
  userId: string;
  emailType: "VERIFY" | "RESET";
}) {
  try {
    const hashedToken = crypto.randomBytes(40).toString("base64url");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1000 * 60 * 60 * 2,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 15,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME!,
        pass: process.env.MAILTRAP_PASSWORD!,
      },
    });

    const info = await transporter.sendMail({
      from: "next-fullstack@test.com",
      to: emailId,
      subject: `${
        emailType === "VERIFY"
          ? "Please verify your account"
          : "Reset your Password"
      }`,
      html: `<p>Click below link to ${
        emailType === "VERIFY" ? "verify your account" : "reset your password"
      }</p><br>
             <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}">Click here</a> <br>
             OR <br>
             copy and paste the link below in your browser. <br> ${
               process.env.DOMAIN
             }/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}`,
    });

    return info;
  } catch (error: any) {
    console.log(error.message);
  }
}
