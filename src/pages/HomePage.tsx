
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import JobSearch from "@/components/jobs/JobSearch";
import JobCard from "@/components/jobs/JobCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useJobs } from "@/contexts/JobContext";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Search, Building, Check } from "lucide-react";

const popularCategories = [
  { name: "Development", count: 245, icon: "💻" },
  { name: "Design", count: 147, icon: "🎨" },
  { name: "Marketing", count: 126, icon: "📊" },
  { name: "Sales", count: 98, icon: "💰" },
  { name: "Finance", count: 87, icon: "📝" },
  { name: "Healthcare", count: 76, icon: "🏥" },
];

const topCompanies = [
  { id: "1", name: "Tech Corp", logo: "https://logo.clearbit.com/google.com", jobs: 12 },
  { id: "2", name: "Finance Pro", logo: "https://logo.clearbit.com/jpmorgan.com", jobs: 8 },
  { id: "3", name: "Health Plus", logo: "https://logo.clearbit.com/unitedhealth.com", jobs: 6 },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { jobs, fetchJobs, loading } = useJobs();

  useEffect(() => {
    fetchJobs(1, { postedWithin: 7 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const featuredJobs = jobs.slice(0, 4);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-jobportal-primary to-jobportal-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Connect with top employers and discover opportunities that match your skills and career goals
            </p>
            <JobSearch />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">5,000+</div>
              <div className="text-white/80">Jobs Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">1,500+</div>
              <div className="text-white/80">Companies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">8M+</div>
              <div className="text-white/80">Job Seekers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-white/80">Hires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-jobportal-dark">
              <Briefcase className="inline-block mr-2 h-8 w-8 text-jobportal-primary" />
              Featured Jobs
            </h2>
            <Button onClick={() => navigate("/jobs")} variant="outline">
              View All Jobs
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              Array(4).fill(null).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 w-1/3"></div>
                    <div className="flex space-x-2 mb-4">
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                  </CardContent>
                </Card>
              ))
            ) : (
              featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              onClick={() => navigate("/jobs")}
              className="bg-jobportal-primary hover:bg-jobportal-primary/90"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse All Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-jobportal-dark mb-4">
              Popular Job Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore jobs in the most popular industries and find the perfect role for your skill set
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularCategories.map((category, index) => (
              <Card 
                key={index} 
                className="text-center hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set("category", category.name);
                  navigate({
                    pathname: "/jobs",
                    search: params.toString(),
                  });
                }}
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} jobs</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-jobportal-dark">
              <Building className="inline-block mr-2 h-8 w-8 text-jobportal-primary" />
              Top Companies Hiring
            </h2>
            <Button onClick={() => navigate("/companies")} variant="outline">
              View All Companies
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCompanies.map((company) => (
              <Card 
                key={company.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/companies/${company.id}`)}
              >
                <CardContent className="p-6 flex items-center">
                  <div className="h-16 w-16 rounded bg-white flex items-center justify-center shadow-sm">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <Building className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{company.name}</h3>
                    <p className="text-jobportal-primary">{company.jobs} jobs open</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-jobportal-dark mb-4">
              Why Choose JobFinder
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We connect talented professionals with the best companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-jobportal-primary/10 text-jobportal-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Job Matching</h3>
                <p className="text-gray-600">
                  Our intelligent algorithm matches your skills and preferences with the perfect job opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-jobportal-secondary/10 text-jobportal-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Employers</h3>
                <p className="text-gray-600">
                  All companies on JobFinder are verified, ensuring you only apply to legitimate opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-jobportal-accent/10 text-jobportal-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Application</h3>
                <p className="text-gray-600">
                  Apply to multiple jobs with just a few clicks using your stored profile and resume.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-jobportal-primary to-jobportal-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take the Next Step in Your Career?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of job seekers who have found their dream job through JobFinder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")}
              className="bg-white text-jobportal-primary hover:bg-white/90"
            >
              Create an Account
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/jobs")}
              className="border-white text-white hover:bg-white/20"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
