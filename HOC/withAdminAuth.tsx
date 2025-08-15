import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";

import {useEffect} from "react";

export function withAdminAuth(Component: React.ComponentType) {
  return function WithAdminAuth(props: any) {
    const {user, isAdmin, loading} = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || !isAdmin)) {
        router.push("/unauthorized");
      }
    }, [user, isAdmin, loading, router]);

    if (loading || !user || !isAdmin) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}

// Usage:
// export default withAdminAuth(AdminDashboard);
