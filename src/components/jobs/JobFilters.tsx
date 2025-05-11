
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { JobSearchFilters } from "@/types";
import { X } from "lucide-react";

interface JobFiltersProps {
  filters: JobSearchFilters;
  onFilterChange: (filters: JobSearchFilters) => void;
}

const jobTypes = [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "remote"
];

const categories = [
  "Development",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Healthcare",
  "Education",
  "Engineering",
  "Customer Service",
  "Administrative",
];

const experienceLevels = [
  "entry",
  "mid",
  "senior",
  "executive",
];

const postedWithinOptions = [
  { value: 1, label: "Last 24 hours" },
  { value: 7, label: "Last week" },
  { value: 14, label: "Last 2 weeks" },
  { value: 30, label: "Last month" },
];

const commonSkills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "SQL",
  "Java",
  "TypeScript",
  "CSS",
  "HTML",
  "UX/UI Design",
  "Marketing",
  "Sales",
  "Customer Service",
  "Communication",
  "Leadership",
];

const JobFilters = ({ filters, onFilterChange }: JobFiltersProps) => {
  const [salary, setSalary] = useState<[number, number]>([
    filters.salary?.min || 0,
    filters.salary?.max || 200000,
  ]);

  const handleTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.type || [];
    const updatedTypes = checked
      ? [...currentTypes, type]
      : currentTypes.filter(t => t !== type);
    
    onFilterChange({
      ...filters,
      type: updatedTypes.length > 0 ? updatedTypes : undefined,
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const currentCategories = filters.category || [];
    const updatedCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter(c => c !== category);
    
    onFilterChange({
      ...filters,
      category: updatedCategories.length > 0 ? updatedCategories : undefined,
    });
  };

  const handleExperienceChange = (experience: string, checked: boolean) => {
    const currentExperience = filters.experience || [];
    const updatedExperience = checked
      ? [...currentExperience, experience]
      : currentExperience.filter(e => e !== experience);
    
    onFilterChange({
      ...filters,
      experience: updatedExperience.length > 0 ? updatedExperience : undefined,
    });
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    const currentSkills = filters.skills || [];
    const updatedSkills = checked
      ? [...currentSkills, skill]
      : currentSkills.filter(s => s !== skill);
    
    onFilterChange({
      ...filters,
      skills: updatedSkills.length > 0 ? updatedSkills : undefined,
    });
  };

  const handleSalaryChange = (values: number[]) => {
    setSalary([values[0], values[1]]);
  };

  const handleSalaryChangeCommitted = () => {
    onFilterChange({
      ...filters,
      salary: {
        min: salary[0],
        max: salary[1],
      },
    });
  };

  const handlePostedWithinChange = (value: string) => {
    onFilterChange({
      ...filters,
      postedWithin: parseInt(value, 10),
    });
  };

  const clearFilters = () => {
    onFilterChange({});
    setSalary([0, 200000]);
  };

  const hasActiveFilters = () => {
    return (
      (filters.type && filters.type.length > 0) ||
      (filters.category && filters.category.length > 0) ||
      (filters.skills && filters.skills.length > 0) ||
      (filters.experience && filters.experience.length > 0) ||
      filters.postedWithin !== undefined ||
      (filters.salary && (filters.salary.min !== 0 || filters.salary.max !== 200000))
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-jobportal-primary"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>
      
      <Accordion type="multiple" defaultValue={["job-type", "category", "skills"]}>
        <AccordionItem value="job-type">
          <AccordionTrigger>Job Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`job-type-${type}`}
                    checked={(filters.type || []).includes(type)}
                    onCheckedChange={(checked) =>
                      handleTypeChange(type, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`job-type-${type}`}
                    className="capitalize cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={(filters.category || []).includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`experience-${level}`}
                    checked={(filters.experience || []).includes(level)}
                    onCheckedChange={(checked) =>
                      handleExperienceChange(level, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`experience-${level}`}
                    className="capitalize cursor-pointer"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="salary">
          <AccordionTrigger>Salary Range</AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 px-2">
              <Slider
                defaultValue={[0, 200000]}
                min={0}
                max={200000}
                step={10000}
                value={[salary[0], salary[1]]}
                onValueChange={handleSalaryChange}
                onValueCommit={handleSalaryChangeCommitted}
                className="mb-6"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${salary[0].toLocaleString()}</span>
                <span>${salary[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="posted">
          <AccordionTrigger>Date Posted</AccordionTrigger>
          <AccordionContent>
            <div className="pt-2">
              <Select
                value={filters.postedWithin?.toString() || ""}
                onValueChange={handlePostedWithinChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Any time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any time</SelectItem>
                  {postedWithinOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills">
          <AccordionTrigger>Skills</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {commonSkills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill}`}
                    checked={(filters.skills || []).includes(skill)}
                    onCheckedChange={(checked) =>
                      handleSkillChange(skill, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`skill-${skill}`}
                    className="cursor-pointer"
                  >
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default JobFilters;
