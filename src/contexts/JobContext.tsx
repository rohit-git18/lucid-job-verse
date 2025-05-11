
import React, { createContext, useContext, useState } from "react";
import { api } from "../services/api";
import { Job, JobSearchFilters } from "../types";
import { toast } from "sonner";

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  filters: JobSearchFilters;
  fetchJobs: (page?: number, newFilters?: JobSearchFilters) => Promise<void>;
  getJob: (id: string) => Promise<Job>;
  createJob: (jobData: Partial<Job>) => Promise<Job>;
  updateJob: (id: string, jobData: Partial<Job>) => Promise<Job>;
  deleteJob: (id: string) => Promise<boolean>;
  applyForJob: (jobId: string, coverLetter?: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: React.ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<JobSearchFilters>({});

  const fetchJobs = async (page = 1, newFilters?: JobSearchFilters) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedFilters = newFilters !== undefined ? newFilters : filters;
      
      if (newFilters !== undefined) {
        setFilters(newFilters);
      }
      
      const result = await api.getJobs(updatedFilters, page);
      setJobs(result.jobs);
      setTotalPages(result.pagination.totalPages);
      setCurrentPage(result.pagination.currentPage);
    } catch (error) {
      setError("Failed to fetch jobs");
      console.error(error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const getJob = async (id: string): Promise<Job> => {
    try {
      setLoading(true);
      return await api.getJobById(id);
    } catch (error) {
      toast.error("Failed to load job details");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: Partial<Job>): Promise<Job> => {
    try {
      setLoading(true);
      const newJob = await api.createJob(jobData);
      setJobs(prevJobs => [newJob, ...prevJobs]);
      return newJob;
    } catch (error) {
      toast.error("Failed to create job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (id: string, jobData: Partial<Job>): Promise<Job> => {
    try {
      setLoading(true);
      const updatedJob = await api.updateJob(id, jobData);
      setJobs(prevJobs => 
        prevJobs.map(job => job.id === id ? updatedJob : job)
      );
      return updatedJob;
    } catch (error) {
      toast.error("Failed to update job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await api.deleteJob(id);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      return true;
    } catch (error) {
      toast.error("Failed to delete job");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const applyForJob = async (jobId: string, coverLetter?: string) => {
    try {
      setLoading(true);
      await api.applyForJob(jobId, { coverLetter });
      toast.success("Application submitted successfully");
    } catch (error) {
      toast.error("Failed to submit application");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    jobs,
    loading,
    error,
    totalPages,
    currentPage,
    filters,
    fetchJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    applyForJob
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
};
