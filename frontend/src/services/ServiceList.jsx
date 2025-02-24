import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/customization.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Weather Updates",
        desc: "Stay informed about real-time weather conditions and forecasts for your trekking destinations. Path2Peaks integrates with reliable APIs to provide updates on temperature, rainfall, wind speed, and more. Get safety alerts for extreme weather conditions like storms or heavy snowfall. Our localized weather insights help you make informed decisions, ensuring a safe and enjoyable trek."
    },
    {
        imgUrl: guideImg,
        title: "Trek Recommendation",
        desc: "Find your perfect trail with our Content-Based Trek recommendation system. Based on your fitness level, trek preferences, and current weather conditions, Path2Peaks suggests routes tailored to your needs. From easy hikes to challenging expeditions, our dynamic system ensures every trek suits your goals and provides updated alternatives if conditions change."
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptas fugiat, eaque nemo, labore quos officia dicta quis, sequi fuga nam voluptatibus laudantium! Obcaecati nemo maxime expedita molestias. Quisquam, assumenda."
    },
]

const ServiceList = () => {
    return (
        <>
            {servicesData.map((item, index) => (
                <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
                    <ServiceCard item={item} />
                </Col>
            ))}
        </>
    )
}

export default ServiceList;