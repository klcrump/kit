import Link from "next/link";

export function Wordmark() {
  return <Link href="/" aria-label="Kit home" className="font-display text-[2.75rem] leading-none tracking-[-0.07em] text-primary-dark">Kit<span className="text-accent">.</span></Link>;
}
