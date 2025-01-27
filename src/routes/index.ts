import express from 'express';
import UserRouter from "./User"
import MenuRouter from "./Menu"
import OrderRouter from "./Order"

const router = express.Router();
router.use("/user", UserRouter);
router.use("/Menu", MenuRouter);
router.use("/Order", OrderRouter);

export default router;