import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import profileImg from "../../../assets/Penhchey.jpg";
import "../styles/About.css";

const ContactItem = ({ href, icon, label }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel='noreferrer'
    className='about-contact-item d-flex align-items-center gap-2 text-decoration-none p-3 rounded-3'
  >
    <span className='d-flex align-items-center flex-shrink-0'>{icon}</span>
    <span className='small'>{label}</span>
  </a>
);

const AboutCard = ({ icon, title, children }) => (
  <div className='about-card rounded-3 p-4 h-100'>
    <div className='fs-2 mb-3'>{icon}</div>
    <h2 className='card-text-bg mb-3'>{title}</h2>
    {children}
  </div>
);

const About = () => (
  <div className='py-5'>
    <Container>

      {/* Hero */}
      <div className='about-hero rounded-3 overflow-hidden mb-4'>
        <div className='about-accent-bar' />
        <div className='p-4 p-md-5'>
          <h1 className='about-site-name mb-1'>AniKH</h1>
          <p className='about-text mb-0'>Your go-to destination for anime discovery.</p>
        </div>
      </div>

      <Row className='g-4'>

        {/* What is AniKH */}
        <Col xs={12} md={6}>
          <AboutCard title='What is AniKH?'>
            <p className='about-text small mb-2'>
              AniKH is a modern anime discovery platform built for fans who want a clean,
              fast, and detailed way to explore the world of anime. Browse thousands of titles,
              dive into character details, watch trailers, and track your favourites — all in one place.
            </p>
            <p className='about-text small mb-0'>
              Powered by the Jikan API (MyAnimeList data), AniKH brings you up-to-date
              information on scores, episodes, voice actors, studios, and more.
            </p>
          </AboutCard>
        </Col>

        {/* Mission */}
        <Col xs={12} md={6}>
          <AboutCard title='Our Mission'>
            <p className='about-text small mb-2'>
                We believe anime and manga deserve a better way to explore and understand them. AniKH was built with one goal — to provide a clean, fast, and reliable platform for discovering detailed information about your favourite series.
            </p>
            <p className='about-text small mb-0'>
                Whether you are a casual viewer, an avid reader, or a dedicated fan, AniKH helps you explore anime, manga, and more. From story summaries and scores to characters, studios, and creators, everything you need is in one place — with future expansions into light novels and beyond.
            </p>
          </AboutCard>
        </Col>

        {/* Built By */}
        <Col xs={12} md={6}>
          <AboutCard title='Built By'>
            <div className='d-flex align-items-center gap-3 mb-3'>
                <div className="about-builder-avatar flex-shrink-0 rounded-circle overflow-hidden">
                <img
                    src={profileImg}
                    alt="Penhchey - Frontend Developer"
                    className="w-100 h-100 object-fit-cover"
                />
                </div>          
                <div>
                    <div className='fw-bold text-white'>Penhchey</div>
                    <div className='about-builder-role'>Designer &amp; Developer</div>
              </div>
            </div>
            <p className='about-text small mb-0'>
              AniKH is a solo passion project designed, built, and maintained by Penhchey.
              Every component was crafted with care to deliver a smooth and enjoyable experience.
            </p>
          </AboutCard>
        </Col>

        {/* Contact */}
        <Col xs={12} md={6}>
          <AboutCard title='Contact'>
            <p className='about-text small mb-3'>
              Have feedback, a bug report, or just want to say hi? Reach out below.
            </p>
            <div className='d-flex flex-column gap-2'>
              <ContactItem href='tel:+85511548073' label='(+855) 11 548 073' />
              <ContactItem href='mailto:pongpechpenhcheysao@gmail.com' icon='✉️' label='pongpechpenhcheysao@gmail.com' />
              <ContactItem
                href='https://github.com/pechpenhchey'
                label='github.com/pechpenhchey'
                icon={
                  <svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor'>
                    <path d='M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
                  </svg>
                }
              />
            </div>
          </AboutCard>
        </Col>

      </Row>

      {/* Footer note */}
      <div className='text-center text-muted small border-top mt-5 pt-4'>
        AniKH uses data from{' '}
        <a href='https://jikan.moe' target='_blank' rel='noreferrer' className='about-link fw-semibold'>
          Jikan API
        </a>
        {' '}— an unofficial MyAnimeList API. All anime data belongs to their respective owners.
      </div>

    </Container>
  </div>
);

export default About;