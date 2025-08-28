// hooks/useAuth.ts
import { useEffect } from "react";
import { useRouter } from "next/router";
import supabase from "./db"; // pastikan sudah setup supabase client

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
  const checkUser = async () => {
    if (router.pathname === "/login" || router.pathname === "/register") {
      return; // biarin akses
    }

    const { data: { session } } = await supabase.auth.getSession();
    console.log(session);

    if (!session) {
      router.push("/login");
    }
  };

  checkUser();
}, [router]);

}
