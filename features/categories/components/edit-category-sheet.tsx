import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";

import { Loader2 } from "lucide-react";


import { useConfirm } from "@/hooks/use-confirm";
import { CategoryForm } from "./category-form";
import { useGetCategory } from "../api/use-get-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";

const formSchema = insertCategorySchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory()

    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você não poderá desfazer essa ação. Deseja prosseguir com a deleção da categoria?"
    )

    const { data: categoryData, isLoading: isLoadingCategory } = useGetCategory(id)
    const { mutate: editCategoryMutate, isPending: isPendingEditCategory } = useEditCategory(id)
    const { mutate: deleteCategoryMutate, isPending: isPendingDeleteCategory } = useDeleteCategory(id)

    const isPending = isPendingEditCategory || isPendingDeleteCategory

    const onSubmit = (values: FormValues) => {
        editCategoryMutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteCategoryMutate(
                undefined,
                {
                    onSuccess: () => {
                        onClose()
                    }
                }
            )
        }
    }

    const defaultValues = categoryData ? { name: categoryData.name } : { name: '' }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar categoria
                        </SheetTitle>
                        <SheetDescription>
                            Atualize as informações da sua categoria
                        </SheetDescription>
                    </SheetHeader>
                    {isLoadingCategory ? (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Loader2
                                className="size-4 text-muted-foreground animate-spin"
                            />
                        </div>
                    ) : (
                        <CategoryForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPendingEditCategory}
                            defaultValues={defaultValues}
                            onDelete={onDelete}
                        />
                    )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}