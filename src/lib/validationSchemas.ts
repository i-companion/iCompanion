import * as Yup from 'yup';

export const AddGameSchema = Yup.object({
  name: Yup.string().required(),
});

export const EditGameSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
});