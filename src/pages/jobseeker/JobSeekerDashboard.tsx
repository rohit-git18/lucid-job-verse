
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useJobs } from "@/contexts/JobContext";
import { api } from "@/services/api";
import { JobApplication, Resume } from "@/types";
import { calculateProfileCompletion } from "@/utils/profileUtils";
import ProfileProgressSection from "@/components/jobseeker/ProfileProgressSection";
import RecentApplicationsSection from "@/components/jobseeker/RecentApplicationsSection";
import RecommendedJobsSection from "@/components/jobseeker/RecommendedJobsSection";
import ProfileSection from "@/components/jobseeker/ProfileSection";
import QuickActionsSection from "@/components/jobseeker/QuickActionsSection";

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const { jobs } = useJobs();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendedJobs, setRecommendedJobs] = useState<typeof jobs>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        if (!user) return;

        // Fetch applications
        const userApplications = await api.getApplicationsForUser(user.id);
        setApplications(userApplications);

        // Fetch resume
        try {
          const userResume = await api.getResume(user.id);
          setResume(userResume);
        } catch (error) {
          setResume(null);
        }

        // Generate recommended jobs based on skills
        if (jobs.length > 0) {
          let recommended;
          if (resume && resume.skills && resume.skills.length > 0) {
            // Recommend based on skills
            recommended = jobs.filter(job => 
              job.skills.some(skill => resume.skills.includes(skill))
            );
          } else {
            // If no skills, just show recent jobs
            recommended = jobs;
          }
          setRecommendedJobs(recommended.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user, jobs]);

  const profileCompletion = calculateProfileCompletion(user, resume);

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-jobportal-primary/10 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ProfileProgressSection 
              user={user} 
              resume={resume} 
              profileCompletion={profileCompletion} 
            />
            <RecentApplicationsSection 
              applications={applications} 
              jobs={jobs} 
            />
            <RecommendedJobsSection 
              jobs={recommendedJobs} 
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProfileSection user={user} resume={resume} />
            <QuickActionsSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobSeekerDashboard;
