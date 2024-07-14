import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['transaction', { id }],
        queryFn: async () => {
            const response = await client.api.transactions[":id"].$get({ param: { id } })

            if (!response.ok) {
                throw new Error('Erro ao buscar transação.')
            }

            const { data } = await response.json()
            return data
        }
    })

    return query
};