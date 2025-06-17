// src/app/signup/layout.tsx

import React from "react";

export const metadata = {
  title: "新規作成",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
