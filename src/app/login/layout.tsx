// src/app/login/layout.tsx

import React from "react";

export const metadata = {
  title: "ログイン",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
