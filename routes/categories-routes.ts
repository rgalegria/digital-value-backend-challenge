"use strict";
import { Router } from "express";
const router = Router();

// Controllers
import { getCategories } from "../controllers/categories";

/**
 * GET Routes
 ================================================================= */
router.get("/", getCategories);

export default router;
