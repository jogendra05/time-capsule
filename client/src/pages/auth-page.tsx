import axios from "axios";
import { useState } from "react";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { Eye, EyeOff, Lock, User, Mail } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import {useAuth} from "../context/AuthContext"
import apiClient from '../api/client';

// Separate schemas for login and registration
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password2: z.string(),
}).refine(data => data.password === data.password2, {
  message: "Passwords don't match",
  path: ["password2"]
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login, token } = useAuth();

  const handleLogin = async (data: LoginData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/login/",
        {
          email: data.email,
          password: data.password
        }
      );
      console.log("Login successful:", response.data);
      if(response?.data?.token){
        login(response.data.token.access);
      }
      setLocation("/");
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      alert(`Login failed: ${error.response?.data?.detail || "Check credentials"}`);
    }
  };

  // const handleLogin = async (data: LoginData) => {
  //   try {
  //     const response = await apiClient.post('login/', {
  //               email: data.email,
  //               password: data.password
  //             });
  //     login(response.data.token);
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   }
  // };

  const handleRegister = async (data: RegisterData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register/",
        {
          ...data,
          tc: true
        }
      );
      console.log("Registration successful:", response.data);
      login(response.data.token.access)
      setLocation("/");
    } catch (error: any) {
      console.error("Registration error:", error.response?.data);
      const errors = Object.entries(error.response?.data || {})
      alert(`Registration failed:\n${errors}`);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-center p-4 sm:p-8"
      >
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Time Capsule
            </CardTitle>
            <CardDescription className="text-base">
              Preserve your memories for the future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "login" | "register")}
              className="space-y-6"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="login" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <AuthForm
                      mode="login"
                      onSubmit={handleLogin}
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <AuthForm
                      mode="register"
                      onSubmit={handleRegister}
                      showPassword={showPassword}
                      onTogglePassword={() => setShowPassword(!showPassword)}
                    />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 relative hidden lg:block"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3')] bg-cover bg-center opacity-20" />
        </div>
        <div className="relative h-full flex items-center justify-center p-8">
          <div className="max-w-lg text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            >
              Your Memories, Preserved in Time
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Create digital time capsules to store and share your precious moments.
              Open them when the moment is just right.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SocialButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="outline"
      className="w-full bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
      {...props}
    >
      {children}
    </Button>
  );
}

function AuthForm({
  mode,
  onSubmit,
  showPassword,
  onTogglePassword,
}: {
  mode: "login" | "register";
  onSubmit: (data: LoginData | RegisterData) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}) {
  const form = useForm<LoginData | RegisterData>({
    resolver: zodResolver(mode === "login" ? loginSchema : registerSchema),
    defaultValues: {
      ...(mode === "register" ? { name: "" } : {}),
      email: "",
      password: "",
      ...(mode === "register" ? { password2: "" } : {}),
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {mode === "register" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-9 border-gray-200 focus:border-primary"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9 border-gray-200 focus:border-primary"
                    placeholder="Enter your email"
                    {...field}
                  />
                </div>
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
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="pl-9 pr-9 border-gray-200 focus:border-primary"
                    placeholder="Enter your password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-transparent"
                    onClick={onTogglePassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mode === "register" && (
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="password"
                      className="pl-9 border-gray-200 focus:border-primary"
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {mode === "login" && (
          <div className="flex justify-end">
            <Button variant="link" className="px-0 font-normal text-primary" type="button">
              Forgot password?
            </Button>
          </div>
        )}

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          {mode === "login" ? "Sign In" : "Create Account"}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <SocialButton type="button">
          <SiGoogle className="mr-2 h-4 w-4" />
          Continue with Google
        </SocialButton>
      </form>
    </Form>
  );
}