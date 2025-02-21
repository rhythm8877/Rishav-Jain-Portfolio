const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  }

  try {
    const { name, email, phone, message } = JSON.parse(event.body);

    // Validate fields
    if (!name || !email || !phone || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'All fields are required' })
      };
    }

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
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
      headers,
      body: JSON.stringify({ 
        message: 'Form submitted successfully',
        success: true 
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Error processing form submission',
        error: error.message
      })
    };
  }
};