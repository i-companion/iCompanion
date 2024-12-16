import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container, Row, Col } from 'react-bootstrap';

const Events = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  
  return (
    <main>
      <Container className="py-3 mt-4 mb-5 pb-5 justify-content-center height-stuff border-stuff" style={{ backgroundColor: "#f5f1d7"}}>
        <Row>
          <Col className="text-center">
            <h1>Upcoming Events at iLab</h1>
            <hr />
            <br />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <div className="card ms-5 mb-3" style={{ width: "20rem" }}>
            <div className="card-header mt-3">
              <h5 className="card-title">Finals Week at iLab</h5>
              <div className="card-subtitle">2024</div>
            </div>
            <div className="card-body">
              <div className="card-text">
                Come to iLab during finals week for a quick break and to recharge from exams.
                Or if you want to study, iLab has study/lounge places where you can prepare for those final exams!
              </div>
            </div>
          </div>

          <div className="card ms-5 pb-4 mb-3" style={{ width: "20rem" }}>
            <div className="card-header mt-3">
              <h5 className="card-title">UH Manoa Starts Offering eSports Internship</h5>
              <div className="card-subtitle">2021</div>
            </div>
            <div className="card-body">
              <div className="card-text">
              UH Manoa has started offering an internship for eSports.
              This will provide students with credits when they volunteer during Overwatch League Tournaments.
            </div>
            </div>
          </div>

          <div className="card ms-5 mb-3" style={{ width: "20rem" }}>
            <div className="card-header mt-3">
              <h5 className="card-title">iLab Opens!</h5>
              <div className="card-subtitle">October 3, 2022</div>
            </div>
            <div className="card-body">
              <div className="card-text">
              UH Manoa's iLab Gaming Facility opens and is free to all students attending UH Manoa.
              Inside, you can find different activities to choose from.
              There are many gaming computers with a variety of games to choose from, or you can sit on a cozy couch with your friends and study.
              </div>
            </div>
          </div>
        </Row>

      </Container>
    </main>
  );
};

export default Events;