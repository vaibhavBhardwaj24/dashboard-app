"use client";

import { usePosts } from "../component/api";
import PostsTable from "../component/postTable";
import SearchFilter from "../component/search";
import Pagination from "../component/pagination";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    posts,
    loading,
    // error,
    searchTerm,
    setSearchTerm,
    totalPosts,
    currentPage,
    postsPerPage,
    paginate,
    nextPage,
    prevPage,
  } = usePosts();

  if (!isClient) {
    return (
      <div className="flex justify-center my-8">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Posts</h2>
        <p className="text-gray-600">Manage and view all posts</p>
      </div>

      {/* {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )} */}

      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <PostsTable posts={posts} loading={loading} />

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={totalPosts}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
      />
    </div>
  );
}
