import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      // setLoading(false)
      // setError(false); 
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // setLoading(false);
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.error));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
      // setLoading(false);
      // setError(true);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='Email' id='email'
        className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password'
        className='bg-slate-100 p-3 rounded-lg'onChange={handleChange}/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading...": "Sign in"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{ error ? error || 'Something went wrong!' : "" }</p>
    </div>
  )
}

export default SignIn
