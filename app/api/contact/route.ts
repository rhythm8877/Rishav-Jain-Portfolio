import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, phone, message } = body;

  if (!username || !email || !phone || !message) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: 'rhythmjain523@gmail.com', // Your email
        pass: 'liuyzhlggolbyqka', // App password or SMTP password
      },
    });

    const mailOptions = {
      from: email,
      to: 'rishav.sethi1806@gmail.com', // The email address entered by the user in the form
      replyTo: email,
      subject: `New message from ${username}`,
      html: `
        <p>Dear Rishav Sethi,</p>
        <p>${message}</p>
        <br />
        <p>Best Regards,</p>
        <p>${username}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    );
  }
} 