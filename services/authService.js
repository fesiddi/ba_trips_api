import User from '../models/User.js';
import {
    BadRequestError,
    ExistingUserError,
    UnauthorizedError,
} from '../utils/errors.js';
import jwt from 'jsonwebtoken';

const register = async ({ username, password, passwordConf, email }) => {
    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        throw new ExistingUserError();
    }

    if (password !== passwordConf) {
        throw new BadRequestError('Passwords do not match, please try again');
    }

    const newUser = new User({ username, password, email });
    await newUser.save();
    return {
        message: `User ${username} created, please login in order to obtain a token`,
    };
};

const login = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user || !(await user.verifyPassword(password))) {
        throw new UnauthorizedError();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return token;
};

export default { register, login };
