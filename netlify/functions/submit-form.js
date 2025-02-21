const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, phone, message } = JSON.parse(event.body);

  // Validate fields
  if (!name || !email || !phone || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'All fields are required' })
    };
  }

  // Set up nodemailer transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    // Send email using the user's email address in the from field
    await transporter.sendMail({
      from: `"${name}" <${email}>`,  // Use the user's actual email
      to: 'monkeydluffy82107@gmail.com',
      subject: `New contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error submitting form' })
    };
  }
};