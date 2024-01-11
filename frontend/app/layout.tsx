import type { Metadata } from "next";
import { Poppins } from "next/font/google";
<<<<<<< Updated upstream
import "./css/style.css";
=======
>>>>>>> Stashed changes
import Navbar from "./composants/Navbar";
import "./css/style.css";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
   title: "MovIA",
   description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={poppins.className} style={{ backgroundColor: "#6c757d" }}>
            {children}
            <Navbar />
         </body>
      </html>
   );
}
