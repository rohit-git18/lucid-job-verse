
import React from "react";
import { Link } from "react-router-dom";
import { Search, Briefcase, File, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuickActionsSection = () => {
  return (
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
  );
};

export default QuickActionsSection;
