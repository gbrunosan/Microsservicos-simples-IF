import { date, integer } from 'drizzle-orm/pg-core'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const clientes = pgTable('clientes', {
  id: text().primaryKey(),
  nome: text().notNull(),
  email: text().notNull().unique(),
  cep: text().notNull(),
  dataNascimento: date({ mode: 'date' }),
})