import { useState } from 'react';

type ValidatorFn = (value: any, formData: any) => string | null;
type Validators = { [key: string]: ValidatorFn | Validators };
type ErrorValue = string | null | ErrorMap;
type ErrorMap = { [key: string]: ErrorValue };

const runValidator = (validators: Validators, data: any): ErrorMap => {
  const errors: ErrorMap = {};

  for (const key in validators) {
    const validator = validators[key];
    const value = data[key];

    if (typeof validator === 'function') {
      errors[key] = validator(value, data);
    } else if (typeof validator === 'object' && value !== undefined) {
      errors[key] = runValidator(validator as Validators, value);
    }
  }

  return errors;
};
export const useFormValidator = <T extends Record<string, any>>(initialData: T, validators: Validators) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const onChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const validationErrors = runValidator(validators, formData);
    setErrors(validationErrors);
    return validationErrors;
  };

  const reset = () => {
    setFormData(initialData);
    setErrors({});
  };

  return {
    formData,
    errors,
    onChange,
    validate,
    reset,
    setFormData, // in case of more complex updates
  };
};
