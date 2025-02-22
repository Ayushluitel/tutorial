import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/about.css"; // Create this CSS file for About page styles
import Subtitle from "../shared/Subtitle";
import riwajImg from "../assets/images/riwaj.jpg";
import ayushImg from "../assets/images/ayush.jpg";
import manishImg from "../assets/images/manish.jpg";

const teamMembers = [
  {
    name: "Riwaj Bastakoti",
    role: "Backend Developer",
    img: riwajImg,
    description:
      "Riwaj is responsible for building and maintaining the backend of Path2Peaks, ensuring seamless API integrations and robust database management.",
  },
  {
    name: "Ayush Luitel",
    role: "Frontend Developer",
    img: ayushImg,
    description:
      "Ayush specializes in crafting a visually stunning and user-friendly frontend, making Path2Peaks an interactive experience for trekkers.",
  },
  {
    name: "Manish Subedi",
    role: "UI/UX & Documentation",
    img: manishImg,
    description:
      "Manish conceptualized the UI/UX design and handled project documentation, ensuring clarity in functionality and user navigation.",
  },
];

const About = () => {
  return (
    <section>
      <Container>
        <Row className="text-center">
          <Col lg="12">
            <Subtitle subtitle="Meet Our Team" />
            <h2 className="about__title">The Minds Behind Path2Peaks</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {teamMembers.map((member, index) => (
            <Col lg="4" md="6" sm="12" key={index} className="team__member">
              <div className="team__card">
                <img src={member.img} alt={member.name} className="team__img" />
                <h3>{member.name}</h3>
                <h5>{member.role}</h5>
                <p>{member.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default About;
