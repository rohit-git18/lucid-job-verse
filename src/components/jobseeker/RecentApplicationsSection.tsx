
import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { JobApplication, Job } from "@/types";

interface RecentApplicationsSectionProps {
  applications: JobApplication[];
  jobs: Job[];
}

const RecentApplicationsSection = ({ applications, jobs }: RecentApplicationsSectionProps) => {
  const recentApplications = applications.slice(0, 3);
  
  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>
            Track the status of your job applications
          </CardDescription>
        </div>
        <Link to="/jobseeker/applications">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {recentApplications.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-6">
              Start applying to jobs to track your applications here
            </p>
            <Link to="/jobs">
              <Button>Find Jobs</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentApplications.map((application, index) => {
              const job = jobs.find(j => j.id === application.jobId);
              if (!job) return null;
              
              return (
                <div key={application.id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <Link 
                        to={`/jobs/${job.id}`}
                        className="text-lg font-medium hover:text-jobportal-primary"
                      >
                        {job.title}
                      </Link>
                      <div className="text-sm text-gray-600">
                        {job.company.name} • {job.location}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Applied {formatDistanceToNow(new Date(application.appliedAt), { addSuffix: true })}
                      </div>
                    </div>
                    <Badge className={getApplicationStatusColor(application.status)}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                  {index < recentApplications.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentApplicationsSection;
