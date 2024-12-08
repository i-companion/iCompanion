import * as Yup from 'yup';

export interface Profile {
  name: string;
  discord: string;
  email: string;
  image: string
  interests: boolean[];
  description: string;
}
