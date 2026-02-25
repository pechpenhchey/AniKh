import { Container, Row, Col, Dropdown } from "react-bootstrap";
import "./styles/home.css";

const Banner = () => {
  return (
    <div className="banner-carousel d-flex align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col md={5}>
            <div className="text-white">
              <h1 className="fw-bold display-4">
                Discover Amazing Anime, Manga, Novel
              </h1>
              <p className="mt-3 fs-5">
                Explore top trending anime, manga, and novels all in one place.
              </p>
            </div>
            
            <Dropdown className="mt-3">
              <Dropdown.Toggle variant="light" size="lg" className="fw-semibold">
                Browse Now
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/anime">Anime</Dropdown.Item>
                <Dropdown.Item href="/manga">Manga</Dropdown.Item>
                <Dropdown.Item href="/novel">Novel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col md={7} className="text-center mt-3">
            <img
              src="https://wallpapers.com/images/featured/anime-all-characters-hd-4r9pb6ju4v1b0m48.jpg"
              alt="Banner"
              className="img-fluid banner-img"
              style={{ borderRadius: "20px" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;