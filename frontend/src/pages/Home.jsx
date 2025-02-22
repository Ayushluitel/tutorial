import React from 'react';
import '../styles/home.css';

import { Container, Row, Col } from "reactstrap";
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import Subtitle from '../shared/Subtitle';
import worldImg from '../assets/images/world.png';

import experienceImg from '../assets/images/experience.png';

import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';
import { useTrekRecommendation } from '../context/TrekRecommendationContext';


const Home = () => {
    const { setRecommendations } = useTrekRecommendation();
    
    return (<>
        {/* =========================hero section start =================*/}
        <section>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className='hero__content'>
                            <div className="hero__subtitle d-flex align-items-cemter">
                                <Subtitle subtitle={'Know Before You Go'} />
                                <img src={worldImg} alt="" />
                            </div>
                            <h1>Traveling opens the door to creating <span className="highlight">memories</span></h1>
                            <p>
                            A paradise for trekkers searching for landscape diversity and clam, Nepal is one of the most popular destinations for traveller that offer breath-taking and enthralling trekking routes. The panoramic Himalayan ranges of Nepal swear incredible and exciting trips. The rugged beauty of these lofty mountains encourages travellers, trekkers, mountaineers or tourists from all over the world and gives an unforgettable experience by taking them to some unexplored trails of mountain environment.
                            </p>
                        </div>
                    </Col>
                    <Col lg='2'>
                        <div className='hero__img-box'>
                            <img src={heroImg} alt="" />
                        </div>

                    </Col>
                    <Col lg='2'>
                        <div className='hero__img-box hero__video-box mt-4' >
                            <video src={heroVideo} alt="" controls />
                        </div>

                    </Col>
                    <Col lg='2'>
                        <div className='hero__img-box mt-5'>
                            <img src={heroImg02} alt="" />
                        </div>

                    </Col>
                    
                    <SearchBar setRecommendations={setRecommendations} />
                </Row>
            </Container>
        </section>
        {/* =========================hero section end =================*/}

        <section>
            <Container>
                <Row>
                    <Col lg='3'>
                        <h5 className="services__subtitle">What We Serve</h5>
                        <h2 className="services__title">We Offer Our Best Services</h2>
                    </Col>
                    <ServiceList />
                </Row>
            </Container>
        </section>

        {/* ============================================= featured tour section start =================================*/}
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-5'>
                        <Subtitle subtitle={"Explore"} />
                        <h2 className="featured__tour-tile">Our Featured Tours</h2>
                    </Col>
                    <FeaturedTourList />
                </Row>
            </Container>
        </section>
        {/* ============================================= featured tour section end =================================*/}
        {/* ============================================= experience section start =================================*/}
        <section>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className="experience__content">
                            <Subtitle subtitle={'Experience'} />

                            <h2>With Our All Experience <br />We Will Serve You!</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                <br />
                                Ducimus quidem in vitae omnis corporis ratione molestias reiciendis saepe similique reprehenderit, nemo alias aspernatur corrupti dolorum sit sint quas ipsam sequi.
                            </p>
                        </div>

                        <div className="counter__wrapper d-flex align-items-center gap-5">
                            <div className="counter__box">
                                <span>12k+</span>
                                <h6>Successful Trips</h6>
                            </div>
                            <div className="counter__box">
                                <span>2k+</span>
                                <h6>Regular Clients</h6>
                            </div>
                            <div className="counter__box">
                                <span>15</span>
                                <h6>Years Experience</h6>
                            </div>
                        </div>
                    </Col>
                    <Col lg="6">
                        <div className="experience__img">
                            <img src={experienceImg} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        {/* ============================================= experience section end =================================*/}
        {/* ============================================= gallery section start =================================*/}
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <Subtitle subtitle={'Gallery'} />
                        <h2 className="gallery_title">Visit Our Customers Tour Gallery</h2>
                    </Col>
                    <Col lg='12'>
                        <MasonryImagesGallery />
                    </Col>

                </Row>
            </Container>
        </section>
        {/* ============================================= gallery section end ===================================*/}

        {/* ============================================= testimonial section start ===================================*/}
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <Subtitle subtitle={'Fans Love'} />
                        <h2 className="testimonials__title">What Our Fans Say About Us</h2>
                    </Col>
                    <Col lg='12'>
                        <Testimonials />
                    </Col>
                </Row>
            </Container>
        </section>
        {/* ============================================= testimonial section end ===================================*/}
        <Newsletter />
    </>
    )
}

export default Home;