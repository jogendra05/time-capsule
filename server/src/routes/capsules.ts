import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createCapsule, deleteCapsule, getCapsule, listCapsules, updateCapsule } from '../controllers/capsuleController';

const router = Router();

router.use(authenticate);
router.post('/create', createCapsule);
router.get('/list', listCapsules);
router.get('/get/:id', getCapsule);
router.put('/update/:id', updateCapsule);
router.delete('/delete/:id',deleteCapsule);


export default router;
