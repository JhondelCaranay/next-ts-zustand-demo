import Image from "next/image";
import { Inter } from "next/font/google";
import Column from "@/components/Column";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex h-screen min-h-screen w-full min-w-max items-center justify-center gap-2 bg-gray-700 ${inter.className}`}
    >
      <Column state="PLANNED" />
      <Column state="ONGOING" />
      <Column state="DONE" />
    </main>
  );
}
