import React from "react";
import LoginForm from "../composants/Login";

export default function page() {
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
         }}
      >
         <LoginForm />
      </div>
   );
}
