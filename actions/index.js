"use server";
import PaymentEmailTemplate from "@/components/form/PaymentEmailTemplate";
import {
  createUser,
  findUserByCredentials,
  getEventById,
  updateGoing,
  updateInterest,
} from "@/db/queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  const created = await createUser(user);
  redirect("/login");
}

async function performLogin(formData) {
  try {
    const credentials = {};
    credentials.email = formData.get("email");
    credentials.password = formData.get("password");

    const found = await findUserByCredentials(credentials);
    return found;
  } catch (err) {
    throw new Error(`User with email ${formData.get("email")} not found!`);
  }
}

async function updateEventInterested(eventId, authId) {
  try {
    await updateInterest(eventId, authId);
    revalidatePath("/");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function handleGoing(eventId, user) {
  try {
    await updateGoing(eventId, user?.id);
    await sendEmail(eventId, user);
    revalidatePath("/");
    redirect("/");
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function sendEmail(eventId, user) {
  const event = await getEventById(eventId);
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: user?.email,
      subject: "Payment Successful",
      react: PaymentEmailTemplate({ message }),
    });
  } catch (err) {
    throw err;
  }
}

export { registerUser, performLogin, updateEventInterested, handleGoing };
