import { Router } from 'express';
import * as productCtrl from '../controllers/products.controller';
import { verifyToken , IsModerator,IsAdmin, validateSchema} from '../middlewares';
import { productSchema } from '../schemas/productSchema';
const router = Router();

router.post('/',[verifyToken,IsModerator,validateSchema(productSchema)], productCtrl.createProduct);
router.get('/', productCtrl.getProducts);
router.get('/:productId', productCtrl.getProductById);
router.put('/:productId', [verifyToken,IsAdmin,validateSchema(productSchema)],productCtrl.updateProductById);
router.delete('/:productId',[verifyToken,IsAdmin], productCtrl.deleteProductById);

export default router;
