import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../api/PostApi';

const FetchOld = () => {
    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getPostsData = async () => {
        try {
            setLoading(true);
            const response = await fetchPosts();
            if (response.status === 200) {
                setPostsData(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.log("Error While Fetching Posts Data", error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        getPostsData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong!</p>;

    return (
        <div>
            <h1>This Data is Fetched By Old Method</h1>
            <ul className="section-accordion">
                {postsData.map((post) => {
                    const { id, title, body } = post;
                    return (
                        <li key={id}>
                            <p>{title}</p>
                            <p>{body}</p>
                        </li>
                    );
                })}

            </ul>
        </div>
    )
}

export default FetchOld