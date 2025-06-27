import { useRef, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import ErrorMessages from '../common/ErrorMessages';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const Login = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    
    const loadingToast = toast.loading('Logging in...');
    
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value
        }),
      });

      const data = await res.json();
      
      if (res.status === 200) {
        toast.dismiss(loadingToast);
        toast.success(`Welcome back! Logged in as ${data.userType}`);
        login(data);
        if (data.userType === 'seller') {
          navigate('/seller');
        } else if (data.userType === 'customer') {
          navigate('/customer');
        } else {
          navigate('/');
        }
      } else if (res.status === 401) {
        toast.dismiss(loadingToast);
        toast.error('Invalid email or password');
        setErrorMessages(data.errorMessages);
      } else {
        toast.dismiss(loadingToast);
        toast.error('Login failed. Please try again.');
        setErrorMessages(data.errorMessages || ['An error occurred']);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Network error. Please check your connection.');
      setErrorMessages(['Network error. Please try again.']);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Log in</h1>
        <ErrorMessages errorMessages={errorMessages} />
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              required
            />
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline">Forgot password?</Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log Me In
            </button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;