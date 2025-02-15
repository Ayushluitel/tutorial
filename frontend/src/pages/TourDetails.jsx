import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import useFetch from './../hooks/useFetch.js';
import { BASE_URL } from './../utils/config.js';
import { AuthContext } from './../context/AuthContext.js';

const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef(null);
    const [tourRating, setTourRating] = useState(null);
    const { user } = useContext(AuthContext);

    // Fetch data from database
    const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

    // Destructure properties from the tour object
    const {
        photo = "",
        title = "",
        desc = "",
        price = 0,
        reviews = [],
        address = "",
        city = "",
        altitude = 0,
        maxGroupSize = 0,
    } = tour || {};

    const { totalRating, avgRating } = calculateAvgRating(reviews || []);

    // Format date options
    const options = { day: "numeric", month: "long", year: "numeric" };

    // Handle review submission
    const submitHandler = async (e) => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current?.value;

        if (!reviewText) {
            alert("Please enter your review");
            return;
        }

        try {
            if (!user) {
                alert('Please sign in');
                return;
            }

            const reviewObj = {
                username: user?.username,
                reviewText,
                rating: tourRating,
            };

            const res = await fetch(`${BASE_URL}/review/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(reviewObj),
            });

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            }

            alert(result.message);
        } catch (err) {
            alert(err.message);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section>
                <Container>
                    {loading && <h4 className='text-center pt-5'>Loading.......</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}
                    {!loading && !error && (
                        <Row>
                            <Col lg="8">
                                <div className="tour__content">
                                    <img src={photo} alt={title} className="w-100" />
                                    <div className="tour__info">
                                        <h2>{title}</h2>
                                        <div className="d-flex align-items-center gap-5">
                                            <span className="tour__rating d-flex align-items-center gap-1">
                                                <i
                                                    className="ri-star-fill"
                                                    style={{ color: "var(--secondary-color)" }}
                                                ></i>
                                                {avgRating === 0 ? null : avgRating}
                                                {totalRating === 0 ? (
                                                    "Not rated"
                                                ) : (
                                                    <span>({reviews?.length})</span>
                                                )}
                                            </span>

                                            <span>
                                                <i className="ri-map-pin-fill"></i> {address}
                                            </span>
                                        </div>
                                        <div className="tour__extra-details">
                                            <span>
                                                <i className="ri-map-pin-2-line"></i> {city}
                                            </span>
                                            <span>
                                                <i className="ri-money-dollar-circle-line"></i> ${price}{""}/ per person
                                            </span>
                                            <span>
                                                <i className="ri-map-pin-time-line"></i> {altitude} m
                                            </span>
                                            <span>
                                                <i className="ri-group-line"></i> {maxGroupSize} people
                                            </span>
                                        </div>
                                        <h5>Description</h5>
                                        <p>{desc}</p>
                                    </div>
                                    {/* Tour Reviews Section */}
                                    <div className="tour_reviews mt-4">
                                        <h4>Reviews ({reviews?.length} reviews)</h4>

                                        <Form onSubmit={submitHandler}>
                                            <div className="d-flex align-items-center gap-3 mb-4 rating_group">
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <span
                                                        key={rating}
                                                        role="button"
                                                        aria-label={`Rate ${rating} star`}
                                                        onClick={() => setTourRating(rating)}
                                                        className={tourRating === rating ? "selected-rating" : ""}
                                                    >
                                                        {rating} <i className="ri-star-s-fill"></i>
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="review__input">
                                                <input
                                                    type="text"
                                                    ref={reviewMsgRef}
                                                    placeholder="Share your thoughts about this tour..."
                                                    required
                                                />
                                                <button className="btn primary__btn text-white" type="submit">
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>

                                        <ListGroup className="user__reviews">
                                            {reviews?.map((review, index) => (
                                                <div className="review__item" key={index}>
                                                    <img src={avatar} alt="" />

                                                    <div className="w-100">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h5>{review.username}</h5>
                                                                <p>
                                                                    {new Date(review.createdAt).toLocaleDateString(
                                                                        "en-US",
                                                                        options
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <span className="d-flex align-items-center">
                                                                {review.rating}
                                                                <i className="ri-star-s-fill"></i>
                                                            </span>
                                                        </div>
                                                        <h6>{review.reviewText}</h6>
                                                    </div>
                                                </div>
                                            ))}
                                        </ListGroup>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="4">
                                <Booking tour={tour} avgRating={avgRating} />
                            </Col>
                        </Row>
                    )}
                </Container>
            </section>
            <Newsletter />
        </>
    );
};

export default TourDetails;
