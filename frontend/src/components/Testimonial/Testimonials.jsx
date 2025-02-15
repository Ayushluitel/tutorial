import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";
import "../../styles/testimonials.css";

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const testimonialsData = [
        {
            text: "What I love most about Path2Peaks is how it brings together technology and nature. It’s not just a tool; it’s a community for adventure lovers who want to explore responsibly and confidently.",
            name: "Ram",
            role: "Customer",
            avatar: ava01,
        },
        {
            text: "As a beginner, I wasn’t sure which trail to choose, but Path2Peaks helped me find the perfect trek. The detailed insights and recommendations gave me the confidence to explore the outdoors like never before!",
            name: "Riyaa",
            role: "Customer",
            avatar: ava02,
        },
        {
            text: "Path2Peaks made planning my trek so easy! From the weather updates to personalized trail suggestions, everything felt tailored to my needs. It’s like having a personal guide right at your fingertips!",
            name: "Rohan",
            role: "Customer",
            avatar: ava03,
        },
    ];

    return (
        <Slider {...settings}>
            {testimonialsData.map((testimonial, index) => (
                <div key={index} className="testimonial__card py-4 px-3">
                    <p className="testimonial__text">{testimonial.text}</p>
                    <div className="d-flex align-items-center gap-4 mt-3">
                        <img
                            src={testimonial.avatar}
                            className="testimonial__avatar w-25 h-25 rounded-2"
                            alt={`${testimonial.name}`}
                        />
                        <div>
                            <h6 className="testimonial__name mb-0 mt-3">{testimonial.name}</h6>
                            <p className="testimonial__role">{testimonial.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Testimonials;
