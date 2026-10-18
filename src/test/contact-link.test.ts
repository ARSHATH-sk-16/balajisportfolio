import { describe, expect, it } from "vitest";

import { createContactMailto } from "@/lib/contact-link";

describe("createContactMailto", () => {
  it("addresses the contact message to the email listed on Balaji's resume", () => {
    expect(
      createContactMailto({
        name: "Asha",
        email: "asha@example.com",
        message: "Hello Balaji",
      }),
    ).toBe(
      "mailto:sbalaji1005@gmail.com?subject=Portfolio%20message%20from%20Asha&body=Name%3A%20Asha%0AEmail%3A%20asha%40example.com%0A%0AHello%20Balaji",
    );
  });
});