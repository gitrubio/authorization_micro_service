import { Router } from 'express';
import * as productController from '../controllers/products.controller';
const router = Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProductById);
router.delete('/:productId', productController.deleteProductById);

export default router;
