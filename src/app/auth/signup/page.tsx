'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  discord: string;
  interests: {
    valorant?: boolean;
    leagueOfLegends?: boolean;
    callOfDuty?: boolean;
  };
};

/** The sign up page. */
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
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    discord: Yup.string().required('Discord handle is required'),
    interests: Yup.object().shape({
      valorant: Yup.boolean(),
      leagueOfLegends: Yup.boolean(),
      callOfDuty: Yup.boolean(),
    }),
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
                  {/* Email */}
                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="text"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </Form.Group>

                  {/* First Name */}
                  <Form.Group className="form-group">
                    <Form.Label>First Name</Form.Label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                  </Form.Group>

                  {/* Last Name */}
                  <Form.Group className="form-group">
                    <Form.Label>Last Name</Form.Label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                  </Form.Group>

                  {/* Discord */}
                  <Form.Group className="form-group">
                    <Form.Label>Discord</Form.Label>
                    <input
                      type="text"
                      {...register('discord')}
                      className={`form-control ${errors.discord ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.discord?.message}</div>
                  </Form.Group>

                  {/* Interests */}
                  <Form.Group className="form-group">
                    <Form.Label>Interests</Form.Label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.valorant')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Valorant</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.leagueOfLegends')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">League of Legends</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.callOfDuty')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Call of Duty</label>
                    </div>
                  </Form.Group>

                  {/* Buttons */}
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