import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({
                param: { id },
                json,
            })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Conta editada com sucesso.')
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
            toast.error('Erro ao editar conta.')
        }
    })

    return mutation
}