import { Router } from "express";
import authRoutes from "./auth";
import machineRoutes from "./machines";
import workOrderRoutes from "./workOrders";
import partsRoutes from "./parts";
import documentRoutes from "./documents";
import usersRoutes from "./users";
import dashboardRoutes from "./dashboard";
import searchRoutes from "./search";

const router = Router();

router.use("/auth", authRoutes);
router.use("/machines", machineRoutes);
router.use("/work-orders", workOrderRoutes);
router.use("/parts", partsRoutes);
router.use("/documents", documentRoutes);
router.use("/users", usersRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/search", searchRoutes);

export default router;


