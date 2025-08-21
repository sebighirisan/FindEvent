import { usePathname, useRouter } from "expo-router";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const exp = useSelector((state: RootState) => state.auth.exp);

  useEffect(() => {
    if (!pathname) return; // 👈 wait until router mounted

    if (!exp || exp * 1000 < Date.now()) {
      router.replace("/");
    }
  }, [exp, router, pathname]);

  // If token is valid, render children
  return <>{children}</>;
}