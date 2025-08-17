export const notFound = (req, res) => {
    res.status(404).json({ message: `Route not found:${req.method} ${req.originalUrl}` });
};
export const errorHandler = (err, req, res, _next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ message: err.message || 'Server Error', stack: process.env.NODE_ENV === "production" ? undefined : err.stack });
};
