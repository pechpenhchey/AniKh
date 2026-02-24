import React, { useEffect } from "react";
import { Carousel, Container, Row, Col, Image } from "react-bootstrap";
import { useAnimeStore } from "../../app/api/anime/core/slice";
import "./styles/home.css";

const Banner = () => {
  const { topAnime, getTopAnime } = useAnimeStore();

  useEffect(() => {
    getTopAnime();
  }, []);

  if (!topAnime[0]) return <div className="banner d-flex justify-content-center align-items-center">Loading...</div>;

  const top10 = topAnime.slice(0, 10);

  return (
    <Carousel fade className="banner-carousel">
      {top10.map((anime) => (
        <Carousel.Item key={anime.mal_id} className="banner-item">
          <Container fluid className="h-100">
            <Row className="h-100 align-items-center">
              <h1 className="text-center text-light p-1 mb-3">Top 10 Animes</h1>
              {/* Left Image */}
              <Col lg={5} className="d-flex justify-content-center">
                <Image 
                  src={anime.images.jpg.large_image_url} 
                  alt={anime.title_english} 
                  rounded 
                  fluid 
                  style={{ maxHeight: "500px", border: "5px solid rgba(255,255,255,0.3)" }}
                />
              </Col>

              {/* Right Text */}
              <Col lg={6}>
                <h1 className="text-white display-4 fw-bold">{anime.title_english}</h1>
                <h3 className="text-white fw-normal">{anime.title}</h3>
                <p className="text-white lead mt-2">
                  {anime.synopsis?.substring(0, 200)}...
                </p>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button className="btn btn-warning btn-sm">{anime.rating}</button>
                  <button className="btn btn-warning btn-sm">Score: {anime.score}</button>
                  <button className="btn btn-warning btn-sm">Rank: {anime.rank}</button>
                  <button className="btn btn-warning btn-sm">Ep: {anime.episodes}</button>
                  <button className="btn btn-warning btn-sm">Status: {anime.status}</button>
                  <button className="btn btn-warning btn-sm">{anime.year}</button>
                </div>
                <p className="text-white mt-2">
                  Genres: {anime.genres.map((g) => g.name).join(", ")}
                </p>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;