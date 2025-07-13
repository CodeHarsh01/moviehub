import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/Nav";
import{Roboto} from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
})

export const metadata = {
  title: "Moviehub",
  description: "Review platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Nav/>
        {children}
      </body>
    </html>
  );
}
