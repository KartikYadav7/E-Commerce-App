import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
   const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const[disabled,setDisabled] = useState(false)
    const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

     const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true)
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        name: name,
        email,
        password,

      });
       const { userId, email: registeredEmail } = res.data;
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('email', registeredEmail);
      navigate("/verification");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      }
      else {
        setError("Something went wrong. Please try again.");
      }
    }finally{
      setDisabled(false)
    }
  }

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Your Email"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
  <label className="block text-sm font-medium mb-1">Password</label>
         <div className="relative ">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                required
                className="w-full border rounded px-3 py-2 pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-sm text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
{error && <p className='text-sm text-red-600 min-h-2.5 mb-2 absolute'>{error}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded mt-4
            hover:cursor-pointer"
            disabled={disabled}
          >
            {disabled ? "Registering...." :"CREATE ACCOUNT" }
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Have an Account? <a href="/login" ><span className="font-medium cursor-pointer hover:underline">LOGIN</span></a>
        </div>
      </div>
    </div>
  );
};

export default Signup;