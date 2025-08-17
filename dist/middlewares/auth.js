import { verifyToken } from "../utils/jwt";
export const auth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer"))
        return res.status(401).json({ message: "Unauthorized" });
    const token = header.split(" ")[1];
    try {
        const payload = verifyToken(token);
        req.user = { id: payload.id, role: payload.role };
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
export const isRole = (roles) => (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role))
        return res.status(403).json({ message: "Forbidden" });
    next();
};
