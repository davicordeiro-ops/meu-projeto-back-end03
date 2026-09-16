// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";

// importar a classe Player do arquivo Player.ts
/* Por que Player.ts deve ser importado com a extensão .js?
Porque o TypeScript, quando compila para JavaScript,
gera arquivos .js. Portanto, ao importar um módulo TypeScript
em outro arquivo TypeScript, você deve usar a extensão .js
para que o Node.js consiga localizar o arquivo corretamente.
*/
import { Player } from "./models/Player.js";
// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

/* Middleware para permitir que o sevidor aceite
requisitos com corpo em formato JSON */
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Cria um novo player com nome "jogador1", 100 de vida e nível 1
const player = new Player("Davi", 100, 1);
// Rota GET  para obter informações sobre um player
/* Quando um usuário acessar a rota "/player" via GET, o servidor
irá  retornar suas informações em formato JSON. */
app.get("/player", (req: Request, res: Response) => {
  res.json({
    message: "Informações do player",
    player: player,
  });
});

// Rota POST para atacar  o player
/* Quando um usuário acessar a rota "/player/attack" via POST, o servidor
irá chamar o método attack() do player e retornar a mensagem resultante. */
app.post("/player/attack",  (req: Request, res: Response) => {
  // Chamaro método attack() do player e armazenar a mensagem retorada
  const attackMessage = player.attack();
  //chamar o método attack do player e armazenar a mensagem de retorno
  res.json({
    message: attackMessage,
  });
});

// Rota POST para causar dano ao player
/* Quando um usuário acessar  a rota "/player/damage" via POST, o servidor
irá chamar o método take Damage() do player e retornar a mensagem resultante.*/
app.post("/player/damage", (req: Request, res: Response) => {
  const { damage } = req.body;
  const damageMessage = player.takeDamage(damage);
  res.json({
    action: damageMessage,
    currentHealth: player.health,
    currentLevel: player.level,
  });
});

app.post("/player/health", (req: Request, res: Response) => {
  const { heal } = req.body;
  const healthMessage = player.takeHealth(heal);
  res.json({
    action: healthMessage,
    currentHealth: player.health,
    currentLevel: player.level,
  });
});
// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Rotas Disponíveis:");
  console.log(`GET http://localhost:${PORT}/player - Obter informações do player`);
  console.log(`POST http://localhost:${PORT}/player/attack - Atacar o player`);
  console.log(`POST http://localhost:${PORT}/player/damage - Causar dano ao player`);
});