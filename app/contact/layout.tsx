// app/contact/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – GBG | Reach & Get In Touch",
  description:
    "Get in touch with GBG. Contact our team for identity verification, KYC/AML, fraud prevention solutions, and more.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
