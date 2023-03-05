import React from "react";
import Pagination from "./Pagination";
import Search from "./Search";
import "./style.css";
import { useGlobalContext } from "../context/newsState";

const News = () => {
    const { hits, isLoading, removePost } = useGlobalContext();
    if (isLoading) {
        return (
            <h2>Loading...</h2>
        );
    };

    return (
        <>
            <Search />
            <Pagination />
            <div className="news-div">
                {hits.map((curPost) => {
                    const { title, author, objectID, url, num_comments } = curPost;
                    return (
                        <div className="card" key={objectID}>
                            <h2>{title}</h2>
                            <p>
                                By <span> {author}</span> | <span> {num_comments} </span>
                                comments
                            </p>
                            <div className="card-button">
                                <a href={url} target="_blank">
                                    Read More
                                </a>
                                <a href="#" onClick={() => removePost(objectID)}>
                                    Remove
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default News;