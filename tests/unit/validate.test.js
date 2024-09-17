import { expect } from 'chai';
import { validateSearch, validateTrip } from '../../middlewares/validate.js';
import { BadRequestError } from '../../utils/errors.js';

describe('Validation Middleware', () => {
    describe('validateSearch', () => {
        it('should pass validation for valid search query', () => {
            const req = {
                query: {
                    origin: 'JFK',
                    destination: 'LAX',
                    sort_by: 'fastest',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateSearch(req, res, next)).to.not.throw();
        });

        it('should throw BadRequestError for invalid origin', () => {
            const req = {
                query: {
                    origin: 'INVALID',
                    destination: 'LAX',
                    sort_by: 'fastest',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateSearch(req, res, next)).to.throw(
                BadRequestError
            );
        });

        it('should throw BadRequestError for missing sort_by', () => {
            const req = {
                query: {
                    origin: 'JFK',
                    destination: 'LAX',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateSearch(req, res, next)).to.throw(
                BadRequestError
            );
        });
    });

    describe('validateTrip', () => {
        it('should pass validation for valid trip data', () => {
            const req = {
                body: {
                    id: '123',
                    origin: 'JFK',
                    destination: 'LAX',
                    cost: 100,
                    duration: 300,
                    type: 'flight',
                    display_name: 'Flight from JFK to LAX',
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateTrip(req, res, next)).to.not.throw();
        });

        it('should throw BadRequestError for missing id', () => {
            const req = {
                body: {
                    origin: 'JFK',
                    destination: 'LAX',
                    cost: 100,
                    duration: 300,
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateTrip(req, res, next)).to.throw(
                BadRequestError
            );
        });

        it('should throw BadRequestError for invalid destination', () => {
            const req = {
                body: {
                    id: '123',
                    origin: 'JFK',
                    destination: 'INVALID',
                    cost: 100,
                    duration: 300,
                },
            };
            const res = {};
            const next = () => {};

            expect(() => validateTrip(req, res, next)).to.throw(
                BadRequestError
            );
        });
    });
});
