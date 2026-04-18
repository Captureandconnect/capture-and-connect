/**
 * Cloudflare Pages Function — Contact form handler
 * Receives POST from the contact form, validates, and sends email via Hostnet SMTP.
 * Uses Cloudflare Workers TCP sockets (connect) for SMTP with STARTTLS.
 */

import { connect } from 'cloudflare:sockets';

interface Env {
  SMTP_HOST: string;    // smtp.hostnet.nl
  SMTP_PORT: string;    // 587
  SMTP_USER: string;    // info@captureandconnect.nl
  SMTP_PASS: string;    // password
  MAIL_TO: string;      // info@captureandconnect.nl
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function readResponse(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
  const { value } = await reader.read();
  return value ? decoder.decode(value) : '';
}

async function sendCommand(writer: WritableStreamDefaultWriter<Uint8Array>, command: string): Promise<void> {
  await writer.write(encoder.encode(command + '\r\n'));
}

async function sendSmtpEmail(env: Env, options: {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  replyTo: string;
  replyToName: string;
  subject: string;
  body: string;
}): Promise<void> {
  const socket = connect({
    hostname: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
  }, { secureTransport: 'starttls' });

  let reader = socket.readable.getReader();
  let writer = socket.writable.getWriter();

  // Read greeting
  await readResponse(reader);

  // EHLO
  await sendCommand(writer, 'EHLO captureandconnect.nl');
  await readResponse(reader);

  // STARTTLS
  await sendCommand(writer, 'STARTTLS');
  const tlsResp = await readResponse(reader);
  if (!tlsResp.startsWith('220')) {
    throw new Error('STARTTLS failed: ' + tlsResp);
  }

  // Release locks before TLS upgrade
  reader.releaseLock();
  writer.releaseLock();

  // Upgrade to TLS
  const secureSocket = socket.startTls();
  reader = secureSocket.readable.getReader();
  writer = secureSocket.writable.getWriter();

  // EHLO again after TLS
  await sendCommand(writer, 'EHLO captureandconnect.nl');
  await readResponse(reader);

  // AUTH PLAIN
  const credentials = btoa(`\0${env.SMTP_USER}\0${env.SMTP_PASS}`);
  await sendCommand(writer, `AUTH PLAIN ${credentials}`);
  const authResp = await readResponse(reader);
  if (!authResp.startsWith('235')) {
    throw new Error('AUTH failed: ' + authResp);
  }

  // MAIL FROM
  await sendCommand(writer, `MAIL FROM:<${options.from}>`);
  await readResponse(reader);

  // RCPT TO
  await sendCommand(writer, `RCPT TO:<${options.to}>`);
  await readResponse(reader);

  // DATA
  await sendCommand(writer, 'DATA');
  await readResponse(reader);

  // Compose message
  const message = [
    `From: "${options.fromName}" <${options.from}>`,
    `To: "${options.toName}" <${options.to}>`,
    `Reply-To: "${options.replyToName}" <${options.replyTo}>`,
    `Subject: ${options.subject}`,
    `Date: ${new Date().toUTCString()}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=UTF-8`,
    ``,
    options.body,
    ``,
    `.`,
  ].join('\r\n');

  await sendCommand(writer, message);
  const sendResp = await readResponse(reader);
  if (!sendResp.startsWith('250')) {
    throw new Error('Send failed: ' + sendResp);
  }

  // QUIT
  await sendCommand(writer, 'QUIT');

  reader.releaseLock();
  writer.releaseLock();
  await secureSocket.close();
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const formData = await context.request.formData();

    // Honeypot check
    const honeypot = formData.get('website');
    if (honeypot) {
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();
    const company = formData.get('company')?.toString().trim() || '';
    const service = formData.get('service')?.toString().trim() || '';

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please fill in all required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const timestamp = new Date().toISOString();

    // Send email via Hostnet SMTP
    await sendSmtpEmail(context.env, {
      from: context.env.SMTP_USER,
      fromName: 'Website Contact Form',
      to: context.env.MAIL_TO,
      toName: 'Capture & Connect',
      replyTo: email,
      replyToName: name,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ''}`,
      body: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        service ? `Service: ${service}` : null,
        ``,
        `Message:`,
        message,
        ``,
        `---`,
        `Sent via captureandconnect.nl contact form`,
        `Time: ${timestamp}`,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    console.log('CONTACT_SUBMISSION', JSON.stringify({ name, email, company, service, timestamp }));

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
