import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchPostTQ } from '../../api/PostApi';
import { NavLink, useParams } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();
    const { data, isError, isLoading } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPostTQ(id),
        // enabled: !!id, // Query will only run if 'id' is available
    });

    if (isLoading) return <p>Loading . . . . .</p>;
    if (isError) return <p>Something Went Wrong!</p>;

    // if (!data) {
    //     return <p>No data available</p>; // Handle when data is undefined or null
    // }

    return (
        <div className="section-accordion">
            <h1>Post ID Number - {id}</h1>
            <div>
                <p>ID: {data.id}</p>
                <p>Title: {data.title}</p>
                <p>Body: {data.body}</p>
            </div>
            <NavLink to="/tq">
                <button>Go Back</button>
            </NavLink>
        </div>
    );

}

export default Post