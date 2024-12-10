import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  discord: Yup.string().required('Discord handle is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  image: Yup.string().url('Image must be a valid URL').required('Image is required'),
  description: Yup.string().required('Description is required'),
  interests: Yup.array()
    .of(Yup.boolean())
    .min(1, 'You must select at least one interest')
    .required('Interests are required'),
});
