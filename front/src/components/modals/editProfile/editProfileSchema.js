import * as Yup from "yup";

export const schema = Yup.object().shape({
  name: Yup.string().required("Name is required").max(255, "Name should contain not more than 255 symbols"),
  email: Yup.string().required("Email is required").max(255, "Name should contain not more than 255 symbols"),
  email_visibility: Yup.object().shape({
    value: Yup.number(),
    label: Yup.string(),
  }).nullable(),
  phone: Yup.string().matches(/^\+380\d{9}$/, "Phone should match +380xxxxxxxxx").nullable(),
  phone_visibility: Yup.object().shape({
    value: Yup.number(),
    label: Yup.string(),
  }).nullable(),
  university: Yup.object().shape({
    value: Yup.number(),
    label: Yup.string(),
  }).nullable(),
  university_visibility: Yup.object().shape({
    value: Yup.number(),
    label: Yup.string(),
  }).nullable()
});
