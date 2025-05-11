
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Job } from "@/types";
import JobCard from "@/components/jobs/JobCard";

interface RecommendedJobsSectionProps {
  jobs: Job[];
}

const RecommendedJobsSection = ({ jobs }: RecommendedJobsSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Recommended Jobs</CardTitle>
          <CardDescription>
            Jobs that match your skills and experience
          </CardDescription>
        </div>
        <Link to="/jobs">
          <Button variant="outline" size="sm">
            Browse All Jobs
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-600">
                Add skills to your profile to get personalized job recommendations
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="mb-4">
                <JobCard job={job} variant="compact" />
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedJobsSection;
