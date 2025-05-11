
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      navigate("/");
    } catch (error: any) {
      // Error handling is done in the auth context
    }
  };

  // For demo purposes, provide quick login
  const handleDemoLogin = async (role: "jobseeker" | "employer") => {
    try {
      if (role === "jobseeker") {
        await login("john@example.com", "password");
      } else {
        await login("bob@techcorp.com", "password");
      }
      navigate("/");
    } catch (error) {
      toast.error("Demo login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Briefcase className="h-12 w-12 text-jobportal-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to JobFinder</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/register" className="font-medium text-jobportal-primary hover:text-jobportal-primary/90">
              create a new account
            </Link>
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-jobportal-primary hover:bg-jobportal-primary/90"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("jobseeker")}
                disabled={loading}
              >
                Job Seeker
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("employer")}
                disabled={loading}
              >
                Employer
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="font-medium text-jobportal-primary hover:text-jobportal-primary/90">
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
