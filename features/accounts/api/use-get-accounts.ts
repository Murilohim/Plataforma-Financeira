import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccounts = () => {
    const query = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            const response = await client.api.accounts.$get()

            if (!response.ok) {
                throw new Error('Erro ao buscar contas.')
            }

            const { data } = await response.json()
            return data
        }
    })

    return query
};