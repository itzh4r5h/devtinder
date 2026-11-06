import Joi from 'joi'

export const profilePicValidator = () => {
  const schema = Joi.object({
    pic: Joi.object().instance(File).custom((file, helpers) => {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

      if (!allowedTypes.includes(file.type)) {
        return helpers.error("file.type");
      }

      if (file.size > 2 * 1024 * 1024) {
        return helpers.error("file.size");
      }

      return file; // valid
    }).messages({
      "file.type": "only png, jpeg and webp files are allowed",
      "file.size": `File size must not exceed 2MB`,
    }),

  }); return schema
} 
