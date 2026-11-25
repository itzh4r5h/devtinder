export const forgotPasswordOtp = ({ name, otp, expiresInMins }) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your DevTinder password</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #09090f;
  font-family: Arial, Helvetica, sans-serif;
">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#09090f">
    <tr>
      <td align="center" style="padding: 35px 12px;">

        <!-- Main container -->
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 560px;
            background-color: #111116;
            border: 1px solid #292431;
            border-radius: 16px;
            overflow: hidden;
          "
        >

          <!-- Logo -->
          <tr>
            <td align="center" style="padding: 35px 20px 25px;">
              <img
                src="https://ik.imagekit.io/hczmohsn7/devtinder/logo.png"
                alt="DevTinder"
                width="266"
                style="display: block; width: 100%; max-width: 266px; height: auto; border: 0;"
              />
            </td>
          </tr>

          <tr>
            <td style="padding: 15px 30px 35px;">

              <h1 style="
                margin: 0 0 15px;
                color: #ffffff;
                font-size: 25px;
                line-height: 1.3;
                text-align: center;
              ">
                Reset your password 🔐
              </h1>

              <p style="
                margin: 0 0 28px;
                color: #b9afc4;
                font-size: 15px;
                line-height: 1.7;
                text-align: center;
              ">
                Hey ${name}, we got a request to reset your
                DevTinder password. Use the code below to
                set a new one.
              </p>

              <!-- OTP box -->
              <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td
                    align="center"
                    bgcolor="#1b1721"
                    style="
                      padding: 18px 32px;
                      background-color: #1b1721;
                      border: 1px solid #b943ec;
                      border-radius: 14px;
                      box-shadow: 0 0 22px rgba(190, 65, 235, 0.35);
                    "
                  >
                    <span style="
                      color: #ffffff;
                      font-size: 32px;
                      font-weight: bold;
                      letter-spacing: 10px;
                      font-family: 'Courier New', Courier, monospace;
                    ">${otp}</span>
                  </td>
                </tr>
              </table>

              <!-- Expiry notice -->
              <p style="
                margin: 20px 0 0;
                color: #91869e;
                font-size: 12px;
                line-height: 1.6;
                text-align: center;
              ">
                This code expires in
                <strong style="color: #e58bc1;">${expiresInMins} minutes</strong>.
              </p>

              <!-- Security notice -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">
                <tr>
                  <td
                    bgcolor="#1b1721"
                    style="
                      padding: 15px;
                      background-color: #1b1721;
                      border: 1px solid #302938;
                      border-radius: 9px;
                      color: #a9a0b3;
                      font-size: 12px;
                      line-height: 1.7;
                    "
                  >
                    <strong style="color: #e0c8ed;">Security notice:</strong>
                    Never share this code with anyone. If you didn't
                    request a password reset, you can safely ignore
                    this email, your password won't change.
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 25px 20px; border-top: 1px solid #292431;">
              <p style="margin: 0 0 8px; color: #b9afc4; font-size: 12px;">
                Made for developers, by developer Harsh. ❤️
              </p>
              <p style="margin: 0; color: #72697e; font-size: 11px;">
                © 2026 DevTinder. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`
}
