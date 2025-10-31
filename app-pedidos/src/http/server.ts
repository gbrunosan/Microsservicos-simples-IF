import "@opentelemetry/auto-instrumentations-node/register";

import { fastify } from "fastify";
import { randomUUID } from "node:crypto";
import { setTimeout } from "node:timers/promises";
import { fastifyCors } from "@fastify/cors";
import { trace } from "@opentelemetry/api";
import { z } from "zod";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { channels } from "../broker/channels/index.ts";
import { schema } from "../db/schema/index.ts";
import { db } from "../db/client.ts";
import { enviarPedidoCriado } from "../broker/messages/pedido-criado.ts";
import { tracer } from "../tracer/tracer.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: "*" });

app.get("/health", () => {
  return "OK";
});

app.post(
  "/criarPedido",
  {
    schema: {
      body: z.object({
        quantidade: z.coerce.number(),
      }),
    },
  },
  async (request, reply) => {
    const { quantidade } = request.body;

    const pedidoId = randomUUID();

    await db.insert(schema.pedidos).values({
      id: pedidoId,
      clienteId: "B9176D35-7276-4255-A323-D825CAEE03B5",
      quantidade,
    });

    // trace.getActiveSpan()?.setAttribute("pedidoId", pedidoId)

    const span = tracer.startSpan("Tem um problema aqui")
    await setTimeout(2000)
    span.end()

    enviarPedidoCriado({
      pedidoId,
      quantidade,
      cliente: {
        id: "B9176D35-7276-4255-A323-D825CAEE03B5",
      },
    });
    console.log("Pedido criado com a quantidade: ", quantidade);

    return reply.status(201).send();
  }
);

app.listen({ host: "0.0.0.0", port: 3333 }).then(() => {
  console.log("[pedidos] HTTP Server running!");
});
