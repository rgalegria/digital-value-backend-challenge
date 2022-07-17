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
        let catTable = await db.all(`SELECT * FROM categories`);
        let closure = await db.all(`SELECT * FROM categories_closure ORDER BY ancestor_id`);
        await db.close();

        let result = []; // End result
        let categories = {}; // Categories dictionary indexed by id

        // Create dictionary
        catTable.forEach((cat) => {
            categories[cat.id] = { id: cat.id, name: cat.name };
        });

        // Data loop
        Object.keys(categories).forEach((key) => {
            let obj = { ...categories[key], ancestors: [], children: [] };

            closure.forEach((elem) => {
                if (elem.ancestor_id === elem.descendant_id) return;
                if (key == elem.ancestor_id) obj.children.push({ ...categories[elem.descendant_id] });
                if (key == elem.descendant_id) obj.ancestors.push({ ...categories[elem.ancestor_id] });
            });
            result.push(obj);
        });

        // Return response
        res.status(200).json(result);
    })();
};
