import { useSession } from "next-auth/react";
import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/router";

function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session, status);
  
  if (session) {
    router.replace("/");
    return;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  } else {
    return <AuthForm />;
  }
}

export default AuthPage;
