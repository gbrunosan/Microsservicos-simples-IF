CREATE TABLE "notasFiscais" (
	"id" text PRIMARY KEY NOT NULL,
	"pedido_id" text NOT NULL,
	"data_criacao" timestamp DEFAULT now() NOT NULL
);
