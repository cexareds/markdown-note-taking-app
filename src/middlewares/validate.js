import Joi from "joi";

export const validateNoteUpload = (req, res, next) => {
  const schema = Joi.object({
    file: Joi.object().required().messages({
      "any.required": "File is required",
    }),
  });

  const { error } = schema.validate(req, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      details: error.details.map((err) => err.message),
    });
  }

  next();
};
