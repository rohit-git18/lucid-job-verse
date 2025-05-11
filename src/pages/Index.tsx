
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useJobs } from "@/contexts/JobContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import JobSearch from "@/components/jobs/JobSearch";
import JobCard from "@/components/jobs/JobCard";
import { Grid } from "@/components/ui/grid";

const Index = () => {
  const navigate = useNavigate();
  const { jobs, fetchJobs, loading } = useJobs();

  useEffect(() => {
    // Fetch all jobs on component mount
    fetchJobs(1, { postedWithin: 365 }); // Get jobs posted in the last year to ensure we get plenty
  }, [fetchJobs]);

  return (
    <MainLayout>
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-b from-jobportal-primary to-jobportal-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl mb-8">
              Browse thousands of job opportunities and start your career journey
            </p>
            <JobSearch />
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Job Opportunities</h2>
            <Button onClick={() => navigate("/jobs")} variant="outline">
              View All Jobs
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                    <div className="flex space-x-2 mb-4">
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.slice(0, 6).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate("/jobs")}
              className="bg-jobportal-primary hover:bg-jobportal-primary/90 text-white"
              size="lg"
            >
              Browse All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Job Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Development', 'Design', 'Marketing', 'Finance', 'Healthcare', 'Education', 'Engineering', 'Customer Service'].map((category) => (
              <Link 
                to={`/jobs?category=${category}`} 
                key={category}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <h3 className="font-semibold text-lg mb-2">{category}</h3>
                <p className="text-sm text-gray-500">
                  {Math.floor(Math.random() * 100) + 50} jobs
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
