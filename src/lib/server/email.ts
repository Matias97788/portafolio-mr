import type { Lead } from "@/lib/types";
import nodemailer from "nodemailer";

type EmailConfig =
  | {
      kind: "smtp";
      toEmail: string;
      fromEmail: string;
      fromName: string;
      host: string;
      port: number;
      secure: boolean;
      user: string;
      pass: string;
    }
  | {
      kind: "brevo";
      apiKey: string;
      senderEmail: string;
      senderName: string;
      toEmail: string;
    };

export function getEmailConfig(): EmailConfig | null {
  const toEmail = process.env.LEADS_NOTIFY_EMAIL?.trim();
  if (!toEmail) return null;

  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? "0");
  const secure =
    (process.env.SMTP_SECURE ?? "").trim().toLowerCase() === "true" ||
    port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const fromEmail = process.env.EMAIL_FROM?.trim() ?? user ?? "";
  const fromName = process.env.EMAIL_FROM_NAME?.trim() ?? "Matías Rodríguez";

  if (host && port && user && pass && fromEmail) {
    return {
      kind: "smtp",
      toEmail,
      fromEmail,
      fromName,
      host,
      port,
      secure,
      user,
      pass,
    };
  }

  const apiKey = process.env.BREVO_API_KEY?.trim();
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL?.trim() ?? process.env.EMAIL_FROM?.trim();
  const senderName = process.env.BREVO_SENDER_NAME?.trim() ?? fromName;

  if (!apiKey || !senderEmail) return null;
  return { kind: "brevo", apiKey, senderEmail, senderName, toEmail };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatLeadHtml(lead: Lead) {
  const rows: Array<[string, string]> = [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Teléfono", lead.phone],
    ["Servicio", lead.service],
    ["Presupuesto", lead.budget ?? "—"],
    ["Sitio web", lead.websiteUrl ?? "—"],
    ["Mensaje", lead.message],
    ["Fecha", new Date(lead.createdAt).toLocaleString("es-CL")],
  ];

  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5; color: #111;">
      <h2 style="margin: 0 0 12px;">Nuevo lead desde el sitio</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${rows
            .map(
              ([k, v]) => `
              <tr>
                <td style="padding: 8px 10px; border: 1px solid #eee; width: 180px; background: #fafafa; font-weight: 600;">${escapeHtml(
                  k,
                )}</td>
                <td style="padding: 8px 10px; border: 1px solid #eee;">${escapeHtml(
                  v,
                )}</td>
              </tr>`,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `.trim();
}

function formatLeadText(lead: Lead) {
  const lines = [
    "Nuevo lead desde el sitio",
    "",
    `Nombre: ${lead.name}`,
    `Email: ${lead.email}`,
    `Teléfono: ${lead.phone}`,
    `Servicio: ${lead.service}`,
    `Presupuesto: ${lead.budget ?? "—"}`,
    `Sitio web: ${lead.websiteUrl ?? "—"}`,
    "",
    "Mensaje:",
    lead.message,
    "",
    `Fecha: ${new Date(lead.createdAt).toLocaleString("es-CL")}`,
  ];
  return lines.join("\n");
}

export async function sendLeadEmail(lead: Lead) {
  const cfg = getEmailConfig();
  if (!cfg) {
    throw new Error("EMAIL_CONFIG_MISSING");
  }

  const subject = `Nuevo lead: ${lead.name} · ${lead.service}`;

  if (cfg.kind === "smtp") {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    });

    await transporter.sendMail({
      from: { name: cfg.fromName, address: cfg.fromEmail },
      to: cfg.toEmail,
      replyTo: { name: lead.name, address: lead.email },
      subject,
      text: formatLeadText(lead),
      html: formatLeadHtml(lead),
    });

    return;
  }

  const payload = {
    sender: { name: cfg.senderName, email: cfg.senderEmail },
    to: [{ email: cfg.toEmail }],
    replyTo: { email: lead.email, name: lead.name },
    subject,
    htmlContent: formatLeadHtml(lead),
    textContent: formatLeadText(lead),
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": cfg.apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("EMAIL_SEND_FAILED");
}
