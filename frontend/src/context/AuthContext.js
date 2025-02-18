import { createContext, useEffect, useReducer } from 'react';

const initial_state = {
  user: (() => {
    try {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null; // Return null if JSON parsing fails
    }
  })(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state, // Spread the current state
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state, // Spread the current state
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state, // Spread the current state
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state, // Spread the current state
        user: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      // Clear user data from localStorage on logout
      localStorage.removeItem('user');
      return {
        ...state, // Spread the current state
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    if (state.user) {
      // Store user data in localStorage if it's present
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      // Clear localStorage if no user is found
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
