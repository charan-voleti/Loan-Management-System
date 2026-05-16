import { useState } from "react";

import { useNavigate }
from "react-router-dom";

import { useAuth }
from "../../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await login(
          email,
          password
        );

        // redirect later
        navigate("/dashboard");

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };


  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    "
    >

      <form
        onSubmit={handleLogin}
        className="
        bg-white
        p-8
        rounded-lg
        shadow-md
        w-full
        max-w-md
      "
      >

        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-6
        "
        >
          LMS Login
        </h1>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          border
          p-3
          rounded
          mb-4
        "
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
          w-full
          border
          p-3
          rounded
          mb-4
        "
        />


        <button
          type="submit"
          className="
          w-full
          bg-blue-500
          text-white
          p-3
          rounded
          hover:bg-blue-600
        "
        >

          {
            loading
              ? "Logging in..."
              : "Login"
          }

        </button>

      </form>

    </div>
  );
}

export default Login;