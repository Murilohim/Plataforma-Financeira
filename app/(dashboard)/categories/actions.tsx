"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
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
        "Você não poderá desfazer essa ação. Deseja prosseguir com a deleção da categoria?"
    )

    const { mutate: deleteCategoryMutate, isPending: isPendingDeleteCategory } = useDeleteCategory(id)
    const { onOpen } = useOpenCategory()

    const handleDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteCategoryMutate()
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
                        disabled={isPendingDeleteCategory}
                    >
                        <Edit
                            className="size-4 mr-2"
                        />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        disabled={isPendingDeleteCategory}
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