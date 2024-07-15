"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string;
}

export const Actions = (
    { id }: Props
) => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você não poderá desfazer essa ação. Deseja prosseguir com a deleção da transação?"
    )

    const { mutate: deleteTransactionMutate, isPending: isPendingDeleteTransaction } = useDeleteTransaction(id)
    const { onOpen } = useOpenTransaction()

    const handleDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteTransactionMutate()
        }
    }


    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="size-8 p-0"
                    >
                        <MoreHorizontal
                            className="size-4"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                >
                    <DropdownMenuItem
                        onClick={() => onOpen(id)}
                        disabled={isPendingDeleteTransaction}
                    >
                        <Edit
                            className="size-4 mr-2"
                        />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        disabled={isPendingDeleteTransaction}
                    >
                        <Trash
                            className="size-4 mr-2"
                        />
                        Deletar
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}