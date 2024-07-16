"use client"

import { useGetSummary } from "@/features/summary/api/use-get-summary"
import { formatDateRage } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { FaPiggyBank } from "react-icons/fa"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6"
import { Datacard, DataCardLoading } from "./data-card"

export const DataGrid = () => {

    const { data: summaryData, isLoading: isLoadingSummary } = useGetSummary()

    const params = useSearchParams()
    const to = params.get('to') || undefined
    const from = params.get('from') || undefined

    const dateRangeLabel = formatDateRage({ to, from })

    if (isLoadingSummary) {
        return (
            <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8"
            >
                <DataCardLoading />
                <DataCardLoading />
                <DataCardLoading />
            </div>
        )
    }

    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8"
        >
            <Datacard
                title="Restante"
                value={summaryData?.remainingAmount}
                percentageChange={summaryData?.remainingChange}
                icon={FaPiggyBank}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <Datacard
                title="Receita"
                value={summaryData?.incomeAmout}
                percentageChange={summaryData?.incomeChange}
                icon={FaArrowTrendUp}
                variant="default"
                dateRange={dateRangeLabel}
            />
            <Datacard
                title="Despesas"
                value={summaryData?.expensesAmount}
                percentageChange={summaryData?.expensesChange}
                icon={FaArrowTrendDown}
                variant="default"
                dateRange={dateRangeLabel}
            />
        </div>
    )
}