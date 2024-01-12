import React from "react";
import LoginForm from "../composants/Login";

export default function page() {
   return (
      <div
         style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "110vh",
            flexDirection: "column",
            width: "60%",
            margin: " 0 auto",
         }}
      >
         <LoginForm />
      </div>
   );
}
