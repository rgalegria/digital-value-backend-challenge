import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

// Router files
import categoriesRoutes from "./routes/categories-routes";

// Create express app
const app = express();

// CORS Headers
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Access Routes
app.use("/categories", categoriesRoutes);

// 404 Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Route non trouvée" });
});

export default app;
