import Timeline from "@/component/Timeline";
import type { Metadata } from "next";

// ページ固有のメタデータ（App Router 方式）
export const metadata: Metadata = {
  title: "SNS Udemy",
  description: "SNS Udemy",
};

export default function Home() {
  return (
    <>
      <div>
        <Timeline />
      </div>
    </>
  );
}
