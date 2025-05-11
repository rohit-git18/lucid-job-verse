
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Search, MapPin } from "lucide-react";

const formSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface JobSearchProps {
  onSearch?: (data: FormData) => void;
  variant?: "hero" | "compact";
}

const JobSearch = ({ onSearch, variant = "hero" }: JobSearchProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
      location: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    setLoading(true);
    
    if (onSearch) {
      onSearch(data);
      setLoading(false);
    } else {
      const params = new URLSearchParams();
      if (data.query) params.set("query", data.query);
      if (data.location) params.set("location", data.location);
      
      navigate({
        pathname: "/jobs",
        search: params.toString(),
      });
      
      setLoading(false);
    }
  };

  if (variant === "compact") {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col sm:flex-row gap-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Job title, keyword, or company"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Location"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="bg-jobportal-primary hover:bg-jobportal-primary/90"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)}
          className="p-2 sm:p-3 bg-white shadow-lg rounded-xl flex flex-col md:flex-row gap-3"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Job title, keyword, or company"
                      className="pl-10 h-12 text-base"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Location"
                      className="pl-10 h-12 text-base"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            className="bg-jobportal-primary hover:bg-jobportal-primary/90 h-12 px-8"
            disabled={loading}
          >
            {loading ? "Searching..." : "Find Jobs"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobSearch;
