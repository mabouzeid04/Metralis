import { Router } from "express";
import authRoutes from "./auth";
import machineRoutes from "./machines";
import workOrderRoutes from "./workOrders";
import partsRoutes from "./parts";
import documentRoutes from "./documents";
import usersRoutes from "./users";
import dashboardRoutes from "./dashboard";
import searchRoutes from "./search";
import profileRoutes from "./profile";
import aiRoutes from "./ai";
import analyticsRoutes from "./analytics";
import assetRoutes from "./assets";
import factoryConfigRoutes from "./factoryConfig";

const router = Router();

router.use("/auth", authRoutes);
router.use("/machines", machineRoutes);
router.use("/work-orders", workOrderRoutes);
router.use("/parts", partsRoutes);
router.use("/documents", documentRoutes);
router.use("/users", usersRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/search", searchRoutes);
router.use("/profile", profileRoutes);
router.use("/ai", aiRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/assets", assetRoutes);
router.use("/factory-config", factoryConfigRoutes);

export default router;


