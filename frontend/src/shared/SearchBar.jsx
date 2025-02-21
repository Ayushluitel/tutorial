import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Spinner } from "reactstrap";
import { BASE_URL } from "./../utils/config.js";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const altitudeRef = useRef("");
  const maxGroupSizeRef = useRef("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchHandler = async () => {
    setLoading(true);
    setError("");

    const location = locationRef.current.value.trim();
    const altitude = altitudeRef.current.value.trim();
    const maxGroupSize = maxGroupSizeRef.current.value.trim();

    // Construct query parameters dynamically
    const params = new URLSearchParams();
    if (location) params.append("address", location);
    if (altitude) params.append("altitude", altitude);
    if (maxGroupSize) params.append("maxGroupSize", maxGroupSize);

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?${params.toString()}`
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await res.json();

      navigate(`/tours/search?${params.toString()}`, {
        state: result.data,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Altitude</h6>
              <input
                type="number"
                placeholder="Minimum Altitude"
                ref={altitudeRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input
                type="number"
                placeholder="Maximum Group Size"
                ref={maxGroupSizeRef}
              />
            </div>
          </FormGroup>

          <span className="search__icon" onClick={searchHandler}>
            {loading ? (
              <Spinner size="sm" color="light" />
            ) : (
              <i className="ri-search-line"></i>
            )}
          </span>
        </Form>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </Col>
  );
};

export default SearchBar;
