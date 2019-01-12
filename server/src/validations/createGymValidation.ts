import validator from "validator";
import { isEmpty } from "./isEmptyValidation";

interface validGym {
  name?: string;
  city?: string;
  description?: string;
  website?: string;
}

export function validateCreateGym(data: any) {
  let errors: validGym = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.website = !isEmpty(data.website) ? data.website : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required!";
  }

  if (validator.isEmpty(data.city)) {
    errors.city = "City is required!";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Description is required!";
  }

  if (validator.isEmpty(data.website)) {
    errors.website = "Website is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
