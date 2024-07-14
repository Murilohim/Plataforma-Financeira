"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
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
        "Você não poderá desfazer essa ação. Deseja prosseguir com a deleção da conta?"
    )

    const { mutate: deleteAccountMutate, isPending: isPendingDeleteAccount } = useDeleteAccount(id)
    const { onOpen } = useOpenAccount()

    const handleDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteAccountMutate()
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
                        disabled={isPendingDeleteAccount}
                    >
                        <Edit
                            className="size-4 mr-2"
                        />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        disabled={isPendingDeleteAccount}
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