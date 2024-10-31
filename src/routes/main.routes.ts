import { Router } from 'express';
import * as productCtrl from '../controllers/main.controller';
import { apiKeyChecker} from '../middlewares';
const router = Router();

router.post('/make-video',[apiKeyChecker], productCtrl.generateVideo);

export default router;
