
import React from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import { Resume } from "@/types";

interface ProfileProgressSectionProps {
  user: User | null;
  resume: Resume | null;
  profileCompletion: number;
}

const ProfileProgressSection = ({ 
  user, 
  resume, 
  profileCompletion 
}: ProfileProgressSectionProps) => {
  return (
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
  );
};

export default ProfileProgressSection;
