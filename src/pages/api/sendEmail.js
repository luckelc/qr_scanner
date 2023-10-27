// Import the necessary modules
import nodemailer from 'nodemailer';

// This is your Next.js API route handler
export default async function handler(req, res) {
  // Check if the method is POST
  if (req.method === 'POST') {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "QrCodeScoreHunt@outlook.com",
        pass: "zPt54N69d8SuwVL"
      }
    });

    // Define your mail options
    const mailOptions = {
      from: "QrCodeScoreHunt@outlook.com",
      to: req.body.content,
      subject: "Sending an email with nodejs",
      text: "Wow, that was simple!"
    };

    console.log(mailOptions);

    // Try to send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
      res.status(200).json({ success: true, message: "Email sent successfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Email sending failed" });
    }
  } else {
    // If the method is not POST, return an error
    res.status(405).json({ error: 'Method not allowed' });
  }
}
