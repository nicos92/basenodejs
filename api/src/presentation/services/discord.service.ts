import { envs } from "../../config";

export class DiscordService {
    private readonly discordWebhookUrl: string;
    constructor() {
        this.discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;
    }

    async notity(message: string) {
        const body = {
            content: message,
            embeds: [
                {
                    image: {
                        url: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXNrcXJuOTY0azg2bnF4MnkybnYzY2V4cWp4cHgwZHJlNDV3cW42cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14jzZv9EFK8T8Q/giphy.gif",
                    },
                },
            ],
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
