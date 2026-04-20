// app/api/send-form/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

type RequestPayload = {
  name?: string;
  phone?: string;
  message?: string;
  topic?: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function digitsOnly(v: string): string {
  return v.replace(/\D/g, "");
}

function normalizePhone(phone: string): string {
  let d = digitsOnly(phone);

  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (d.length === 10) d = "7" + d;
  if (!d.startsWith("7")) d = "7" + d;

  return d.slice(0, 11);
}

function validatePayload(data: RequestPayload) {
  const errors: Record<string, string> = {};

  const name = (data.name || "").trim();
  const phone = normalizePhone(data.phone || "");
  const message = (data.message || "").trim();
  const topic = (data.topic || "").trim();

  if (name.length < 2) {
    errors.name = "Введите имя (минимум 2 символа)";
  } else if (name.length > 50) {
    errors.name = "Имя не должно превышать 50 символов";
  }

  if (phone.length !== 11) {
    errors.phone = "Введите корректный номер телефона";
  }

  if (message.length < 10) {
    errors.message = "Сообщение должно быть минимум 10 символов";
  } else if (message.length > 500) {
    errors.message = "Сообщение не должно превышать 500 символов";
  }

  if (topic.length > 120) {
    errors.topic = "Тема не должна превышать 120 символов";
  }

  return {
    errors,
    normalized: {
      name,
      phone,
      message,
      topic,
    },
  };
}

function createEmailHTML(data: {
  name: string;
  phone: string;
  message: string;
  topic?: string;
}): string {
  const currentDate = new Date().toLocaleString("ru-RU");
  const formType = data.topic || "Форма обратной связи";

  return `
    <!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Заявка с сайта</title>
      </head>
      <body style="margin:0;padding:0;background:#f3f3f3;font-family:Arial,sans-serif;">
        <div style="width:100%;padding:24px 12px;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:14px;padding:28px 24px;box-sizing:border-box;">
            <h2 style="margin:0 0 12px;color:#000000;font-size:24px;line-height:1.3;">
              Заявка с сайта <span style="color:#203c97;">73полимер.рф</span>
            </h2>

            <p style="margin:0 0 20px;color:#666666;font-size:13px;">
              Время отправки: ${currentDate}
            </p>

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#444;">Форма</td>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#000;text-align:right;"><strong>${escapeHtml(formType)}</strong></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#444;">Имя</td>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#000;text-align:right;"><strong>${escapeHtml(data.name)}</strong></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#444;">Телефон</td>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#000;text-align:right;"><strong>${escapeHtml(data.phone)}</strong></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#444;vertical-align:top;">Сообщение</td>
                <td style="padding:12px 0;border-bottom:1px solid #eeeeee;color:#000;text-align:right;"><strong>${escapeHtml(data.message)}</strong></td>
              </tr>
            </table>

            <div style="margin-top:20px;font-size:12px;color:#777777;">
              Аналитический центр развитие
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpTo = process.env.FORM_TO_EMAIL;
const smtpCopy = process.env.FORM_COPY_EMAIL;

const transporter =
  smtpHost && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

export async function POST(request: NextRequest) {
  try {
    if (!transporter || !smtpTo || !smtpUser) {
      return NextResponse.json(
        { error: "Почтовый сервис не настроен на сервере" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as RequestPayload;
    const { errors, normalized } = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Ошибка валидации", fields: errors },
        { status: 400 }
      );
    }

    const subject = `Заявка с сайта от ${new Date().toLocaleString("ru-RU")}`;
    const html = createEmailHTML(normalized);

    await transporter.sendMail({
      from: `"Аналитический центр развитие" <${smtpUser}>`,
      to: smtpTo,
      subject,
      html,
    });

    if (smtpCopy) {
      await transporter.sendMail({
        from: `"Аналитический центр развитие" <${smtpUser}>`,
        to: smtpCopy,
        subject,
        html,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Форма успешно отправлена",
    });
  } catch (error) {
    console.error("send-form error:", error);

    return NextResponse.json(
      { error: "Ошибка отправки письма" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}