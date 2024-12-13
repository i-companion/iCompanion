'use client';

import { Profile } from '@prisma/client';
import { Row, Col, Card, Image, ListGroup } from 'react-bootstrap';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ProfileCard = ({ profile }: { profile: Profile }) => (
  <Card className="text-center">
    <Card.Header>
      <Card.Title><h1 className="mt-3 mb-3">Profile</h1></Card.Title>
      <Image src="/uhm-logo.png" alt='Profile Logo' roundedCircle width="200" />
      <Card.Title className="pt-4">
        First name:
        &nbsp;
        {profile.name}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Title>
        Discord:
        &nbsp;
        {profile.discord}
      </Card.Title>
      <Card.Title>
        Email:
        &nbsp;
        {profile.email}
      </Card.Title>
      <Row>
        {/* DISPLAY PROFILE INTERESTS
        <Col>
          <Card.Text>
            Interests:
            <ListGroup>
              {profile.interests.map((element: any) => <ListGroup.Item>{element}</ListGroup.Item>)}
            </ListGroup>
          </Card.Text>
        </Col>
        */}
        <Col>
          <Card.Text>
            About me:
            &nbsp;
            {profile.description}
          </Card.Text>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default ProfileCard;
