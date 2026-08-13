/**
 * Sends the business owner an email notification for a new enquiry.
 *
 * Email delivery requires a verified sender domain for this project. Until that
 * is configured, this returns `{ sent: false, reason: 'email_not_configured' }`
 * and the enquiry is still stored safely in the database.
 */
export const OWNER_EMAIL = "Njokuesther923@gmail.com";

export type EnquiryEmailPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
  enquiryId: string;
};

export async function sendEnquiryNotification(
  _payload: EnquiryEmailPayload,
): Promise<{ sent: boolean; reason?: string }> {
  return { sent: false, reason: "email_not_configured" };
}
