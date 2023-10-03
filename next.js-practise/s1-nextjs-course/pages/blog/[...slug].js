import { useRouter } from "next/router";
import React from "react";

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query);
  return <div>BlogPostsPage</div>;
}

export default BlogPostsPage;
