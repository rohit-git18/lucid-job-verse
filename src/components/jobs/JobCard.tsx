
import { Job } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, CalendarIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact";
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
    postedAt
  } = job;

  const formatSalary = (min?: number, max?: number, currency?: string) => {
    if (!min && !max) return "Not specified";
    if (min && max) {
      return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
    }
    return min
      ? `${currency}${min.toLocaleString()}+`
      : `Up to ${currency}${max!.toLocaleString()}`;
  };

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
            <Badge variant="outline" className="font-normal">
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
              <Link to={`/jobs/${id}`} className="text-xl font-semibold hover:text-jobportal-primary">
                {title}
              </Link>
              <div className="flex items-center text-sm text-gray-600">
                <Link to={`/companies/${company.id}`} className="hover:text-jobportal-primary">
                  {company.name}
                </Link>
                <span className="mx-2">•</span>
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div>
            <Badge className="bg-jobportal-primary hover:bg-jobportal-primary/90">
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

      <CardFooter className="pt-4">
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
