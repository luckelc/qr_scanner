// Import the necessary modules
import nodemailer from "nodemailer";

// This is your Next.js API route handler
export default async function handler(req, res) {
	const htmlContent = `
	<!DOCTYPE html>
	<html>
	<head>
		<style>
			body {
				font-family: Arial, sans-serif;
			}
			.container {
				width: 80%;
				margin: auto;
				padding: 20px;
				border: 1px solid #ddd;
				border-radius: 5px;
			}
			.header {
				text-align: left;
				color: #333;
			}
			.message {
				margin-top: 20px;
				color: #666;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<h1 class="header">Submission Accepted</h1>
			<p class="message">Thank you for your submission. It has been accepted and is currently under review.</p>
			<p class="message">If you are selected as the winner, we will contact you again. Please keep an eye on your inbox.</p>
		</div>
	</body>
	</html>`;

	// Check if the method is POST
	if (req.method === "POST") {
		// Create a Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "hotmail",
			auth: {
				user: "QrCodeScoreHunt@outlook.com",
				pass: "zPt54N69d8SuwVL",
			},
		});

		// Define your mail options
		const mailOptions = {
			from: "QrCodeScoreHunt@outlook.com",
			to: req.body.content,
			subject: "Poängjakt bekräftelse",
			// text: "Wow, that was simple!",
			html: htmlContent,
		};

		console.log(mailOptions);

		// Try to send the email
		try {
			const info = await transporter.sendMail(mailOptions);
			console.log("Email sent: " + info.response);
			res.status(200).json({
				success: true,
				message: "Email sent successfully",
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				message: "Email sending failed",
			});
		}
	} else {
		// If the method is not POST, return an error
		res.status(405).json({ error: "Method not allowed" });
	}
}
