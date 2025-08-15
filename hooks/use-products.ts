import {fetchAllAndGroupedProducts} from "@/lib/products";
import {useQuery} from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchAllAndGroupedProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
