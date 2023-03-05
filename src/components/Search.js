import React from "react";
import { useGlobalContext } from "../context/newsState"

const Search = () => {
    const { query, searchPost } = useGlobalContext();
    return (
        <>
            <h1>TechNews - All tech related news are here!</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <input
                        type="text"
                        placeholder="search here"
                        value={query}
                        onChange={(e) => searchPost(e.target.value)}
                    />
                </div>
            </form>
        </>
    );
};

export default Search;