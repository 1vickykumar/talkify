export const welcomeEmailTemplate = (userName, clientURL) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" 
            style="background:#ffffff; margin:40px 0; border-radius:8px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

            <!-- Header -->
            <tr>
              <td style="background:#4f46e5; padding:30px; text-align:center; color:white;">
                <h1 style="margin:0;">Welcome 🚀</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333;">
                <h2>Hi ${userName},</h2>

                <p style="font-size:16px; line-height:1.6;">
                  Your account has been successfully created.
                </p>

                <p style="font-size:16px; line-height:1.6;">
                  We're excited to have you onboard!
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a href="${clientURL}"
                     style="background:#4f46e5; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-size:16px;">
                    Go to Dashboard
                  </a>
                </div>

                <p style="font-size:14px; color:#666;">
                  If you didn’t create this account, please ignore this email.
                </p>

                <p style="margin-top:30px;">
                  Cheers,<br/>
                  <strong>Your Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f4f6f8; padding:20px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};