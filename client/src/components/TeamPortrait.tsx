/** Civic Signal Field component: consistent editorial portrait treatment with an initials fallback for team profiles without an approved photo. */
import { cn } from "@/lib/utils";
import { type TeamMember } from "@/data/traceData";

export function TeamPortrait({ member, className, imageClassName }: { member: TeamMember; className?: string; imageClassName?: string }) {
  const fallbackTone = member.color === "teal" ? "bg-trace-mint text-trace-navy" : member.color === "orange" ? "bg-trace-sand text-trace-ink" : "bg-trace-ink text-white";
  if (member.image) return <div className={cn("overflow-hidden bg-trace-paper", className)}><img src={member.image} alt={`Portrait of ${member.name}`} className={cn("h-full w-full object-contain object-center", imageClassName)} /></div>;
  return <div className={cn("grid place-items-center font-display font-extrabold", fallbackTone, className)}>{member.initials}</div>;
}
