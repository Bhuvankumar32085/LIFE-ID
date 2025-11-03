export const generateBloodConsentEmail = (
  userName: string,
  bloodGroup: string,
  hospital: string,
  city: string,
  phone: string
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Blood Donation Request</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f7fa;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      h1 {
        color: #e11d48; /* red accent */
      }
      p {
        font-size: 16px;
        line-height: 1.6;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #3b82f6;
        color: #fff;
        text-decoration: none;
        border-radius: 6px;
        margin-top: 20px;
      }
      .footer {
        font-size: 12px;
        color: #888;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Hi ${userName},</h1>
      <p>There is an urgent request for <strong>${bloodGroup}</strong> blood in <strong>${city}</strong> at <strong>${hospital}</strong> Phone: <strong>${phone}</strong>.</p>
      <p>If you are willing to donate your blood, please confirm your consent by clicking the button below:</p>
      <a href="#" class="button">I Want to Donate</a>
      <p class="footer">Thank you for helping save lives!</p>
    </div>
  </body>
  </html>
  `;
};


export const sendEmailForNeededPersonHtml = (
  email: string,
  name: string,
  city: string,
  state: string,
  phone: string
) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Blood Request Accepted</title>
      <style>
        body {
          font-family: "Segoe UI", Roboto, Arial, sans-serif;
          background-color: #f9fafb;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          background: #ffffff;
          margin: 40px auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #d32f2f;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 30px;
        }
        h2 {
          color: #d32f2f;
          margin-top: 0;
        }
        .details {
          background-color: #f4f6f8;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          line-height: 1.6;
        }
        .details strong {
          color: #333;
        }
        .footer {
          text-align: center;
          padding: 15px;
          font-size: 13px;
          color: #777;
          border-top: 1px solid #eee;
        }
        .button {
          display: inline-block;
          padding: 12px 20px;
          background-color: #d32f2f;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          margin-top: 20px;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Good News!</h1>
        </div>

        <div class="content">
          <h2>Your Blood Request Has Been Accepted ❤️</h2>
          <p>Dear Recipient,</p>
          <p>We are happy to inform you that <strong>${name}</strong> from <strong>${city}, ${state}</strong> has accepted your blood request and is willing to donate blood.</p>
          
          <div class="details">
            <p><strong>Donor Details:</strong></p>
            <p>👤 Name: ${name}</p>
            <p>📍 Location: ${city}, ${state}</p>
            <p>📞 Contact: <a href="tel:${phone}">${phone}</a></p>
            <p>📧 Email: <a href="mailto:${email}">${email}</a></p>
          </div>

          <p>Please contact the donor as soon as possible to coordinate the donation process. Be polite and make sure to confirm all medical requirements before meeting.</p>

          <a href="mailto:${email}" class="button">Contact Donor</a>
        </div>

        <div class="footer">
          <p>Thank you for using our Blood Donation Network ❤️<br />
          Together, we save lives.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};
