import { Router } from 'express';
import * as productCtrl from '../controllers/products.controller';
import { verifyToken , IsModerator,IsAdmin} from '../middlewares';
const router = Router();

router.post('/',[verifyToken,IsModerator], productCtrl.createProduct);
router.get('/', productCtrl.getProducts);
router.get('/:productId', productCtrl.getProductById);
router.put('/:productId', [verifyToken,IsAdmin],productCtrl.updateProductById);
router.delete('/:productId',[verifyToken,IsAdmin], productCtrl.deleteProductById);

export default router;
