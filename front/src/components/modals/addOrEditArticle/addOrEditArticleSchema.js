import * as Yup from "yup";

export const schema = Yup.object().shape({
  text: Yup.string().required("Text is required"),
  visibility: Yup.object().shape({
    value: Yup.number(),
    label: Yup.string(),
  }).nullable(),
});
