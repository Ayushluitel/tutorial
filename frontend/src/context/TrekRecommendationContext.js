import React, { createContext, useState, useContext } from 'react';

// Create Context
const TrekRecommendationContext = createContext();

// Custom Hook to use the Context
export const useTrekRecommendation = () => useContext(TrekRecommendationContext);

// Context Provider Component
export const TrekRecommendationProvider = ({ children }) => {
    const [recommendations, setRecommendations] = useState([]);

    return (
        <TrekRecommendationContext.Provider value={{ recommendations, setRecommendations }}>
            {children}
        </TrekRecommendationContext.Provider>
    );
};
