"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

const CategoriesPage = () => {

    const { onOpen } = useNewCategory()
    const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategories()
    const { mutate: mutateDeleteCategories, isPending: isPendingDeleteCategories } = useBulkDeleteCategories()

    const isDisabled = isLoadingCategories || isPendingDeleteCategories

    if (isLoadingCategories) {
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
                        Página de categorias
                    </CardTitle>
                    <Button
                        size={"sm"}
                        onClick={onOpen}
                    >
                        <Plus className="size-4 mr-2" />
                        Adicionar nova categoria
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={categoriesData || []}
                        filterKey="name"
                        onDelete={(rows) => {
                            const ids = rows.map((row) => row.original.id)
                            mutateDeleteCategories({ ids })
                        }}
                        disabled={isDisabled}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage;