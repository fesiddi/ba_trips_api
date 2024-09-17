import Trip from '../models/Trip.js';
import { apiClient, constructUrl } from '../utils/apiClient.js';
import {
  ExternalApiError,
  ExistingTripError,
  NotFoundError,
} from '../utils/errors.js';
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 600 });

const saveTripService = async (tripData) => {
  const newTrip = new Trip(tripData);

  const existingTrip = await Trip.findOne({
    id: tripData.id,
    userId: tripData.userId,
  });

  if (existingTrip) {
    throw new ExistingTripError('Error saving trip, trip already exists');
  }

  await newTrip.save();
  return newTrip.toJSON();
};

const listTripsService = async (userId) => {
  const trips = await Trip.find({ userId: userId });
  return trips.map((trip) => trip.toJSON());
};

const deleteTripService = async (tripId, userId) => {
  const trip = await Trip.findOne({ id: tripId, userId: userId });
  if (!trip) {
    throw new NotFoundError('Error deleting trip. Trip not found');
  }
  await trip.deleteOne({ _id: trip._id });
};

const searchTripsService = async (query) => {
  const { origin, destination, sort_by } = query;
  const cacheKey = `${origin}-${destination}-${sort_by}`;

  const cachedResults = cache.get(cacheKey);
  if (cachedResults) {
    return cachedResults;
  }

  try {
    const apiUrl = constructUrl(origin, destination);
    const response = await apiClient.get(apiUrl);
    let results = response.data;

    if (sort_by === 'fastest') {
      results = results.sort((a, b) => a.duration - b.duration);
    } else if (sort_by === 'cheapest') {
      results = results.sort((a, b) => a.cost - b.cost);
    }

    cache.set(cacheKey, results);

    return results;
  } catch (err) {
    throw new ExternalApiError();
  }
};

export {
  saveTripService,
  listTripsService,
  deleteTripService,
  searchTripsService,
};
