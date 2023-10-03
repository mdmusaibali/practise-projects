import { useRouter } from "next/router";
import React from "react";

function SelectedClientProjectPage() {
  const router = useRouter();
  console.log("SelectedClientProjectPage", router.query);
  return (
    <div>
      <h1>SelectedClientProjectPage</h1>
    </div>
  );
}

export default SelectedClientProjectPage;
