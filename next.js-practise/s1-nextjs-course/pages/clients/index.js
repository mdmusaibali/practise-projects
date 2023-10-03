import Link from "next/link";
import React from "react";

function ClientPage() {
  return (
    <div>
      <h1>ClientPage</h1>
      <ul>
        <li>
          <Link
            href={{
              pathname: "/clients/[id]",
              query: {
                id: "client1",
              },
            }}
          >
            Maximilian
          </Link>
        </li>
        <li>
          <Link href="/clients/musaib">Musaib</Link>
        </li>
      </ul>
    </div>
  );
}

export default ClientPage;
