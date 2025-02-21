// app/api/contact/route.ts
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
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'rhythmjain523@gmail.com',
        pass: process.env.EMAIL_PASS || 'liuyzhlggolbyqka',
      },
    });

    const mailOptions = {
      from: email,
      to: 'monkeydluffy82107@gmail.com',
      replyTo: email,
      subject: `New message from ${username}`,
      html: `
        <p>Dear Rishav Sethi,</p>
        <p>${message}</p>
        <p>Contact: ${phone}</p>
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