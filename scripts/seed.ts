import { accounts, categories, transactions } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2hzhziQM1PnZpFFBzlVw8f0VHIh";

const SEED_CATEGORIES = [
    { id: "category_1", name: "Alimentação", userId: SEED_USER_ID, plaidId: null },
    { id: "category_2", name: "Aluguel", userId: SEED_USER_ID, plaidId: null },
    { id: "category_3", name: "Utilidades", userId: SEED_USER_ID, plaidId: null },
    { id: "category_4", name: "Vestuário", userId: SEED_USER_ID, plaidId: null },
]

const SEED_ACCOUNTS = [
    { id: "account_1", name: "Conta Corrente", userId: SEED_USER_ID, plaidId: null },
    { id: "account_2", name: "Poupança", userId: SEED_USER_ID, plaidId: null },
]

const defaultTo = new Date()
const defaultFrom = subDays(defaultTo, 90)

const SEED_TRANSACTIONS: typeof transactions.$inferSelect[] = []

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
    switch (category.name) {
        case "Alimentação":
            return Math.random() * 30 + 10
        case "Aluguel":
            return Math.random() * 400 + 90
        case "Utilidades":
            return Math.random() * 200 + 10
        case "Vestuário":
            return Math.random() * 300
        default:
            return Math.random() * 100
    }
}

const generateTransactionsForDay = (day: Date) => {
    const numTransactions = Math.floor(Math.random() * 4) + 1

    for (let i = 0; i < numTransactions; i++) {
        const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)]
        const isExpense = Math.random() > 0.6
        const amount = generateRandomAmount(category)
        const amountToUse = isExpense ? -amount : amount


        SEED_TRANSACTIONS.push({
            id: `transaction_${format(day, "yyyyMMdd")}_${i}`,
            accountId: SEED_ACCOUNTS[0].id,
            categoryId: category.id,
            date: day,
            amount: amountToUse,
            payee: "Comerciante",
            notes: "Transação randomica",
        })
    }
}

const generateTransactions = () => {
    const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo })
    days.forEach(day => generateTransactionsForDay(day))
}

generateTransactions()

const main = async () => {
    try {
        // Reseta o banco de dados
        await db.delete(transactions).execute()
        await db.delete(accounts).execute()
        await db.delete(categories).execute()
        // Insere as categorias
        await db.insert(categories).values(SEED_CATEGORIES).execute()
        // Insere as contas
        await db.insert(accounts).values(SEED_ACCOUNTS).execute()
        // Insere as transações
        await db.insert(transactions).values(SEED_TRANSACTIONS).execute()
    } catch (error) {
        console.error("erro durante seed:", error)
        process.exit(1)
    }
}

main()