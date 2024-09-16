import authService from '../services/authService.js'; 

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
}

export default { register, login };