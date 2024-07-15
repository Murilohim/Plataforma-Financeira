"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

const TransactionsPage = () => {

    const { onOpen } = useNewTransaction()
    const { data: transactionsData, isLoading: isLoadingTransactions } = useGetTransactions()
    const { mutate: mutateDeleteTransactions, isPending: isPendingDeleteTransactions } = useBulkDeleteTransactions()

    const isDisabled = isLoadingTransactions || isPendingDeleteTransactions

    if (isLoadingTransactions) {
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
                        data={transactionsData || []}
                        filterKey="payee"
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            mutateDeleteTransactions({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionsPage;