import React from "react";
import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h1>PortfolioProjectPage</h1>
    </div>
  );
}

export default PortfolioProjectPage;
