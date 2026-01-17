export const notFoundMiddleware = (req, res) => {
  res.status(404).join({ msg: 'Route not found' });
};
