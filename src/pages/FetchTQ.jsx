import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { deletePostTQ, fetchPostsTQ, updatePostTQ } from '../api/PostApi';
import { NavLink } from 'react-router-dom';

const FetchTQ = () => {
    const [pageNumber, setPageNumber] = useState(0);
    //! for delete, update and post requests
    const queryClient = useQueryClient();
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ["posts", pageNumber],
        queryFn: () => fetchPostsTQ(pageNumber),
        //* pagination k waqt page pe loading n adekhen.
        placeholderData: keepPreviousData
    });

    //! mutation function to delete the post
    const deletePost = useMutation({
        mutationFn: (id) => deletePostTQ(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(["posts", pageNumber], (posts) => {
                return posts?.filter((post) => post.id !== id);
            });
        }
    });

    //! mutation function to update the post
    const updatePost = useMutation({
        mutationFn: (id) => updatePostTQ(id),
        onSuccess: (apiData, id) => {
            queryClient.setQueryData(["posts", pageNumber], (posts) => {
                return posts?.map((curPost) => {
                    return curPost.id === id
                        ? { ...curPost, title: apiData.title }
                        : curPost;
                })
            })
        }
    });

    if (isLoading) return <p>Loading . . . . .</p>
    if (isError) return <p>Something Went Wrong!</p>
    //* console.log("Error", error);
    //* console.log("Posts", data);

    return (
        <div>
            <h1>This Data is Fetched By Tanstack Query</h1>
            <ul className="section-accordion">
                {data?.map((post) => {
                    const { id, title, body } = post;
                    return (
                        <li key={id}>
                            <NavLink to={`/tq/${id}`}>
                                <p>{id}</p>
                                <p>{title}</p>
                                <p>{body}</p>
                            </NavLink>
                            <button onClick={() => deletePost.mutate(id)}>Delete</button>
                            <button onClick={() => updatePost.mutate(id)}>Update</button>
                        </li>
                    );
                })}

            </ul>
            <div className="pagination-section container">
                <button
                    disabled={pageNumber === 0 ? true : false}
                    onClick={() => setPageNumber((prev) => prev - 3)}
                >
                    Prev
                </button>
                <p>{pageNumber / 3 + 1}</p>
                <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
            </div>
        </div>
    )
}

export default FetchTQ