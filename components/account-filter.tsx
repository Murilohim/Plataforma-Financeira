"use client"

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useGetSummary } from "@/features/summary/api/use-get-summary"

export const AccountFilter = () => {

    const router = useRouter()
    const pathname = usePathname()

    const params = useSearchParams()
    const accountId = params.get("accountId") || "all"
    const from = params.get("from") || ""
    const to = params.get("to") || ""

    const { data: summaryData, isLoading: isLoadingSummary } = useGetSummary()
    const { data: accountsData, isLoading: isLoadingAccounts } = useGetAccounts()

    const onChange = (newValue: string) => {
        const query = {
            accountId: newValue,
            from,
            to
        }

        if (newValue === "all") {
            query.accountId = ""
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query
        }, {
            skipEmptyString: true,
            skipNull: true
        })

        router.push(url)
    }

    return (
        <Select
            value={accountId}
            onValueChange={onChange}
            disabled={isLoadingAccounts || isLoadingSummary}
        >
            <SelectTrigger
                className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
            >
                <SelectValue
                    placeholder="Filtrar por conta"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    value="all"
                >
                    Todas as contas
                </SelectItem>
                {accountsData?.map((account) => (
                    <SelectItem
                        key={account.id}
                        value={account.id}
                    >
                        {account.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}