'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser, createProfile } from '@/lib/dbActions';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  discord: string;
  image: string;
  description: string;
  interests: boolean[];
};

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
    name: Yup.string().required('Name is required'),
    discord: Yup.string().required('Discord handle is required'),
    image: Yup.string().required('Image is required'),
    description: Yup.string().required('Description is required'),
    interests: Yup.array().min(1).of(Yup.bool().required()).required('At least one interest is required'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    await createUser(data);
    await createProfile(data);
    await signIn('credentials', { callbackUrl: '/profile', ...data });
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign Up</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="email"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Name</Form.Label>
                    <input
                      type="text"
                      {...register('name')}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Discord</Form.Label>
                    <input
                      type="text"
                      {...register('discord')}
                      className={`form-control ${errors.discord ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.discord?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Image</Form.Label>
                    <input
                      type="text"
                      {...register('image')}
                      className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.image?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Description</Form.Label>
                    <input
                      type="text"
                      {...register('description')}
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Interests</Form.Label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.0')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Valorant</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.1')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">League of Legends</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.2')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Call of Duty</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.3')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Overwatch</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.4')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Genshin Impact</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.5')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Super Smash Bros</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.6')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Apex Legends</label>
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Register
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer>
                Already have an account?
                <a href="/auth/signin">Sign in</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
