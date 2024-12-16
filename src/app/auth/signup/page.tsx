'use client';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';

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
    overwatch?: boolean;
    genshinImpact?: boolean;
    superSmashBros?: boolean;
    apexLegends?: boolean;
  };
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
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    discord: Yup.string().required('Discord handle is required'),
    interests: Yup.object().shape({
      valorant: Yup.boolean(),
      leagueOfLegends: Yup.boolean(),
      callOfDuty: Yup.boolean(),
      overwatch: Yup.boolean(),
      genshinImpact: Yup.boolean(),
      superSmashBros: Yup.boolean(),
      apexLegends: Yup.boolean(),
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
    const gameIds = [];
    if (data.interests.valorant) gameIds.push('1');
    if (data.interests.leagueOfLegends) gameIds.push('2');
    if (data.interests.callOfDuty) gameIds.push('3');
    if (data.interests.overwatch) gameIds.push('4');
    if (data.interests.genshinImpact) gameIds.push('5');
    if (data.interests.superSmashBros) gameIds.push('6');
    if (data.interests.apexLegends) gameIds.push('7');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
        discord: data.discord,
        gameIds,
      }),
    });

    const result = await res.json();
    if (result.success) {
      await signIn('credentials', { callbackUrl: '/profile', ...data });
    } else {
      alert('Error creating user: ' + result.error);
    }
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Sign Up</h1>
            <Card className='card-scrollable'>
              <Card.Body className='card-custom'>
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
                    <Form.Label>Game Interests</Form.Label>
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
                    {/* New games */}
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.overwatch')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Overwatch</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.genshinImpact')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Genshin Impact</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.superSmashBros')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Super Smash Bros</label>
                    </div>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        {...register('interests.apexLegends')}
                        className="form-check-input"
                      />
                      <label className="form-check-label">Apex Legends</label>
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
                {/* Moved the footer content here */}
                <div className="mt-4 text-center custom-text">
                  Already have an account? 
                  <a href="/auth/signin"> Sign in</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
