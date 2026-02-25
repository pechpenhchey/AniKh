import React, { useEffect } from "react";
import { Carousel, Container, Row, Col, Image } from "react-bootstrap";
import { useMangaStore } from "../../app/api/manga/slice";
import Loader from "../../shared/components/layout/Loading";
import "../home/styles/home.css";

const Banner = () => {
  const { topManga, getTopManga } = useMangaStore();

  useEffect(() => {
    getTopManga();
  }, []);

  if (!topManga || topManga.length === 0)
    return (
      <div
        className="banner d-flex justify-content-center align-items-center"
        style={{ height: "500px" }}
      >
        <Loader text="Loading Top Manga..." fullHeight={false} />
      </div>
    );

  const top10 = topManga.slice(0, 10);

  return (
    <Carousel fade className="banner-carousel">
      {top10.map((manga) => (
        <Carousel.Item key={manga.mal_id} className="banner-item">
          <Container fluid className="h-100">
            <Row className="h-100 align-items-center">
              <h1 className="text-center text-light p-1 mb-3">Top 10 Mangas</h1>
              <Col lg={5} className="d-flex justify-content-center position-relative">
                {!manga.images?.jpg?.large_image_url ? (
                  <div
                    className="w-100 d-flex justify-content-center align-items-center"
                    style={{ height: "500px" }}
                  >
                    <Loader text="" fullHeight={false} />
                  </div>
                ) : (
                  <Image
                    src={manga.images.jpg.large_image_url}
                    alt={manga.title_english}
                    rounded
                    fluid
                    style={{
                      maxHeight: "500px",
                      border: "5px solid rgba(255,255,255,0.3)",
                    }}
                  />
                )}
              </Col>

              <Col lg={6} className="mt-3">
                <h1 className="text-white display-4 fw-bold">{manga.title_english}</h1>
                <h3 className="text-white fw-normal">{manga.title}</h3>
                <p className="text-white lead mt-2">{manga.synopsis?.substring(0, 200)}...</p>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <button className="btn btn-warning btn-sm">{manga.rating}</button>
                  <button className="btn btn-warning btn-sm">Score: {manga.score}</button>
                  <button className="btn btn-warning btn-sm">Rank: {manga.rank}</button>
                  <button className="btn btn-warning btn-sm">Ep: {manga.episodes}</button>
                  <button className="btn btn-warning btn-sm">Status: {manga.status}</button>
                  <button className="btn btn-warning btn-sm">{manga.year}</button>
                </div>
                <p className="text-white mt-2">Genres: {manga.genres.map((g) => g.name).join(", ")}</p>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;