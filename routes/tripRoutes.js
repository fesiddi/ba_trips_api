import express from 'express';
import {
  saveTripController,
  listTripsController,
  deleteTripController,
  searchTripsController,
} from '../controllers/tripController.js';
import { validateTrip, validateSearch } from '../middlewares/validate.js';
import authenticateUser from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/trips', authenticateUser, validateTrip, saveTripController);

router.get('/trips', authenticateUser, listTripsController);

router.delete('/trips/:id', authenticateUser, deleteTripController);

router.get(
  '/trips/search',
  authenticateUser,
  validateSearch,
  searchTripsController,
);

export default router;
