import React from "react";

function UserProfilePage({ username }) {
  return <div>{username}</div>;
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  // there is no revalidate
  const { params, req, res } = context;
  return {
    props: {
      username: "Max",
    },
  };
}
