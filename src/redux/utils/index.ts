import validator from "validator";

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const checkData = (data: { email: string }) => {
  const phonePattern = /^\+223[56789]\d{7}$/;

  if (validator.isEmail(data.email)) {
    return { phone: "", email: data.email, username: "" };
  }

  if (phonePattern.test(data.email)) {
    return { phone: data.email, email: "", username: "" };
  }

  return { phone: "", email: "", username: data.email };
};
