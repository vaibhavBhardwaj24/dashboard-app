// hooks/usePosts.ts
"use client";

import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

export const usePosts = (initialData: Post[] = []) => {
  const [posts, setPosts] = useState<Post[]>(initialData);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchPosts = async () => {
      if (initialData.length === 0) {
        setLoading(true);
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
          );

          if (!response.ok) {
            throw new Error(`API call failed: ${response.status}`);
          }

          const data: Post[] = await response.json();
          setPosts(data);
          setFilteredPosts(data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.id.toString().includes(term)
      );
      setFilteredPosts(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, posts]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    posts: currentPosts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    totalPosts: filteredPosts.length,
    currentPage,
    postsPerPage,
    paginate,
    nextPage,
    prevPage,
  };
};
