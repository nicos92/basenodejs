import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly discordService: DiscordService,
  ) {}
  webHookHandler = (req: Request, res: Response) => {
    const signature = req.header("x-hub-signature-256") ?? "unknown";
    const githubEvent = req.header("x-github-event") ?? "unknown";
    const payload = req.body;
    let message: string = "";

    switch (githubEvent) {
      case "star":
        message = this.githubService.onStar(payload);
        break;
      case "issues":
        message = this.githubService.onIssues(payload);
        break;
      default:
        console.log(`Unknown event: ${githubEvent}`);
    }
    console.log(message);
    this.discordService
      .notity(message)
      .then(() => res.status(202).send("Accepted"))
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };
}
