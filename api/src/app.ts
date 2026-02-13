import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "¡Hola desde Express en Docker!",
        timestamp: new Date().toISOString(),
        // Esto confirmará si estás pasando por Nginx o no
        via_nginx: req.headers["x-forwarded-host"] ? "Sí" : "No",
        client_info: {
            ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
            userAgent: req.headers["user-agent"],
        },
    });
});

app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
