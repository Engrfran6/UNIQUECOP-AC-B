import {createOrder, getOrder, getUserOrders} from "@/lib/orders"; // adjust to your actual path
import {Order} from "@/lib/types";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export const useUserOrders = (userId: string) => {
  return useQuery<Order[]>({
    queryKey: ["orders", userId],
    queryFn: () => getUserOrders(userId),
    enabled: !!userId, // only fetch when userId is available
  });
};

export const useOrder = (orderId: string) => {
  return useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId, // only fetch when orderId is available
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (_, variables) => {
      // Optional: Invalidate user orders cache after creating a new one
      if ("userId" in variables) {
        queryClient.invalidateQueries({queryKey: ["orders", variables.userId]});
      }
    },
  });
};

// export const useUpdateOrderStatus = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       orderId,
//       status,
//       trackingNumber,
//     }: {
//       orderId: string;
//       status: Order["status"];
//       trackingNumber?: string;
//     }) => updateOrderStatus(orderId, status, trackingNumber),
//     onSuccess: (_, {orderId}) => {
//       queryClient.invalidateQueries({queryKey: ["order", orderId]});
//     },
//   });
// };
