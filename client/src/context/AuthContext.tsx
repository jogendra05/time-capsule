// src/contexts/AuthContext.tsx
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
} from "firebase/auth";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { auth as firebaseAuth } from "../firebaseClient";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  authError: Error | null;
  register: UseMutationResult<User, Error, { email: string; password: string; displayName?: string }>;
  login:    UseMutationResult<User, Error, { email: string; password: string }>;
  logout:   UseMutationResult<void, Error, void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const auth = getAuth(firebaseAuth.app);

  // Persist auth state across browser restarts
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(err =>
      console.error("Failed to set persistence:", err)
    );
  }, [auth]);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<Error | null>(null);

  // Listen for Firebase auth state changes (incl. persisted sessions)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      u => {
        setUser(u);
        setIsLoading(false);
      },
      e => {
        console.error("Auth error:", e);
        setAuthError(e);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [auth]);

  // REGISTER
  const register = useMutation<User, Error, { email: string; password: string; displayName?: string }>({
    mutationFn: async ({ email, password, displayName }) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      return cred.user;
    },
    onSuccess: u => {
      setUser(u);
      setAuthError(null);
      toast({ title: "Registration successful" });
    },
    onError: e => {
      setAuthError(e);
      toast({ title: "Registration failed", description: e.message, variant: "destructive" });
    },
  });

  // LOGIN
  const login = useMutation<User, Error, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return cred.user;
    },
    onSuccess: u => {
      setUser(u);
      setAuthError(null);
      toast({ title: "Login successful" });
    },
    onError: e => {
      setAuthError(e);
      toast({ title: "Login failed", description: e.message, variant: "destructive" });
    },
  });

  // LOGOUT
  const logout = useMutation<void, Error, void>({
    mutationFn: () => signOut(auth),
    onSuccess: () => {
      setUser(null);
      setAuthError(null);
      toast({ title: "Logged out" });
    },
    onError: e => {
      setAuthError(e);
      toast({ title: "Logout failed", description: e.message, variant: "destructive" });
    },
  });

  // While checking persistence, avoid rendering children
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authError,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
