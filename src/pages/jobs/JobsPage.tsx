
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import JobCard from "@/components/jobs/JobCard";
import JobSearch from "@/components/jobs/JobSearch";
import JobFilters from "@/components/jobs/JobFilters";
import { useJobs } from "@/contexts/JobContext";
import { JobSearchFilters } from "@/types";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const JobsPage = () => {
  const location = useLocation();
  const { jobs, loading, totalPages, currentPage, fetchJobs, filters } = useJobs();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query") || undefined;
    const locationParam = searchParams.get("location") || undefined;
    
    const initialFilters: JobSearchFilters = {
      ...filters,
      query,
      location: locationParam,
    };
    
    fetchJobs(1, initialFilters);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearch = (data: any) => {
    const newFilters = {
      ...filters,
      query: data.query || undefined,
      location: data.location || undefined,
    };
    fetchJobs(1, newFilters);
  };

  const handleFilterChange = (newFilters: JobSearchFilters) => {
    fetchJobs(1, newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchJobs(page);
    window.scrollTo(0, 0);
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <MainLayout>
      <div className="bg-gradient-to-b from-jobportal-primary/10 to-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Find Your Perfect Job</h1>
          <JobSearch onSearch={handleSearch} variant="compact" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            onClick={toggleFilters}
            className="w-full"
          >
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div 
            className={`lg:w-1/4 ${isFilterVisible ? 'block' : 'hidden'} lg:block`}
          >
            <JobFilters 
              filters={filters} 
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Job Listings */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/3 mb-6" />
                    <div className="flex space-x-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or removing some filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => handleFilterChange({})}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Found {jobs.length > 0 ? `${jobs.length} jobs` : "no jobs"} matching your criteria
                </div>
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    // Only show a limited number of page buttons
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          onClick={() => handlePageChange(page)}
                          className={page === currentPage ? "bg-jobportal-primary hover:bg-jobportal-primary/90" : ""}
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      (page === currentPage - 2 && currentPage > 3) ||
                      (page === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return <Button variant="outline" disabled key={`ellipsis-${page}`}>...</Button>;
                    }
                    return null;
                  })}
                  
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobsPage;
