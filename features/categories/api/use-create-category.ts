import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]

export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories.$post({ json })

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Categoria criada com sucesso.')
            queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        },
        onError: () => {
            toast.error('Erro ao criar categoria.')
        }
    })

    return mutation
}