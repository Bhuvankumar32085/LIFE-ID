import {
  generateBloodConsentEmail,
  sendEmailForNeededPersonHtml,
} from "./htmlEmail";
import { transporter } from "./nodemailer";

const FROM_EMAIL = '"Bhuvan-Life-ID-App" <no-reply@pateleats.com>';

export const sendEmailForBloodDonation = async ({
  email,
  userName,
  bloodGroup,
  hospital,
  city,
  phone,
}: {
  email: string;
  userName: string;
  bloodGroup: string;
  hospital: string;
  city: string;
  phone: string;
}) => {
  const html = generateBloodConsentEmail(
    userName,
    bloodGroup,
    hospital,
    city,
    phone
  );

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Urgent Blood Donation Request",
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

//ye email tab send karni jab koy user blood dene ke liye accept kar leta hai
export const sendEmailForNeededPerson = async (
  email: string,
  foremail: string,
  name: string,
  city: string,
  state: string,
  phone: string
) => {
  const html = sendEmailForNeededPersonHtml(foremail, name, city, state, phone);

  try {
    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: "Your Blood Request Has Been Accepted",
      html,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};
