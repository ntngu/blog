import { Login } from "../types/Login";

const Login = (props: Login) => {
  return (
    <div className="w-screen h-screen bg-gray-300">
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={props.handleLogin}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-items-center"
        >
          <label htmlFor="username">Username</label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-4"
            type="text"
            id="username"
            placeholder="Username"
            onChange={props.handleNameChange}
          ></input>
          <label htmlFor="password">Password</label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-4"
            type="password"
            id="password"
            placeholder="******"
            onChange={props.handlePasswordChange}
          ></input>
          <button
            className="mt-2 bg-blue-400 hover:bg-blue-500 rounded text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
