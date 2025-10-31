import { broker } from "../broker.ts";

export const pedidos = await broker.createChannel();

await pedidos.assertQueue("pedidos");
