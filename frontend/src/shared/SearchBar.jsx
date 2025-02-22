import React, { useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "./../utils/config.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = ({ setRecommendations }) => {

  const [budget, setBudget] = useState(500);
  const [time, setTime] = useState(5);
  const [difficulty, setDifficulty] = useState("moderate");
  const [isLoading, setIsLoading] = useState(false);
 const navigate = useNavigate();

  const handleRecommend = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/recommendations`, {
        budget,
        time,
        difficulty,
      });
  
      console.log("Recommendations Data:", response.data); // Debugging
  
      if (typeof setRecommendations === "function") {
        setRecommendations(response.data);
      } else {
        console.error("setRecommendations is not a function");
      }
  
      setIsLoading(false);
      navigate("/tours");
      
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setIsLoading(false);
    }
  };
  

  return (
    <Col lg="12">
      <div className="recommend_bar">
      <Form className="d-flex align-items-center gap-4">
        <FormGroup className="d-flex gap-3 form__group form__group-fast recommend_form">
          <span>
            <i className="ri-wallet-line"></i>
          </span>
          <div>
            <h6>Budget</h6>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value))}
              placeholder="Enter your budget"
            />
          </div>
        </FormGroup>
        <FormGroup className="d-flex gap-3 form__group form__group-fast recommend_form">
          <span>
            <i className="ri-time-line"></i>
          </span>
          <div>
            <h6>Time</h6>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(parseFloat(e.target.value))}
              placeholder="Enter duration (days)"
            />
          </div>
        </FormGroup>
        <FormGroup className="d-flex gap-3 form__group form__group-last recommend_form">
          <span>
          <i class="ri-dashboard-2-line"></i>
          </span>
          <div>
            <h6>Difficulty</h6>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
              <option value="demanding">Demanding</option>
            </select>
          </div>
        </FormGroup>

        <button
          type="button"
          className="recommend__button"
          onClick={handleRecommend}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get Recommendations"}
        </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;