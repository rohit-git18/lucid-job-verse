
import { Job } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, CalendarIcon, DollarSign, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact" | "featured";
}

const JobCard = ({ job, variant = "default" }: JobCardProps) => {
  const {
    id,
    title,
    company,
    location,
    type,
    salary,
    skills,
    postedAt,
    deadline
  } = job;

  const formatSalary = (min?: number, max?: number, currency?: string) => {
    if (!min && !max) return "Not specified";
    
    // Handle hourly rates
    if (min && min < 100 && currency === "USD") {
      return min && max 
        ? `${currency}${min}-${max}/hr`
        : min ? `${currency}${min}/hr+` : `Up to ${currency}${max}/hr`;
    }
    
    // Handle annual salaries
    if (min && max) {
      return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
    }
    return min
      ? `${currency}${min.toLocaleString()}+`
      : `Up to ${currency}${max!.toLocaleString()}`;
  };

  const getJobTypeClass = (type: string) => {
    switch(type) {
      case "full-time": return "bg-blue-100 text-blue-800";
      case "part-time": return "bg-green-100 text-green-800";
      case "contract": return "bg-purple-100 text-purple-800";
      case "internship": return "bg-amber-100 text-amber-800";
      case "remote": return "bg-cyan-100 text-cyan-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const isNew = new Date(postedAt).getTime() > Date.now() - 3 * 24 * 60 * 60 * 1000; // 3 days
  const hasDeadlineSoon = deadline && new Date(deadline).getTime() < Date.now() + 3 * 24 * 60 * 60 * 1000; // within 3 days
  
  // Compact variant
  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Link to={`/jobs/${id}`} className="text-lg font-medium hover:text-jobportal-primary">
                {title}
              </Link>
              <p className="text-sm text-gray-600">{company.name}</p>
            </div>
            <Badge className={getJobTypeClass(type)}>
              {type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {formatDistanceToNow(new Date(postedAt), { addSuffix: true })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Featured variant
  if (variant === "featured") {
    return (
      <Card className="job-card border-l-4 border-jobportal-primary hover:shadow-md transition-shadow">
        <CardHeader className="pb-2 bg-gradient-to-r from-jobportal-primary/10 to-transparent">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 rounded-full bg-white shadow-sm flex items-center justify-center">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <Briefcase className="h-6 w-6 text-jobportal-primary" />
                )}
              </div>
              <div>
                <div className="flex items-center">
                  <Link to={`/jobs/${id}`} className="text-xl font-semibold hover:text-jobportal-primary">
                    {title}
                  </Link>
                  {isNew && (
                    <Badge variant="outline" className="ml-2 bg-jobportal-primary/20 text-jobportal-primary border-jobportal-primary/30">
                      New
                    </Badge>
                  )}
                </div>
                <Link to={`/companies/${company.id}`} className="text-sm text-gray-600 hover:text-jobportal-primary">
                  {company.name}
                </Link>
              </div>
            </div>
            <Badge className={getJobTypeClass(type)}>
              {type}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="py-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-jobportal-primary/70" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-jobportal-primary/70" />
              <span>{salary ? formatSalary(salary.min, salary.max, salary.currency) : "Not specified"}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CalendarIcon className="h-4 w-4 mr-2 text-jobportal-primary/70" />
              <span>Posted {formatDistanceToNow(new Date(postedAt), { addSuffix: true })}</span>
            </div>
            {deadline && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-jobportal-primary/70" />
                <span className={hasDeadlineSoon ? "text-red-500 font-medium" : ""}>
                  Closes {formatDistanceToNow(new Date(deadline), { addSuffix: true })}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {skills.slice(0, 5).map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-jobportal-light text-jobportal-dark hover:bg-jobportal-light/80">
                {skill}
              </Badge>
            ))}
            {skills.length > 5 && (
              <Badge variant="outline" className="bg-gray-100 text-gray-600">
                +{skills.length - 5} more
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" className="text-jobportal-primary border-jobportal-primary/30">
            Save Job
          </Button>
          <Link to={`/jobs/${id}`}>
            <Button className="bg-jobportal-primary hover:bg-jobportal-primary/90">
              Apply Now
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="job-card hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <Briefcase className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <Link to={`/jobs/${id}`} className="text-xl font-semibold hover:text-jobportal-primary">
                  {title}
                </Link>
                {isNew && (
                  <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                    New
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Link to={`/companies/${company.id}`} className="hover:text-jobportal-primary">
                  {company.name}
                </Link>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Badge className={getJobTypeClass(type)}>
              {type}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-jobportal-light text-jobportal-dark hover:bg-jobportal-light/80">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="bg-gray-100 text-gray-600">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium">Salary:</span>{" "}
            <span className="text-jobportal-primary font-medium">
              {salary ? formatSalary(salary.min, salary.max, salary.currency) : "Not specified"}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Posted {formatDistanceToNow(new Date(postedAt), { addSuffix: true })}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Link to={`/jobs/${id}`} className="w-full">
          <Button className="w-full bg-jobportal-primary hover:bg-jobportal-primary/90">
            View Job
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
