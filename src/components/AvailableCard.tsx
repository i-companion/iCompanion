'use client';

import { Card, Image, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

/* Renders a single contact. See list/page.tsx. */
const AvailableCard = () => (
  <Card className="text-center">
    <Card.Header>
        <Card.Title><h1 className="mt-3 mb-3">Available Games</h1></Card.Title>
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
                    <Image src="https://upload.wikimedia.org/wikipedia/en/9/94/Street_Fighter_6_box_art.jpg" width="200px" />
                    <Card.Text className="mt-2"><h3>Street Fighter 6</h3></Card.Text>
                </Container>
            </Col>
            <Col>
                <Container>
                    <Image src="https://i.ebayimg.com/images/g/pf8AAOSwSkJi~QLQ/s-l1200.jpg" width="200px" />
                    <Card.Text className="mt-2"><h3>Apex Legends</h3></Card.Text>
                </Container>
            </Col>
            <Col>
                <Container>
                    <Image src="https://i.redd.it/i-turned-the-tekken-8-key-art-into-a-poster-wallpaper-v0-hr1f5ubhyz4a1.jpg?width=3107&format=pjpg&auto=webp&s=5a817aa176050b41d6ce0908b37268b9c1554c8a" width="200px" />
                    <Card.Text className="mt-2"><h3>Tekken 8</h3></Card.Text>
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
            <Col>
                <Container>
                    <Image src="https://e.snmc.io/lk/l/x/1ae386a0ac57e6d898df913d865e6fd4/7295142" width="200px" />
                    <Card.Text className="mt-2"><h3>Super Smash Bros. Ultimate</h3></Card.Text>
                </Container>
            </Col>
            <Col>
                <Container>
                    <Image src="https://upload-os-bbs.hoyolab.com/upload/2020/10/13/1078834/3191de5bb6328eb64fea21355c009837_6058951914751133206.jpg" width="200px" />
                    <Card.Text className="mt-2"><h3>Genshin Impact</h3></Card.Text>
                </Container>
            </Col>
        </Row>
    </Card.Body>
  </Card>
);

export default AvailableCard;
