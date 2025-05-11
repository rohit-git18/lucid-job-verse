
import React from "react";
import { Link } from "react-router-dom";
import { File, User, Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Resume } from "@/types";
import { User as UserType } from "@/types";

interface ProfileSectionProps {
  user: UserType | null;
  resume: Resume | null;
}

const ProfileSection = ({ user, resume }: ProfileSectionProps) => {
  return (
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
  );
};

export default ProfileSection;
