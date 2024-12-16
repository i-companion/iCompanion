'use client';

import { Card, Image, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

/* Renders a single contact. See list/page.tsx. */
const PopularCard = () => (
  <Card className="text-center">
    <Card.Header>
        <Card.Title><h1 className="mt-3 mb-3">Popular Games</h1></Card.Title>
    </Card.Header>
    <Card.Body>
        <Row className="mt-3 mb-3">
            <Col>
                <Container>
                    <Image src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S2_1200x1600-7bf61b8b77e394c4bc709f6b02c0db24" width="200px" />
                    <Card.Text className="mt-2"><h3>Valorant</h3></Card.Text>
                </Container>
            </Col>
            <Col>
                <Container>
                    <Image src="https://howlongtobeat.com/games/5203_League_of_Legends.jpg" width="200px" />
                    <Card.Text className="mt-2"><h3>League of Legends</h3></Card.Text>
                </Container>
            </Col>
            <Col>
                <Container>
                    <Image src="https://m.media-amazon.com/images/M/MV5BYzM1YjdkZDItNjBjZS00NTBjLThiYmItYjM3MzZjOTNhYTdiXkEyXkFqcGc@._V1_.jpg" width="200px" />
                    <Card.Text className="mt-2"><h3>Teamfight Tactics</h3></Card.Text>
                </Container>
            </Col>
        </Row>
        <Row className="mt-3">
            <Col>
                <Container>
                    <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFMgFd0cHYnEIDqjFPtICZPv5uN8q4J-86A&s" width="200px" />
                    <Card.Text className="mt-2"><h3>Overwatch 2</h3></Card.Text>
                </Container>
            </Col>
        </Row>
    </Card.Body>
  </Card>
);

export default PopularCard;
