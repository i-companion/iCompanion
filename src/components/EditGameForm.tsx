'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Game } from '@prisma/client';
import { EditGameSchema } from '@/lib/validationSchemas';
import { editGame } from '@/lib/dbActions';

const onSubmit = async (data: Game) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editGame(data);
  swal('Success', 'Your game has been updated', 'success', {
    timer: 2000,
  });
};

const EditGameForm = ({ game }: { game: Game }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Game>({
    resolver: yupResolver(EditGameSchema),
  });
  // console.log(stuff);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Game</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={game.id} />
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    defaultValue={game.name}
                    required
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="success">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditGameForm;
