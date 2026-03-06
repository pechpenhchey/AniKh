import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HomeBanner from "../Banner";
import MediaSection from "../../../shared/components/layout/CardSection";
import useHomeData from "../components/home/useHomeData";
import { TOTAL_CARDS, TOTAL_CARDS_Season, animeCardProps, mangaCardProps, seasonalCardProps, useHomeNavigation } from "../components/home/homeConfig";
import "../styles/Home.css";

const FeatureBanner = ({ icon, title, description, onClick }) => (
  <div className="feature-banner" onClick={onClick}>
    <div>
      <h6 className="feature-banner-title">{icon} {title}</h6>
      <span className="feature-banner-desc">{description}</span>
    </div>
    <span className="feature-banner-arrow">→</span>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const { topAnime, topManga, seasonalAnime, seasonalLoading } = useHomeData();
  const { goToAnime, goToManga, goToSeasonal } = useHomeNavigation();

  return (
    <div>
      <HomeBanner />

      <div className="py-3">

        {/* Feature Banners */}
        <Container className="my-4">
          <Row className="g-3">
            <Col xs={12} md={4}>
              <FeatureBanner
                icon="📅"
                title="Airing Schedule"
                description="See what's airing today and this week"
                onClick={() => navigate("/schedule")}
              />
            </Col>
            <Col xs={12} md={4}>
              <FeatureBanner
                icon="🌸"
                title="Seasonal Anime"
                description="Browse anime by season and year"
                onClick={goToSeasonal}
              />
            </Col>
            <Col xs={12} md={4}>
              <FeatureBanner
                icon="🔍"
                title="Coming Soon"
                description="More features on the way"
                onClick={() => {}}
              />
            </Col>
          </Row>
        </Container>

        <MediaSection
          title="Anime This Season"
          items={seasonalAnime}
          loading={seasonalLoading}
          limit={TOTAL_CARDS_Season}
          onSeeMore={goToSeasonal}
          cardProps={seasonalCardProps}
        />

        <MediaSection
          title="Top Anime"
          items={topAnime}
          loading={!topAnime || topAnime.length === 0}
          limit={TOTAL_CARDS}
          onSeeMore={goToAnime}
          cardProps={animeCardProps}
        />

        <MediaSection
          title="Top Manga"
          items={topManga}
          loading={!topManga || topManga.length === 0}
          limit={TOTAL_CARDS}
          onSeeMore={goToManga}
          cardProps={mangaCardProps}
        />

      </div>
    </div>
  );
};

export default Home;