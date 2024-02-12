import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  // Hook for query client
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // 1st method
    // mutationFn: (id) => {
    //   deleteCabin(id)
    // }

    // 2nd method
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      // directly delete the selected cabin and automatically rerender the page
      toast.success("Cabin has been deleted!");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}
