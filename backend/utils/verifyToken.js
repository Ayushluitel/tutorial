import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'You are not authorized' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Token is invalid' });
        }

        req.user = user;
        next(); // Move to the next middleware
    });
};

// Verify if the user is authenticated (matches ID or is admin)
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (!req.user) {
            return res.status(403).json({ success: false, message: 'User not found' });
        }

        if (req.user.id === req.params.id || req.user.role === 'user') {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'You are not authenticated' });
        }
    });
};

// Verify if the user is an admin
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ success: false, message: 'Invalid user data' });
        }

        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ success: false, message: 'You are not authorized' });
        }
    });
};
