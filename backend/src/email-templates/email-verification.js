export const emailVerification = ({ name, verificationUrl, resendUrl }) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your DevTinder account</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #09090f;
  font-family: Arial, Helvetica, sans-serif;
">

  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    bgcolor="#09090f"
  >
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
                style="
                  display: block;
                  width: 100%;
                  max-width: 266px;
                  height: auto;
                  border: 0;
                "
              />

            </td>
          </tr>

          <!-- Welcome section -->
          <tr>
            <td style="padding: 15px 30px 35px;">

              <h1 style="
                margin: 0 0 15px;
                color: #ffffff;
                font-size: 27px;
                line-height: 1.3;
                text-align: center;
              ">
                Welcome aboard! 👋
              </h1>

              <p style="
                margin: 0 0 30px;
                color: #b9afc4;
                font-size: 15px;
                line-height: 1.7;
                text-align: center;
              ">
                Hey ${name}, we're excited to have you
                join DevTinder!

                Connect with amazing developers,
                discover opportunities, and build
                something meaningful together.
              </p>

              <!-- Verification heading -->
              <h2 style="
                margin: 0 0 12px;
                color: #ffffff;
                font-size: 20px;
                text-align: center;
              ">
                Verify your email address
              </h2>

              <p style="
                margin: 0 0 28px;
                color: #a9a0b3;
                font-size: 14px;
                line-height: 1.7;
                text-align: center;
              ">
                You're just one step away!

                Confirm your email address to activate
                your account and get started with DevTinder.
              </p>

              <!-- Verification CTA -->
              <table
                role="presentation"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#c13cbb"
                    style="
                      background-color: #c13cbb;
                      background-image: linear-gradient(
                        135deg,
                        #b943ec,
                        #e442a4
                      );
                      border: 1px solid #f1c9f7;
                      border-radius: 18px;
                      box-shadow: 0 0 22px rgba(190, 65, 235, 0.45);
                    "
                  >
                    <a
                      href="${verificationUrl}"
                      target="_blank"
                      style="
                        display: inline-block;
                        padding: 15px 30px;
                        color: #ffffff;
                        font-size: 16px;
                        font-weight: bold;
                        text-decoration: none;
                        border-radius: 18px;
                        letter-spacing: 0.2px;
                      "
                    >
                      &#10003;&nbsp; Verify Email Address
                    </a>
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
                This verification link expires in
                <strong style="color: #e58bc1;">
                  15 minutes
                </strong>.
              </p>

              <!-- Divider -->
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 30px;"
              >
                <tr>
                  <td style="
                    border-top: 1px solid #302938;
                  "></td>
                </tr>
              </table>

              <!-- Resend section -->
              <h3 style="
                margin: 25px 0 10px;
                color: #ffffff;
                font-size: 16px;
                text-align: center;
              ">
                Link expired? Don't worry! 😊
              </h3>

              <p style="
                margin: 0 0 15px;
                color: #a9a0b3;
                font-size: 13px;
                line-height: 1.7;
                text-align: center;
              ">
                If your verification link has expired,
                no worries!

                Just click the link below to request
                a fresh verification email.
              </p>

              <p style="
                margin: 0;
                text-align: center;
              ">
                <a
                  href="${resendUrl}"
                  target="_blank"
                  style="
                    color: #e58bc1;
                    font-size: 14px;
                    font-weight: bold;
                    text-decoration: underline;
                  "
                >
                  Resend verification email →
                </a>
              </p>

              <!-- Security notice -->
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 30px;"
              >
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
                    <strong style="color: #e0c8ed;">
                      Security notice:
                    </strong>

                    If you didn't create a DevTinder account,
                    you can safely ignore this email.

                    Your account won't be activated until
                    your email is verified.
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding: 25px 20px;
                border-top: 1px solid #292431;
              "
            >
              <p style="
                margin: 0 0 8px;
                color: #b9afc4;
                font-size: 12px;
              ">
                Made for developers, by developer Harsh. ❤️
              </p>

              <p style="
                margin: 0;
                color: #72697e;
                font-size: 11px;
              ">
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
