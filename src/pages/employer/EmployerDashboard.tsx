
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Company, Job, JobApplication } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  Building,
  PlusCircle,
  Briefcase,
  Eye,
  Users,
  ChevronRight,
  Edit,
  LineChart
} from "lucide-react";

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recentApplications, setRecentApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        if (!user) return;

        // Fetch company data
        try {
          const companyData = await api.getCompanyByOwner(user.id);
          setCompany(companyData);
        } catch (error) {
          setCompany(null);
        }

        // Fetch jobs data (for demo, using our mock data)
        if (api.jobs) {
          const companyJobs = api.jobs.filter(job => job.company.ownerId === user.id);
          setJobs(companyJobs);

          // Get recent applications for these jobs
          const applications: JobApplication[] = [];
          for (const job of companyJobs) {
            try {
              const jobApplications = await api.getApplicationsForJob(job.id);
              applications.push(...jobApplications);
            } catch (error) {
              console.error(`Error fetching applications for job ${job.id}:`, error);
            }
          }
          
          // Sort by date and take the 5 most recent
          applications.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
          setRecentApplications(applications.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const calculateProfileCompletion = (): number => {
    if (!company) return 0;
    
    let score = 0;
    
    // Name and description
    if (company.name) score += 20;
    if (company.description && company.description.length > 30) score += 20;
    
    // Industry, size, location
    if (company.industry) score += 15;
    if (company.size) score += 15;
    if (company.location) score += 15;
    
    // Logo and website
    if (company.logo) score += 10;
    if (company.website) score += 5;
    
    return score;
  };

  const profileCompletion = calculateProfileCompletion();
  
  const activeJobs = jobs.filter(job => job.status === "open").length;
  const totalApplications = jobs.reduce((sum, job) => sum + job.applications.length, 0);
  const totalViews = jobs.reduce((sum, job) => sum + job.views, 0);

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
    <MainLayout>
      <div className="bg-gradient-to-b from-jobportal-secondary/10 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-gray-600">Manage your job listings and applications</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!company ? (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Complete Your Company Profile</CardTitle>
              <CardDescription>
                Add your company details to start posting jobs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center py-10">
                <div className="text-center">
                  <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Company Profile Found</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    To post jobs and receive applications, you need to create a company profile first.
                  </p>
                  <Link to="/employer/company">
                    <Button className="bg-jobportal-secondary hover:bg-jobportal-secondary/90">
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Create Company Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                        <h3 className="text-2xl font-bold">{activeJobs}</h3>
                      </div>
                      <div className="p-3 bg-jobportal-secondary/10 rounded-full">
                        <Briefcase className="h-6 w-6 text-jobportal-secondary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Applications</p>
                        <h3 className="text-2xl font-bold">{totalApplications}</h3>
                      </div>
                      <div className="p-3 bg-jobportal-primary/10 rounded-full">
                        <Users className="h-6 w-6 text-jobportal-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Views</p>
                        <h3 className="text-2xl font-bold">{totalViews}</h3>
                      </div>
                      <div className="p-3 bg-jobportal-accent/10 rounded-full">
                        <Eye className="h-6 w-6 text-jobportal-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Job Management */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle>Job Listings</CardTitle>
                    <CardDescription>
                      Manage your job postings
                    </CardDescription>
                  </div>
                  <Link to="/employer/post-job">
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Post Job
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="active">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="closed">Closed</TabsTrigger>
                      <TabsTrigger value="all">All Jobs</TabsTrigger>
                    </TabsList>
                    <div className="mt-4">
                      <TabsContent value="active">
                        {jobs.filter(job => job.status === "open").length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">No active jobs found</p>
                            <Link to="/employer/post-job">
                              <Button>Post a Job</Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {jobs
                              .filter(job => job.status === "open")
                              .map((job, index) => (
                                <div key={job.id} className="group">
                                  <Link to={`/employer/jobs/${job.id}`} className="block">
                                    <div className="flex justify-between items-center group-hover:bg-gray-50 p-3 rounded-md -mx-3">
                                      <div>
                                        <h3 className="text-lg font-medium group-hover:text-jobportal-secondary">
                                          {job.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                                          <span>Applications: {job.applications.length}</span>
                                          <span>Views: {job.views}</span>
                                          <span>Posted: {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                                        </div>
                                      </div>
                                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-jobportal-secondary" />
                                    </div>
                                  </Link>
                                  {index < jobs.filter(job => job.status === "open").length - 1 && (
                                    <Separator className="my-2" />
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="closed">
                        {jobs.filter(job => job.status === "closed").length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-600">No closed jobs found</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {jobs
                              .filter(job => job.status === "closed")
                              .map((job, index) => (
                                <div key={job.id} className="group">
                                  <Link to={`/employer/jobs/${job.id}`} className="block">
                                    <div className="flex justify-between items-center group-hover:bg-gray-50 p-3 rounded-md -mx-3">
                                      <div>
                                        <h3 className="text-lg font-medium group-hover:text-jobportal-secondary">
                                          {job.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                                          <span>Applications: {job.applications.length}</span>
                                          <span>Views: {job.views}</span>
                                          <span>Posted: {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                                        </div>
                                      </div>
                                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-jobportal-secondary" />
                                    </div>
                                  </Link>
                                  {index < jobs.filter(job => job.status === "closed").length - 1 && (
                                    <Separator className="my-2" />
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </TabsContent>
                      <TabsContent value="all">
                        {jobs.length === 0 ? (
                          <div className="text-center py-8">
                            <p className="text-gray-600 mb-4">No jobs found</p>
                            <Link to="/employer/post-job">
                              <Button>Post a Job</Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {jobs.map((job, index) => (
                              <div key={job.id} className="group">
                                <Link to={`/employer/jobs/${job.id}`} className="block">
                                  <div className="flex justify-between items-center group-hover:bg-gray-50 p-3 rounded-md -mx-3">
                                    <div>
                                      <div className="flex items-center">
                                        <h3 className="text-lg font-medium group-hover:text-jobportal-secondary mr-3">
                                          {job.title}
                                        </h3>
                                        <Badge variant={job.status === "open" ? "default" : "secondary"}>
                                          {job.status}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center text-sm text-gray-600 mt-1 space-x-4">
                                        <span>Applications: {job.applications.length}</span>
                                        <span>Views: {job.views}</span>
                                        <span>Posted: {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
                                      </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-jobportal-secondary" />
                                  </div>
                                </Link>
                                {index < jobs.length - 1 && (
                                  <Separator className="my-2" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Recent Applications */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>
                      Latest candidates who applied to your jobs
                    </CardDescription>
                  </div>
                  <Link to="/employer/applications">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {recentApplications.length === 0 ? (
                    <div className="text-center py-6">
                      <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-600">No applications yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentApplications.map((application, index) => {
                        const job = jobs.find(j => j.id === application.jobId);
                        if (!job) return null;
                        
                        return (
                          <div key={application.id} className="group">
                            <Link to={`/employer/applications/${application.id}`} className="block">
                              <div className="flex justify-between items-center group-hover:bg-gray-50 p-3 rounded-md -mx-3">
                                <div>
                                  <h3 className="font-medium group-hover:text-jobportal-secondary">
                                    Application for {job.title}
                                  </h3>
                                  <div className="flex items-center text-sm text-gray-600 mt-1">
                                    <span>Received {formatDistanceToNow(new Date(application.appliedAt), { addSuffix: true })}</span>
                                  </div>
                                </div>
                                <Badge className={getApplicationStatusColor(application.status)}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </Badge>
                              </div>
                            </Link>
                            {index < recentApplications.length - 1 && (
                              <Separator className="my-2" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Company Profile</CardTitle>
                    <Link to="/employer/company">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
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
                    <div>
                      <h3 className="font-semibold">{company.name}</h3>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Profile Completion</h4>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{profileCompletion}% Complete</span>
                        {profileCompletion < 100 && (
                          <span className="text-jobportal-secondary">Add missing info</span>
                        )}
                      </div>
                      <Progress value={profileCompletion} className="h-2" />
                    </div>
                    
                    <div className="pt-2">
                      <Link to={`/companies/${company.id}`}>
                        <Button variant="outline" className="w-full">
                          <Eye className="h-4 w-4 mr-2" />
                          View Public Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Analytics */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Job Views</h4>
                      <LineChart className="h-4 w-4 text-jobportal-primary" />
                    </div>
                    <p className="text-2xl font-bold">{totalViews}</p>
                    <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Applications</h4>
                      <LineChart className="h-4 w-4 text-jobportal-secondary" />
                    </div>
                    <p className="text-2xl font-bold">{totalApplications}</p>
                    <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                  </div>
                  
                  <div className="text-center pt-2">
                    <Link to="/employer/analytics">
                      <Button variant="outline" className="w-full">
                        View Detailed Analytics
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/employer/post-job">
                    <Button className="w-full bg-jobportal-secondary hover:bg-jobportal-secondary/90">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Post a New Job
                    </Button>
                  </Link>
                  <Link to="/employer/applications">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-3" />
                      Review Applications
                    </Button>
                  </Link>
                  <Link to="/employer/company">
                    <Button variant="outline" className="w-full justify-start">
                      <Building className="h-4 w-4 mr-3" />
                      Edit Company Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default EmployerDashboard;
