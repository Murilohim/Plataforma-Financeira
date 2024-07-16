import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.categories[":id"]["$delete"]({
                param: { id },
            })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Categoria deletada com sucesso.')
            queryClient.invalidateQueries({
                queryKey: ['category', { id }]
            })
            queryClient.invalidateQueries({
                queryKey: ['categories']
            })
            queryClient.invalidateQueries({
                queryKey: ['summary']
            })
        },
        onError: () => {
            toast.error('Erro ao deletar categoria.')
        }
    })

    return mutation
}