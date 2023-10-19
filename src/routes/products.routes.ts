import { Router } from 'express';
import * as productCtrl from '../controllers/products.controller';
import { verifyToken , IsModerator,IsAdmin, validateSchema} from '../middlewares';
import { productSchema } from '../schemas/productSchema';
const router = Router();

router.post('/',[validateSchema(productSchema),verifyToken,IsModerator], productCtrl.createProduct);
router.get('/', productCtrl.getProducts);
router.get('/:productId', productCtrl.getProductById);
router.put('/:productId', [validateSchema(productSchema),verifyToken,IsAdmin,],productCtrl.updateProductById);
router.delete('/:productId',[verifyToken,IsAdmin], productCtrl.deleteProductById);

export default router;
