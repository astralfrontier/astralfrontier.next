import type { Metadata } from "next";
import "./globals.scss";
import AstralNavbar from "./AstralNavbar";
import AstralFooter from "./AstralFooter";

export const metadata: Metadata = {
  title: "Astral Frontier",
  description: "Site metadata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="container">
          <AstralNavbar />
        </header>
        <main className="container">{children}</main>
        <footer className="container">
          <AstralFooter />
        </footer>
      </body>
    </html>
  );
}
