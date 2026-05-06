import { useState } from "react";

/**
 * useForm — reusable hook for form state, validation, and blur tracking.
 *
 * @param {Object}   initialState  - the default values for every form field
 * @param {Function} validate      - receives the current form and returns an errors object
 *
 * @returns {Object}
 *   form        — current field values
 *   errors      — current validation errors (only shown after a field is touched)
 *   set(k, v)   — update a single field immutably
 *   blur(k)     — mark a field as touched and re-run validation
 *   err(k)      — returns the error message for k if the field has been touched, otherwise undefined
 *   handleSubmit(onSuccess) — returns an onSubmit handler; calls onSuccess(form) only when valid
 *   reset()     — restores the form to initialState
 */
const useForm = (initialState, validate) => {
  const [form,    setForm]    = useState(initialState);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});

  // Update a single field without mutating the previous state
  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Mark a field as visited and run validation so the error appears
  const blur = (key) => {
    const updatedTouched = { ...touched, [key]: true };
    setTouched(updatedTouched);
    const updatedErrors = validate(form);
    setErrors(updatedErrors);
  };

  // Returns the error string for a key only if the user has already touched that field
  const err = (key) => touched[key] && errors[key];

  // Call this in the form's onSubmit. It touches every field, validates,
  // and only calls onSuccess when there are no errors.
  const handleSubmit = (onSuccess) => (e) => {
    e.preventDefault();

    // Touch every field at once so all errors become visible
    const allTouched = Object.keys(form).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSuccess(form);
    }
  };

  // Bring the form back to its original values
  const reset = () => {
    setForm(initialState);
    setErrors({});
    setTouched({});
  };

  return { form, errors, set, blur, err, handleSubmit, reset };
};

export default useForm;
