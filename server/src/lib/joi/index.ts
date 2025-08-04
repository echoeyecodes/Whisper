import Joi, { CustomHelpers } from "joi";

const JoiWithExtension = Joi.extend((joi) => ({
  base: joi.array(),
  coerce: (value: string, helpers: CustomHelpers) => {
    if (typeof value !== "string") {
      return { value, errors: [helpers.error("string.stringArray")] };
    }

    const array = value.split(",").map((item) => item.trim());
    if (array.some((item) => item.length === 0)) {
      return { value, errors: [helpers.error("string.stringArray")] };
    }

    return { value: array };
  },
  type: "stringArray",
})) as typeof Joi;

export default JoiWithExtension;
// Type augmentation for the custom method
declare module "joi" {
  export interface Root {
    stringArray(): ArraySchema;
  }
}
