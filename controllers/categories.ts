// "use strict";
import { Request, Response, NextFunction } from "express";
import { open } from "sqlite";
import * as sqlite3 from "sqlite3";

/**
 * GET Categories Controller
 ================================================================= */

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        // DB fetch data
        const db = await open({ filename: "db.sqlite", driver: sqlite3.Database });
        const categories = await db.all(`SELECT id, name FROM categories`);
        await db.close();

        // return response
        res.status(200).json(categories);
    })();
};
