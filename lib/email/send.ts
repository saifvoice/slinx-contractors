// Minimal transactional email wrapper around the Resend API. Gated behind
// RESEND_API_KEY so the app runs fine without it configured (emails are
// just skipped with a console note) — that keeps local dev and the demo
// deployment working without requiring every env var up front.

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "S-LINx Contractors <notifications@slinxcontractors.com>";

  if (!apiKey) {
    console.log(`[email skipped — RESEND_API_KEY not set] to=${to} subject="${subject}"`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject, html }),
    });

    if (!res.ok) {
      console.error("Failed to send email:", await res.text());
    }
  } catch (err) {
    // Email failures should never break the form submission itself.
    console.error("Email send error:", err);
  }
}

export function notifyTeamOfQuoteRequest(data: { name: string; email: string; service: string; message: string }) {
  const teamEmail = process.env.SALES_TEAM_EMAIL ?? "sales@slinxcontractors.com";
  return sendEmail({
    to: teamEmail,
    subject: `New quote request — ${data.name}`,
    html: `<p><strong>${data.name}</strong> (${data.email}) requested a quote for <strong>${data.service}</strong>.</p><p>${data.message}</p>`,
  });
}

export function notifyTeamOfContactMessage(data: { name: string; email: string; subject: string; message: string }) {
  const teamEmail = process.env.SUPPORT_TEAM_EMAIL ?? "hello@slinxcontractors.com";
  return sendEmail({
    to: teamEmail,
    subject: `New contact message — ${data.subject}`,
    html: `<p><strong>${data.name}</strong> (${data.email}) sent: ${data.message}</p>`,
  });
}

export function notifyTeamOfApplication(data: { fullName: string; email: string; jobTitle: string }) {
  const hrEmail = process.env.HR_TEAM_EMAIL ?? "careers@slinxcontractors.com";
  return sendEmail({
    to: hrEmail,
    subject: `New application — ${data.jobTitle}`,
    html: `<p><strong>${data.fullName}</strong> (${data.email}) applied for <strong>${data.jobTitle}</strong>.</p>`,
  });
}
