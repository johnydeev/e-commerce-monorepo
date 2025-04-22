import express, { Application } from "express";
import ENVIRONMENT from "./config/environment.config";
import connectToMongoDB from "./config/mongoDB.config";
import productRouter from "./routes/product.route";
import customerRouter from "./routes/customer.route";
import orderRouter from "./routes/order.route";
import publicOrderRouter from "./routes/publicOrder.route";
import authRouter from "./routes/auth.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import cors from "cors";
const app: Application = express();
app.use(
    cors({
        origin: [
        'http://localhost:5173',
        'https://e-commerce-monorepo-front.vercel.app',
        ],
        credentials: true,
    }),
);
app.use(express.json());
app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
});
// Rutas
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/customer", customerRouter);
app.use("/api/order", orderRouter); // rutas privadas (requiere login)
app.use("/api/public/orders", publicOrderRouter); // REVISAR POR QUE SE ARREGLO PARA QUE FUNCIONE SIN USUARIO EN LA MISMA PETICION DE ORDER
app.use(errorHandler); // Middleware de manejo de errores

// Conexión a la base de datos y servidor
connectToMongoDB()

const PORT: number = parseInt(ENVIRONMENT.PORT, 10) || 3000;
app.listen(PORT, () => {
    console.log(
        `el servidor esta ejecutandose en el puerto http://localhost:${PORT}`
    );
});
