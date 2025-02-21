// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  console.log('Request method:', req.method);
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));
  
  console.log('API route hit:', new Date().toISOString());
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const body = await req.json();
    console.log('Request body received:', JSON.stringify(body));
    
    const { username, email, phone, message } = body;

    if (!username || !email || !phone || !message) {
      console.log('Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Configure transport with detailed logging
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'rhythmjain523@gmail.com',
        pass: process.env.EMAIL_PASS || 'liuyzhlggolbyqka',
      },
      debug: true, // Enable debug logs
      logger: true // Log to console
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER || 'rhythmjain523@gmail.com'}>`,
      to: 'monkeydluffy82107@gmail.com',
      replyTo: email,
      subject: `New message from ${username}`,
      html: `
        <p>Dear Rishav Sethi,</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Contact Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <br />
        <p>Best Regards,</p>
        <p>${username}</p>
      `,
    };

    console.log('Attempting to send email with options:', JSON.stringify(mailOptions));
    
    // Send mail with enhanced error handling
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return NextResponse.json(
      { message: 'Email sent successfully', id: info.messageId },
      { 
        status: 200,
        headers: corsHeaders
      }
    );
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { error: 'Error sending email', details: (error as Error).message },
      { 
        status: 500,
        headers: corsHeaders
      }
    );
  }
}