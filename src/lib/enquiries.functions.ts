import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  message: z.string().trim().min(5, "Please enter your message").max(2000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: row, error } = await supabaseAdmin
      .from("enquiries")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("Failed to save enquiry", error);
      throw new Error("We could not submit your enquiry. Please try again.");
    }

    let emailed = false;
    let emailError: string | null = null;

    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      const result = await sendTemplateEmail("enquiry-notification", "Njokuesther923@gmail.com", {
        templateData: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
        },
        idempotencyKey: `enquiry-notification-${row.id}`,
      });
      emailed = result.sent === true;
      if (!emailed) emailError = result.reason ?? "not_sent";
    } catch (err) {
      emailError = err instanceof Error ? err.message : "email_unavailable";
      console.error("Failed to email enquiry", err);
    }

    await supabaseAdmin
      .from("enquiries")
      .update({
        email_status: emailed ? "sent" : "failed",
        email_error: emailError,
      })
      .eq("id", row.id);

    if (!emailed) {
      throw new Error(
        "Your enquiry was saved but we could not email it right now. Please reach us on WhatsApp so we can respond immediately.",
      );
    }

    return { id: row.id, emailed: true };
  });
