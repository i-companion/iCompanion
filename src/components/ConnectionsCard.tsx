'use client';

import { Card, Image, ListGroup } from 'react-bootstrap';
import Link from 'next/link';

type Person = {
    name: string;
    email: string;
    discord: string;
}

const person: Person[] = [
    {
        name: 'Person1', email: 'Person1@foo.com', discord: 'Person#1234'
    },
    {
        name: 'Person4', email: 'Person4@foo.com', discord: 'Person#4321'
    }
  ];

/* Renders a single contact. See list/page.tsx. */
const ConnectionsCard = ({ person }: { person : Person }) => (
  <Card className="h-100 me-3 ms-3">
    <Card.Header>
      <Image src={person.name} width={75} />
      <Card.Title>
        Name:&nbsp;
        {person.name}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>{person.email}</Card.Text>
      <Card.Text>{person.discord}</Card.Text>
    </Card.Body>
  </Card>
);

export default ConnectionsCard;
