import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ProfileCard from '@/components/ProfileCard';
import { Profile } from '@/lib/validationSchemas';

/** Render a list of profiles for the logged-in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const profiles: Profile[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      discord: 'john1234',
      email: 'johndoe@gmail.com',
      image: 'https://github.com/philipmjohnson.png',
      interests: [
        {
          valorant: true,
          leagueOfLegends: false,
          callOfDuty: true,
        },
      ],
      description: 'A gamer',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      discord: 'jane5678',
      email: 'janesmith@gmail.com',
      image: 'https://github.com/octocat.png',
      interests: [
        {
          valorant: false,
          leagueOfLegends: true,
          callOfDuty: false,
        },
      ],
      description: 'Casual player of games',
    },
  ];

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <Row className="g-4 ps-5 pe-5">
              {profiles.map((profile, index) => (
                <ProfileCard key={index} profile={profile} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
