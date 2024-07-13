import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccount = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ['account', { id }],
        queryFn: async () => {
            const response = await client.api.accounts[":id"].$get({ param: { id } })

            if (!response.ok) {
                throw new Error('Erro ao buscar conta.')
            }

            const { data } = await response.json()
            return data
        }
    })

    return query
};