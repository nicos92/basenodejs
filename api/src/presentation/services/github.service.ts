import { isUint16Array } from "util/types";
import { GithubIssuesPayload, GithubStarPayload } from "../../interfaces";

export class GithubService {
    constructor() {}

    onStar(payload: GithubStarPayload): string {
        const { action, sender, repository, starred_at } = payload;
        if (!action) {
            return "Accion no reconocida";
        }

        return `${new Date().toUTCString()} - User ${sender.login} ${action} star on ${repository.full_name} `;
    }

    onIssues(payload: GithubIssuesPayload): string {
        if (!payload) {
            return "Accion no reconocida";
        }
        const { action, issue } = payload;

        if (action === "opened") {
            return `Un issue fue abierto por ${issue.user.login}. Issue => ${issue.title}`;
        }
        if (action === "closed") {
            return `Un issue fue cerrado por ${issue.user.login}. Issue => ${issue.title}`;
        }
        if (action === "reopened") {
            return `Un issue fue vuelto a abrir por ${issue.user.login}. Issue => ${issue.title}`;
        }
        if (action === "deleted") {
            return `Un issue fue eliminado por ${issue.user.login}. Issue => ${issue.title}`;
        }

        return `issue no reconocido ${action}`;
    }
}
