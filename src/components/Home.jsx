import { ClerkProvider, SignedIn, SignIn } from "@clerk/clerk-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  // if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  //   throw new Error("Missing Publishable Key")
  // }
  const clerkPubKey =
    "pk_test_Zmx1ZW50LXRvcnRvaXNlLTYxLmNsZXJrLmFjY291bnRzLmRldiQ";

  const navigator = useNavigate();
  navigator("/tasks");
  return (
    <div className="mt-5">
      <div className="flex justify-center items-center">Home</div>
    </div>
  );
}

export default Home;
