import { useState } from "react";

const useForm = (initialState, validate) => {
  const [form,    setForm]    = useState(initialState);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const blur = (key) => {
    const updatedTouched = { ...touched, [key]: true };
    setTouched(updatedTouched);
    const updatedErrors = validate(form);
    setErrors(updatedErrors);
  };

  const err = (key) => touched[key] && errors[key];

  const handleSubmit = (onSuccess) => (e) => {
    e.preventDefault();

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

  const reset = () => {
    setForm(initialState);
    setErrors({});
    setTouched({});
  };

  return { form, errors, set, blur, err, handleSubmit, reset };
};

export default useForm;
