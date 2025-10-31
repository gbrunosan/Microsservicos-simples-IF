import { integer } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { clientes } from "./clientes.ts";

export const statusPedidoEnum = pgEnum("status_pedido", [
  "pendente",
  "pago",
  "cancelado",
]);

export const pedidos = pgTable("pedidos", {
  id: text().primaryKey(),
  clienteId: text()
    .notNull()
    .references(() => clientes.id),
  quantidade: integer().notNull(),
  status: statusPedidoEnum().notNull().default("pendente"),
  dataCriacao: timestamp().defaultNow().notNull(),
});
