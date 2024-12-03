'use client';

import { Profile } from '@/lib/validationSchemas';
import { Row, Col, Card, Image, ListGroup } from 'react-bootstrap';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ProfileCard = ({ profile }: { profile: Profile }) => {
  // Extract interests where the value is true
  const selectedInterests = profile.interests[0]
    ? Object.entries(profile.interests[0]) // Get key-value pairs from the first (and only) Interests object
        .filter(([key, value]) => value) // Filter only true values
        .map(([key]) => key.replace(/([a-z])([A-Z])/g, '$1 $2')) // Convert camelCase to readable words
    : [];

  return (
    <Card className="text-center">
      <Card.Header>
        <Card.Title>
          <h1 className="mt-3 mb-3">Profile</h1>
        </Card.Title>
        <Image src={profile.image} roundedCircle width="200" />
        <Card.Title className="pt-4">
          First name:&nbsp;{profile.firstName}
        </Card.Title>
        <Card.Title>
          Last name:&nbsp;{profile.lastName}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          Discord:&nbsp;{profile.discord}
        </Card.Title>
        <Card.Title>
          Email:&nbsp;{profile.email}
        </Card.Title>
        <Row>
          <Col>
            <Card.Text>
              Interests:
              <ListGroup>
                {selectedInterests.length > 0
                  ? selectedInterests.map((interest) => (
                      <ListGroup.Item key={interest}>{interest}</ListGroup.Item>
                    ))
                  : 'No interests selected'}
              </ListGroup>
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              About me:&nbsp;{profile.description}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
