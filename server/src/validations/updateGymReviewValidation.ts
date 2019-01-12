import validator from "validator";
import { isEmpty } from "./isEmptyValidation";

export function updateGymReviewValidation(data: any) {
  let errors: any = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (validator.isEmpty(data.text)) {
    errors.text = "Review is required!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
