import express, { Request, Response } from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import morgan from "morgan";
import { GithubService } from "./presentation/services/github.service";
import { DiscordService } from "./presentation/services/discord.service";
import { GithubSha256Middleware } from "./presentation/middlewares/githubsha256.middleware";

(async () => {
  await main();
})();

async function main() {
  const app = express();
  const PORT = envs.PORT ?? 30000;
  const githubService = new GithubService();
  const discordService = new DiscordService();
  const githubController = new GithubController(githubService, discordService);
  app.use(morgan("common"));
  app.use(express.json());
  app.use(GithubSha256Middleware.verifyGithubSignature)
  app.post("/api/github", githubController.webHookHandler);
  app.listen(3000, () => {
    console.log(
      `🚀 la app esta corriendo fuerte en el contenedor http://localhost:${PORT} \n`,
      `Para ingresar de afuera solo http://localhost`,
    );
  });
}
