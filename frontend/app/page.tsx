import { Typography } from "@mui/material";
import LoginForm from "./composants/Login";
import "./css/style.css";

export default function Home() {
   return (
      <main>
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100vh",
               flexDirection: "column",
            }}
         >
            <Typography variant="h4" padding={2}>
               Bienvenue sur MovIA
            </Typography>
            <LoginForm />
         </div>
      </main>
   );
}
