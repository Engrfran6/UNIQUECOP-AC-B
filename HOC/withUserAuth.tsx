import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export function withUserAuth<T extends object>(Component: React.ComponentType<T>) {
  return function WithUserAuth(props: any) {
    const {user, isAdmin, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || isAdmin)) {
        if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("/auth/signin");
        }
      }
    }, [user, isAdmin, loading, router]);

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
