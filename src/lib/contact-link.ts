export const CONTACT_EMAIL = "sbalaji1005@gmail.com";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

export function createContactMailto({ name, email, message }: ContactMessage) {
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}