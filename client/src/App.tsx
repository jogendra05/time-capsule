
import React from 'react'
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar.tsx";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Timeline from "@/pages/timeline";
import Create from "@/pages/create";
import About from "@/pages/about";
import Gallery from "@/pages/gallery";
import AuthPage from "@/pages/auth-page";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/create" component={Create} />
      <Route path="/about" component={About} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <div className='pb-10'>

          <Navbar />
          </div>
          <Router />
        </div>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;



// import React, { useState } from "react";
// import axios from "axios";

// const SignInPage: React.FC = () => {
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [password2, setPassword2] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (password !== password2) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       console.log({
//         name,
//         email,
//         password,
//         password2,
//         tc: true
//       })
//       const response = await axios.post("http://127.0.0.1:8000/api/user/register/", {
//         name,
//         email,
//         password,
//         password2,
//         tc: true
//       });
//       console.log("Login successful:", response.data);
//       // Handle success (e.g., redirect or update UI)
//     } catch (error: any) {
//       console.error("Login failed:", error.response ? error.response.data : error);
//       alert("Login failed. Please check your credentials and try again.");
//     }
//   };

//   return (
//     <div className="sign-in-page">
//       <h2>Sign In</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password2">Confirm Password:</label>
//           <input
//             type="password"
//             id="password2"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };

// export default SignInPage;
