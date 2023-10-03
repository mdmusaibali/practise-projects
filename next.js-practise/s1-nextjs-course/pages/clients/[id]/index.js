import { useRouter } from "next/router";
import React from "react";

function ClientProjectsPage() {
  const router = useRouter();
  console.log("ClientProjectsPage", router.query);

  function loadProjectHandler() {
    router.push("/clients/max/projectA");
  }

  return (
    <div>
      <h1>ClientProjectsPage</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}

export default ClientProjectsPage;
