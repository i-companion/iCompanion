import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});
/**
export const EditProfileSchema = Yup.object({
  firstName: Yup.string().required(), 
  lastName: Yup.string().required(),
  discord: Yup.string().required(),
  email: Yup.string().required(),
  image: Yup.string().required(),
  interests: Yup.string().oneOf(['valorant', 'league-of-legends', 'call-of-duty']).required(),
  description: Yup.string().required(),
});
*/

export interface Profile {
  firstName: string;
  lastName: string;
  discord: string;
  email: string;
  image: string;
  interests: string[];
  description: string;
}