import nodemailer from 'nodemailer';

export async function sendVerificationEmail(to: string, code: string){
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // ou outro servidor SMTP
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const info = await transporter.sendMail({
    from: `"Seu App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Confirme seu email",
    text: `Seu código de verificação é: ${code}`,
    html: `<p>Seu código de verificação é: <strong>${code}</strong></p>`,
  });

  const failed = info.response

  console.log("Email =========================", failed);
}