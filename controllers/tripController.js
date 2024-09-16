import { saveTripService, listTripsService, deleteTripService, searchTripsService } from '../services/tripService.js';

const saveTripController = async (req, res, next) => {
    try {
        const tripData = {
            ...req.body,
            userId: req.userId,
        };

        const newTrip = await saveTripService(tripData);
        res.status(201).json({
            message: 'Trip saved successfully',
            trip: newTrip,
        });
    } catch (err) {
        next(err);
    }
};

const listTripsController = async (req, res, next) => {
    try {
        const trips = await listTripsService(req.userId);
        res.status(200).json(trips);
    } catch (err) {
        next(err);
    }
};

const deleteTripController = async (req, res, next) => {
    try {
        const tripId = req.params.id;
        const userId = req.userId;
        await deleteTripService(tripId, userId);
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (err) {
        next(err);
    }
};

const searchTripsController = async (req, res, next) => {
    try {
        const results = await searchTripsService(req.query);
        res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};

export { saveTripController, listTripsController, deleteTripController, searchTripsController };
