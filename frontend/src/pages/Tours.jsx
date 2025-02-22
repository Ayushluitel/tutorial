import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import Newsletter from "./../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";

import useFetch from "../hooks/useFetch.js";
import { BASE_URL } from "../utils/config.js";

import { useTrekRecommendation } from "../context/TrekRecommendationContext";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  // Use recommendations from the context
  const { recommendations, setRecommendations } = useTrekRecommendation();

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);

  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <SearchBar setRecommendations={setRecommendations} />
          </Row>
        </Container>
      </section>

      {/* Display AI Recommendations */}
      {recommendations.length > 0 && (
        <section className="pt-0">
          <Container>
            <h2>Recommended Treks</h2>
            <Row>
              {recommendations.map((trek) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={trek._id}>
                  <TourCard tour={trek} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Display All Treks */}
      <section className="pt-0">
        <Container>
          <h2>All Treks</h2>
          {loading && <h4 className="text-center pt-5">Loading.......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;
