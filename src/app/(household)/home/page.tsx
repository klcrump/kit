import type { Metadata } from "next";
import { HomeExperience } from "@/features/home/home-experience";

export const metadata: Metadata = { title: "Home · Kit" };

export default function HomePage() {
  return <HomeExperience />;
}
