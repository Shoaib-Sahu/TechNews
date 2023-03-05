import React, {
    useContext,
    useReducer,
    useEffect
} from "react";
import reducer from "../reducer/reducer";
import newsContext from "./newsContext";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading: true,
    query: "CSS",
    nbPages: 0,
    page: 0,
    hits: [],
};

// Provider Function
const NewsState = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Fetching Data from API
    const fecthData = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const data = await fetch(url);
            const parsedData = await data.json();
            dispatch({
                type: "FETCH_DATA",
                payload: {
                    hits: parsedData.hits,
                    nbPages: parsedData.nbPages,
                },
            });
        } catch (error) {
            console.log(error);
        };
    };

    // Remove Post Function
    const removePost = (post_ID) => {
        dispatch({ type: "REMOVE_POST", payload: post_ID });
    };

    // Search Function
    const searchPost = (searchQuery) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: searchQuery,
        });
    };

    // Pagination
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
    };
    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        });
    };

    // To call FetchData Function
    useEffect(() => {
        fecthData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);

    return (
        <newsContext.Provider
            value={{
                ...state,
                removePost,
                searchPost,
                getNextPage,
                getPrevPage
            }}>
            {children}
        </newsContext.Provider>
    );
};

// Creating Global State
const useGlobalContext = () => {
    return useContext(newsContext);
};

export { NewsState, newsContext, useGlobalContext };