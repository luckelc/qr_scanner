import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "QrCodeScoreHunt@outlook.com",
      pass: "zPt54N69d8SuwVL"
    }
  });

  const mailOptions = {
    from: "QrCodeScoreHunt@outlook.com",
    to: req.body.content,
    subject: "Sending an email with nodejs",
    text: "Wow, that was simple!"
  };

  console.log(mailOptions);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ success: true, message: "Email sent successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
}
