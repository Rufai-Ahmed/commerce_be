import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router: Router = Router();

router
  .route("/product/:userID")
  .post(createProduct)
  .get(getProducts)
  .delete(deleteProduct)
  .patch(updateProduct);

export default router;
