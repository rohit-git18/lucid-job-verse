import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Search } from "lucide-react"; // Fix: import Search from lucide-react
import { useAuth } from "@/contexts/AuthContext";
import { useJobs } from "@/contexts/JobContext";
import { api } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { JobApplication, Resume } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Briefcase, File, Settings, User, Edit, Plus } from "lucide-react";
import JobCard from "@/components/jobs/JobCard";

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

  const calculateProfileCompletion = (): number => {
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

  const profileCompletion = calculateProfileCompletion();
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
            {/* Profile Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Profile Completion</CardTitle>
                <CardDescription>
                  Complete your profile to improve your job matches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {profileCompletion}% Complete
                    </span>
                    <Link to="/jobseeker/profile">
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                  <Progress value={profileCompletion} className="h-2" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Personal Info</span>
                        <Badge variant="outline" className={user ? "bg-green-100" : "bg-gray-100"}>
                          {user ? "Complete" : "Incomplete"}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Resume</span>
                        <Badge variant="outline" className={resume ? "bg-green-100" : "bg-gray-100"}>
                          {resume ? "Added" : "Missing"}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Skills</span>
                        <Badge variant="outline" className={resume?.skills?.length ? "bg-green-100" : "bg-gray-100"}>
                          {resume?.skills?.length ? `${resume.skills.length} Skills` : "Not Added"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Applications */}
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

            {/* Recommended Jobs */}
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
                  {recommendedJobs.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600">
                        Add skills to your profile to get personalized job recommendations
                      </p>
                    </div>
                  ) : (
                    recommendedJobs.map((job) => (
                      <div key={job.id} className="mb-4">
                        <JobCard job={job} variant="compact" />
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Profile</CardTitle>
                  <Link to="/jobseeker/profile">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto bg-jobportal-primary/10 rounded-full flex items-center justify-center mb-3">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-10 w-10 text-jobportal-primary" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">{user?.name}</h3>
                  <p className="text-gray-600">{user?.email}</p>
                </div>

                {resume ? (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Contact Information</h4>
                      <p className="text-sm text-gray-600">
                        {resume.contact?.phone && <>Phone: {resume.contact.phone}<br /></>}
                        {resume.contact?.location && <>Location: {resume.contact.location}</>}
                      </p>
                    </div>
                    
                    {resume.skills && resume.skills.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {resume.skills.slice(0, 5).map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-gray-100">
                              {skill}
                            </Badge>
                          ))}
                          {resume.skills.length > 5 && (
                            <Badge variant="outline">
                              +{resume.skills.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <Link to="/jobseeker/resume">
                        <Button className="w-full">
                          <File className="h-4 w-4 mr-2" />
                          View Full Resume
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-4">
                    <p className="text-sm text-gray-600">
                      You haven't created a resume yet
                    </p>
                    <Link to="/jobseeker/resume">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Resume
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/jobs">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-3" />
                    Browse Jobs
                  </Button>
                </Link>
                <Link to="/jobseeker/applications">
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="h-4 w-4 mr-3" />
                    My Applications
                  </Button>
                </Link>
                <Link to="/jobseeker/resume">
                  <Button variant="outline" className="w-full justify-start">
                    <File className="h-4 w-4 mr-3" />
                    Update Resume
                  </Button>
                </Link>
                <Link to="/jobseeker/settings">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-3" />
                    Account Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobSeekerDashboard;
