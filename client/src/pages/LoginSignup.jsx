import React, { useState } from "react";
import AuthForm from "../components/AuthForm";

export default function LoginSignup({ onLogin }) {
  return <AuthForm onAuthSuccess={onLogin} />;
}
