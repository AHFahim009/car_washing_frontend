import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";

const Login = () => {



  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column */}
      <div className="w-full h-screen md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="max-w-sm w-full space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Sign in to your account to access our premium car washing services.</p>
          </div>
          {/* form code */}
          <LoginForm />
          <p className="text-center text-gray-600">
            Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/man-is-washing-car-with-shirt-that-says-milk_978521-23450.jpg?w=740')` }}>
        <div className="w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center p-8 max-w-xs">
            <h2 className="text-2xl font-bold">Sparkling Clean Cars</h2>
            <p className="mt-4">Experience the best car wash services with our state-of-the-art facilities. Your car deserves the best!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login