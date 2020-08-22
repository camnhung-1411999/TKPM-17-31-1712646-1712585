import express from 'express';
import profileController from '../controllers/profile.controller';
const router = express.Router();
router.get('/', profileController.Profile);

router.post('/', profileController.UpdateProfile);

router.get('/bill',profileController.ProfileBill);

router.get('/bill/:id',profileController.InfoBill);

router.get('/changepassword',profileController.ChangePassword);

router.post('/changepassword', profileController.PostChangePassword);
export default router;