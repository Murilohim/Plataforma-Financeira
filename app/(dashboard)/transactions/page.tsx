"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";

const TransactionsPage = () => {

    const { onOpen } = useNewTransaction()
    const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()
    const { mutate: mutateDeleteAccounts, isPending: isPendingDeleteAccounts } = useBulkDeleteAccounts()

    const isDisabled = isLoadingAccounts || isPendingDeleteAccounts

    if (isLoadingAccounts) {
        return (
            <div
                className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24"
            >
                <Card
                    className="border-none drop-shadow-sm"
                >
                    <CardHeader>
                        <Skeleton
                            className="h-8 w-48"
                        />
                    </CardHeader>
                    <CardContent>
                        <div
                            className="h-[500px] w-full flex items-center justify-center"
                        >
                            <Loader2
                                className="size-6 text-slate-300 animate-spin"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div
            className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24"
        >
            <Card
                className="border-none drop-shadow-sm"
            >
                <CardHeader
                    className="gap-y-2 lg:flex-row lg:items-center lg:justify-between"
                >
                    <CardTitle
                        className="text-xl line-clamp-1"
                    >
                        Histórico de transações
                    </CardTitle>
                    <Button
                        size={"sm"}
                        onClick={onOpen}
                    >
                        <Plus className="size-4 mr-2" />
                        Adicionar nova transação
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={accounts || []}
                        filterKey="name"
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            mutateDeleteAccounts({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage;