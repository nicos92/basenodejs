import { envs } from "../../config";

export class DiscordService {
  private readonly discordWebhookUrl: string;
  constructor() {
    this.discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;
  }

  async notity(message: string) {
    const body = {
      content: message,
    };

    const response = await fetch(this.discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  }
}
