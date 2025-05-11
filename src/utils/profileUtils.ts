
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

  // Has skills - give extra points for having multiple skills
  if (resume.skills && resume.skills.length > 0) {
    const baseSkillPoints = 10;
    const extraPoints = Math.min(resume.skills.length - 1, 5); // Up to 5 extra points for more skills
    score += baseSkillPoints + extraPoints;
  }

  // Certifications - bonus points
  if (resume.certifications && resume.certifications.length > 0) {
    score += Math.min(resume.certifications.length * 2, 8); // Up to 8 bonus points for certifications
  }

  // Languages - bonus points
  if (resume.languages && resume.languages.length > 0) {
    score += Math.min(resume.languages.length * 2, 7); // Up to 7 bonus points for languages
  }

  return Math.min(score, 100);
};

// Format relative time (e.g., "2 days ago")
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
};
