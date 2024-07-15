import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRef, useState } from "react"
import { useGetAccounts } from "../api/use-get-accounts"
import { useCreateAccount } from "../api/use-create-account"
import { Select } from "@/components/select"

export const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {

    const { data: accountsData, isLoading: isLoadingAccounts } = useGetAccounts()
    const { mutate: createAccountMutate, isPending: isPendingCreateAccount } = useCreateAccount()
    const onCreateAccount = (name: string) => {
        createAccountMutate({ name })
    }
    const accountOptions = (
        accountsData?.map((account) => ({
            value: account.id,
            label: account.name
        })) || []
    )

    const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null)
    const selectValue = useRef<string>()

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve })
        })
    }

    const handleClose = () => {
        setPromise(null)
    }

    const handleConfirm = () => {
        promise?.resolve(selectValue.current)
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(undefined)
        handleClose()
    }

    const ConfirmationDialog = () => (
        <Dialog
            open={promise !== null}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Selecione uma conta
                    </DialogTitle>
                    <DialogDescription>
                        Por favor, selecione uma conta para continuar.
                    </DialogDescription>
                </DialogHeader>
                <Select
                    placeholder="Selecione uma conta"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => {
                        selectValue.current = value
                    }}
                    disabled={isLoadingAccounts || isPendingCreateAccount}
                />
                <DialogFooter
                    className="pt-2"
                >
                    <Button
                        onClick={handleCancel}
                        variant={"outline"}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmationDialog, confirm]
}