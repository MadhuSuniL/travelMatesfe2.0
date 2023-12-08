import React, { useEffect, useState } from 'react';
import Loading from '../components/global/Loading';
import logo from '../assests/plane.png';
import { useNavigate } from 'react-router-dom';
import instance from '../app/api';
import {toast} from 'react-toastify'
import useAuth from '../Auth/auth';

const Signin = () => {
  const nav = useNavigate();
  const {rootPath, checkTokenExpiration} = useAuth()
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
 


  const handlLogin = (f) =>{
    f.preventDefault()
    let url = 'travel-mates/login'
    let body = {
        phone,
        password
    }
    instance.post(url, body)
    .then(response => response.data)
    .then(data => {
        localStorage.setItem('accessToken',data.tokens_data.access)
        localStorage.setItem('refreshToken',data.tokens_data.refresh)
        localStorage.setItem('travel_mate',JSON.stringify(data.travel_mate_data))
        toast.info('Login success!',{
            position:'top-center',
            autoClose:1000
        })
        window.location.href = '/'
        return 1 
    })
    .catch(error => toast.warning(error.response.data.detail,{
      position:'top-center',
    }))
  }

  useEffect(() =>{
    if(!checkTokenExpiration()){
        return nav(rootPath)
    }
    },[])

  return (
    <div className="md:grid md:grid-cols-3 justify-around">
    <div className='md:col-span-2'>
      <div className="flex justify-center text-3xl md:text-4xl text-sky-400 font-semibold m-5 mb-2 mt-3 text-center md:mb-5 md:mt-64">
        <span>
          <img src={logo} className="w-7 md:w-8 mt-1 md:mt-2 mx-2" alt="Logo" />
        </span>
        <h1 className="">
          TravelMates<span className="text-yellow-400">.com</span>
        </h1>
      </div>
      <p className="text-yellow-400 px-3 text-center text-sm md:text-md md:pr-32 font-semibold md:ml-20">
        "Don't want to travel alone? Our website matches you with a compatible travel partner who shares your itinerary. Say goodbye to lonely trips and hello to new friendships and unforgettable experiences."
      </p>
    </div>
    <div className="px-5">
      <form onSubmit={handlLogin} className="border-2 border-sky-200 shadow-lg shadow-sky-300 rounded-lg p-5 px-3 md:mr-20 mt-1 md:mt-28">
        <h1 className="m-3 text-center text-xl font-semibold text-sky-400">Login</h1>
        <div className="m-2">
          <label htmlFor="phone" className="font-medium">Phone</label>
          <input
            type="number"
            autoFocus={true}
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border border-sky-400 rounded-md focus:outline-none focus:border-sky-600"
          />
        </div>
        <div className="m-2">
          <label htmlFor="password" className="font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-sky-400 rounded-md focus:outline-none focus:border-sky-600"
          />
        </div>
        <input
          type="submit"
          className="w-full bg-sky-400 text-white cursor-pointer p-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-300 mt-3"
        />
        <div className='mt-3 flex flex-col justify-end'>
        <div className="text-black text-[13px] float-right mx-2">
          Don't have an account?{' '}
          <span
            onClick={() => {
              return nav('/register');
            }}
            className="text-sky-400 font-bold cursor-pointer text-sm"
          >
            Register
          </span>
        </div>
        <div className="text-black text-[13px] float-right mx-2 mt-1">
          Forgot password?{' '}
          <span
            onClick={() => {
              return nav('/forgot-password');
            }}
            className="text-sky-400 font-bold cursor-pointer text-sm"
          >
            Click Here
          </span>
        </div>
        </div>
      </form>
    </div>
  </div>  );
};

export default Signin;
