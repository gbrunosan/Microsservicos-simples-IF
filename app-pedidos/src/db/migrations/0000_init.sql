CREATE TYPE "public"."status_pedido" AS ENUM('pendente', 'pago', 'cancelado');--> statement-breakpoint
CREATE TABLE "clientes" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"cep" text NOT NULL,
	"data_nascimento" date,
	CONSTRAINT "clientes_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "pedidos" (
	"id" text PRIMARY KEY NOT NULL,
	"cliente_id" text NOT NULL,
	"quantidade" integer NOT NULL,
	"status" "status_pedido" DEFAULT 'pendente' NOT NULL,
	"data_criacao" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_clientes_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;