import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const history = useNavigate();
  const [searchParams] = useSearchParams();

  if (searchParams.has("q")) {
    history.replaceState(null, "", "/");
  }

  return (
    <button onClick={() => loginWithRedirect()}>
      <CgProfile size="2rem" color="black" />
    </button>
  );
};

export default LoginButton;
