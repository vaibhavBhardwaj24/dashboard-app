"use client";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsTableProps {
  posts: Post[];
  loading: boolean;
}

export default function PostsTable({ posts, loading }: PostsTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center my-8">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-4 my-4">
        <p className="text-gray-500 text-center">No posts found</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Body
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr
              key={post.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {post.id}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{post.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {post.body.length > 100
                  ? `${post.body.substring(0, 100)}...`
                  : post.body}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
