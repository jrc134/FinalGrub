import express from 'express';

import { getDonations, getDonationsBySearch, getDonationsByCreator, getDonation, createDonation, updateDonation, likeDonation, commentDonation, deleteDonation } from '../controllers/donations.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getDonationsByCreator);
router.get('/search', getDonationsBySearch);
router.get('/', getDonations);
router.get('/:id', getDonation);

router.post('/', auth,  createDonation);
router.patch('/:id', auth, updateDonation);
router.delete('/:id', auth, deleteDonation);
router.patch('/:id/likeDonation', auth, likeDonation);
router.post('/:id/commentDonation', commentDonation);

export default router;