
import { User, Resume } from "@/types";

export const calculateProfileCompletion = (user: User | null, resume: Resume | null): number => {
  if (!user) return 0;
  if (!resume) return 20; // User exists but no resume

  let score = 20; // Base score for having user account

  // Resume has basic info
  if (resume.contact && resume.contact.phone && resume.contact.email && resume.contact.location) {
    score += 20;
  }

  // Has summary
  if (resume.summary && resume.summary.length > 30) {
    score += 15;
  }

  // Has experience
  if (resume.experience && resume.experience.length > 0) {
    score += 20;
  }

  // Has education
  if (resume.education && resume.education.length > 0) {
    score += 15;
  }

  // Has skills
  if (resume.skills && resume.skills.length > 0) {
    score += 10;
  }

  return Math.min(score, 100);
};
