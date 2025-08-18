import { useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const exp = useSelector((state: RootState) => state.auth.exp);

  useEffect(() => {
    if (!exp) {
      router.replace("/AdminLogin");
      return;
    }

    const isExpired = exp * 1000 < Date.now();

    if (isExpired) {
      router.replace("/AdminLogin");
    }
  }, [exp, router]);

  // If token is valid, render children
  return <>{children}</>;
}