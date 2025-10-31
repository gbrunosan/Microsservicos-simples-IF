import { timestamp } from 'drizzle-orm/pg-core'
import { text } from 'drizzle-orm/pg-core'
import { pgTable } from 'drizzle-orm/pg-core'

export const notasFiscais = pgTable('notasFiscais', {
  id: text().primaryKey(),
  pedidoId: text().notNull(),
  dataCriacao: timestamp().defaultNow().notNull(),
})