import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>;

export const useDeleteAccount = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.accounts[":id"]["$delete"]({
                param: { id },
            })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Conta deletada com sucesso.')
            queryClient.invalidateQueries({
                queryKey: ['account', { id }]
            })
            queryClient.invalidateQueries({
                queryKey: ['accounts']
            })
            queryClient.invalidateQueries({
                queryKey: ['transactions']
            })
        },
        onError: () => {
            toast.error('Erro ao deletar conta.')
        }
    })

    return mutation
}