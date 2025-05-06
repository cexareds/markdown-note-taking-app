import logger from "../utils/logger";

export const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({
    message: "Internal server error",
    details: err.message,
  });
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
