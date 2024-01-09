import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/style.css";
import Navbar from "./composants/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "MovIA",
   description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={inter.className} style={{ backgroundColor: "#D9D9D9" }}>
          
            {children}
            <Navbar />

         </body>
      </html>
   );
}
