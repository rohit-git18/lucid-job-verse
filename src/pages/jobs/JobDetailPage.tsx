
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useJobs } from "@/contexts/JobContext";
import { useAuth } from "@/contexts/AuthContext";
import { Job } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  Building,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Share2,
  Bookmark,
} from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import { formatDistanceToNow, format } from "date-fns";
import { toast } from "sonner";

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getJob, applyForJob, jobs } = useJobs();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (!id) return;
        const jobData = await getJob(id);
        setJob(jobData);

        // Find similar jobs based on category or skills
        if (jobs.length > 0) {
          const similar = jobs
            .filter(j => 
              j.id !== id && 
              (j.category === jobData.category || 
                j.skills.some(skill => jobData.skills.includes(skill)))
            )
            .slice(0, 3);
          setSimilarJobs(similar);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, getJob, jobs]);

  const handleApply = async () => {
    try {
      if (!id || !isAuthenticated) return;
      
      setApplying(true);
      await applyForJob(id, coverLetter);
      setCoverLetter("");
    } catch (error) {
      console.error("Error applying for job:", error);
    } finally {
      setApplying(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title} at ${job?.company.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleSaveJob = () => {
    if (!isAuthenticated) {
      toast.error("Please login to save jobs");
      return;
    }
    
    toast.success("Job saved to your profile");
  };

  const formatSalary = (salary?: { min: number; max: number; currency: string }) => {
    if (!salary) return "Not specified";
    
    if (salary.min && salary.max) {
      return `${salary.currency}${salary.min.toLocaleString()} - ${salary.currency}${salary.max.toLocaleString()}`;
    }
    
    return salary.min
      ? `${salary.currency}${salary.min.toLocaleString()}+`
      : `Up to ${salary.currency}${salary.max!.toLocaleString()}`;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Job not found</h2>
          <p className="mb-6 text-gray-600">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs">
            <Button>Browse all jobs</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero section */}
      <div className="bg-gradient-to-b from-jobportal-primary/10 to-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-16 w-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                {job.company.logo ? (
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <Building className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{job.title}</h1>
                <div className="flex items-center text-gray-600">
                  <Link 
                    to={`/companies/${job.company.id}`} 
                    className="hover:text-jobportal-primary"
                  >
                    {job.company.name}
                  </Link>
                  <span className="mx-2">•</span>
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="h-4 w-4 mr-2" />
                <span>{formatSalary(job.salary)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Posted {formatDistanceToNow(new Date(job.postedAt), { addSuffix: true })}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Button 
                className="bg-jobportal-primary hover:bg-jobportal-primary/90"
                onClick={() => document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth" })}
                disabled={job.status !== "open"}
              >
                {job.status === "open" ? "Apply Now" : "Applications Closed"}
              </Button>
              <Button variant="outline" onClick={handleSaveJob}>
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-jobportal-light text-jobportal-dark">
                {job.type}
              </Badge>
              <Badge variant="outline" className="bg-jobportal-light text-jobportal-dark">
                {job.category}
              </Badge>
              {job.status === "open" ? (
                <Badge className="bg-jobportal-success text-white">
                  Accepting Applications
                </Badge>
              ) : (
                <Badge variant="destructive">
                  Applications Closed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <Tabs defaultValue="description">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="space-y-4">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                      <div className="text-gray-700 space-y-4">
                        <p>{job.description}</p>
                      </div>

                      <h3 className="text-lg font-semibold mt-6 mb-3">Responsibilities</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {job.responsibilities.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-semibold mt-6 mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="requirements">
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </TabsContent>
                  
                  <TabsContent value="company">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="h-16 w-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
                          {job.company.logo ? (
                            <img
                              src={job.company.logo}
                              alt={job.company.name}
                              className="h-12 w-12 object-contain"
                            />
                          ) : (
                            <Building className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{job.company.name}</h3>
                          <p className="text-gray-600">{job.company.industry}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{job.company.description}</p>
                      
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center">
                          <span className="font-medium w-24">Website:</span>
                          <a 
                            href={job.company.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-jobportal-primary hover:underline"
                          >
                            {job.company.website}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium w-24">Location:</span>
                          <span>{job.company.location}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium w-24">Size:</span>
                          <span>{job.company.size} employees</span>
                        </div>
                        {job.company.foundedYear && (
                          <div className="flex items-center">
                            <span className="font-medium w-24">Founded:</span>
                            <span>{job.company.foundedYear}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-6">
                        <Link to={`/companies/${job.company.id}`}>
                          <Button variant="outline">View Company Profile</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
              
              {/* Application section */}
              <Card id="apply-section">
                <CardHeader>
                  <h2 className="text-xl font-semibold">Apply for this position</h2>
                </CardHeader>
                <CardContent>
                  {!isAuthenticated ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-4">
                        You need to sign in to apply for this job
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Link to="/login">
                          <Button variant="outline">Sign In</Button>
                        </Link>
                        <Link to="/register">
                          <Button>Create Account</Button>
                        </Link>
                      </div>
                    </div>
                  ) : user?.role !== "jobseeker" ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-4">
                        Only job seekers can apply for jobs
                      </p>
                    </div>
                  ) : job.status !== "open" ? (
                    <div className="text-center py-4">
                      <p className="text-gray-600">
                        This job is no longer accepting applications
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label 
                          htmlFor="cover-letter" 
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Cover Letter
                        </label>
                        <Textarea
                          id="cover-letter"
                          placeholder="Explain why you're a good fit for this position..."
                          className="min-h-[200px]"
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleApply} 
                          disabled={applying}
                          className="bg-jobportal-primary hover:bg-jobportal-primary/90"
                        >
                          {applying ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Job Overview</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Date Posted</h4>
                      <p className="text-gray-600">
                        {format(new Date(job.postedAt), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  
                  {job.deadline && (
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Clock className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Closing Date</h4>
                        <p className="text-gray-600">
                          {format(new Date(job.deadline), "MMMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <Briefcase className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Employment Type</h4>
                      <p className="text-gray-600 capitalize">
                        {job.type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Location</h4>
                      <p className="text-gray-600">
                        {job.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      <DollarSign className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Salary Range</h4>
                      <p className="text-gray-600">
                        {formatSalary(job.salary)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {similarJobs.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Similar Jobs</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {similarJobs.map(similarJob => (
                      <div key={similarJob.id} className="space-y-3">
                        <Link to={`/jobs/${similarJob.id}`}>
                          <JobCard job={similarJob} variant="compact" />
                        </Link>
                        {similarJob !== similarJobs[similarJobs.length - 1] && (
                          <Separator />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetailPage;
