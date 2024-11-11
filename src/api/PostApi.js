import axios from "axios";
//`/posts?_start=0&_limit=3
const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
});

export const fetchPosts = () => {
    return api.get("/posts");
}

//* Getting All Posts 
//* For Pagination
//! /posts?_start={pageNumber}&_limit=3

export const fetchPostsTQ = async (pageNumber) => {
    const response = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    console.log("Posts : ", response.data);
    return response.data;
}

//* Get Individual Post
export const fetchPostTQ = async (id) => {
    console.log("Fetching post for ID:", id);
    const response = await api.get(`/posts/${id}`);
    return response.data;
}

//* Deleting individual Post
export const deletePostTQ = async (id) => {
    const response = await api.delete(`/posts/${id}`);
    // console.log("Post Deleted Successfully");
    return response.data;
}

//* Updating individual Post
export const updatePostTQ = async (id) => {
    const response = await api.patch(`/posts/${id}`, { title: "This Record is Update by Ahmad Shah" });
    console.log("Response:", response.data);
    return response.data;
}



