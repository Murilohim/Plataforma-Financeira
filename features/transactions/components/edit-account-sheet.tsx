import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AccountForm } from "./transaction-form"
import { insertAccountsSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-transaction";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-transaction";
import { useDeleteAccount } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertAccountsSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount()

    const [ConfirmDialog, confirm] = useConfirm(
        "Você tem certeza?",
        "Você não poderá desfazer essa ação. Deseja prosseguir com a deleção da conta?"
    )

    const { data: accountData, isLoading: isLoadingAccount } = useGetAccount(id)
    const { mutate: editAccountMutate, isPending: isPendingEditAccount } = useEditAccount(id)
    const { mutate: deleteAccountMutate, isPending: isPendingDeleteAccount } = useDeleteAccount(id)

    const isPending = isPendingEditAccount || isPendingDeleteAccount

    const onSubmit = (values: FormValues) => {
        editAccountMutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteAccountMutate(
                undefined,
                {
                    onSuccess: () => {
                        onClose()
                    }
                }
            )
        }
    }

    const defaultValues = accountData ? { name: accountData.name } : { name: '' }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>
                            Editar conta
                        </SheetTitle>
                        <SheetDescription>
                            Atualize as informações da sua conta
                        </SheetDescription>
                    </SheetHeader>
                    {isLoadingAccount ? (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Loader2
                                className="size-4 text-muted-foreground animate-spin"
                            />
                        </div>
                    ) : (
                        <AccountForm
                            id={id}
                            onSubmit={onSubmit}
                            disabled={isPendingEditAccount}
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