# Microsservicos-simples-IF
 
### Instale o docker desktop


#### Divida os terminais em Fatura / Pedidos / API Gateway
O terminal de fatura deve estar na pasta "app-notasFiscais"
O terminal de pedidos deve estar no pasta "app-pedidos"
O terminal do Gateway na pasta raiz

#### Suba os bancos em docker (pode usar o desktop pra ver melhor) e o gateway
docker compose up -d  →  nos 3 terminais, isso vai subir o banco dos dois serviços e o gateway (localhost:8000).

#### Drizzle
Rode esses dois comandos para criar o banco de dados (já tem que estar em docker a imagem do postgres que vc subiu acima):
npx drizzle-kit generate --name init (ou outro nome)  (Cria o arquivo da migração (SQL) com base no schema)

npx drizzle-kit migrate  (Executa as migrações e aplica as mudanças no banco real)

 npx drizzle-kit studio (abre a interface caso queira ver ou criar coisas no banco)



#### URLS das interfaces (bem útil viu)
(https://local.drizzle.studio/, visualizar banco de dados através da interface do drizzle

http://localhost:15672/ → Interface de messageria do rabbitmq user:guest password:guest

http://localhost:16686/ →  Interface do tracer para observabilidade (grafana seria melhor, mas esse é o jeaguer)

http://localhost:8002/ → Interface do Kong para ver serviços se comunicando com API Gateway



#### Ver se o serviço está de pé (circuit breaker) usando o get dos serviços
http://localhost:8000/pedidos/health
http://localhost:8000/notasFiscais/health


#### POST para criar um pedido
Para fazer um POST, tire a trava do app/pedidos/src/http/server.ts ou simplesmente crie um cliente com esse 
ID: B9176D35-7276-4255-A323-D825CAEE03B
use a interface do banco para isso: https://local.drizzle.studio/ e clique em add record.

Aí teste o POST com algum software, ex: HTTPie, postman, etc...
usando o HTTPie → http POST :8000/pedidos/criarPedido quantidade=10 


