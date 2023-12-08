import React,{useState, useEffect} from 'react';
import Loading from '../components/global/Loading';
import logo from '../assests/plane.png';
import { useNavigate } from 'react-router-dom';
import instance from '../app/api';
import {toast} from 'react-toastify'
import useAuth from '../Auth/auth';

const Signup = () => {
  const nav = useNavigate();
  const {rootPath, checkTokenExpiration} = useAuth()
  const [phone,setPhone] = useState('')
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [contryCode,setContryCode] = useState('')
  const [password,setPassword] = useState('')
  const [cPassword,setCPassword] = useState('')



  const handleRegister = (f) =>{
    f.preventDefault()
    
    if (password !== cPassword){
      toast.warning('Confirm password is incorrect')
      return false
    }
    let url = 'travel-mates/register'
    let body = {
      phone,
      email,
      first_name: name,
      last_name : name,
      contry_code : contryCode,
      password
    }
    console.log(body)
    instance.post(url, body)
    .then(response => response.data)
    .then(data => {
      toast.info('Successfully registered, You can login now!',{
        autoClose:2000,
        position:'top-center'
      })
      return nav('/login')
    })
    .catch(error => {
      toast.warning(error.response.data.detail,{
        position:'top-center',
      })
    })
  }

  
  useEffect(() =>{
    if(!checkTokenExpiration()){
        return nav(rootPath)
    }
    },[])

 
  return (
<div className="md:grid md:grid-cols-2 justify-around">
      <div>
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
        <form onSubmit={handleRegister} className="border-2 border-sky-200 shadow-lg shadow-sky-300 rounded-lg p-5 px-3 md:mr-20 mt-4 md:mt-14">
          <h1 className="m-3 text-center text-xl font-semibold text-sky-400">Create an Account</h1>
          <div className='grid md:grid-cols-2'>
          <div className="m-2">
            <label htmlFor="phone" className="font-medium">Enter Phone Number</label>
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
            <label htmlFor="email" className="font-medium">Enter Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-sky-400 rounded-md focus:outline-none focus:border-sky-600"
            />
          </div>
          <div className="m-2">
            <label htmlFor="name" className="font-medium">Enter Your Nick Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-sky-400 rounded-md focus:outline-none focus:border-sky-600"
            />
          </div>
          <div className="m-2">
            <label htmlFor="contryCode" className="font-medium">Country Code</label>
            <input
              type="number"
              id="contryCode"
              value={contryCode}
              onChange={(e) => setContryCode(e.target.value)}
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
          <div className="m-2">
            <label htmlFor="cPassword" className="font-medium">Confirm Password</label>
            <input
              type="password"
              id="cPassword"
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
              className="w-full p-2 border border-sky-400 rounded-md focus:outline-none focus:border-sky-600"
            />
          </div>
          <div className="text-black text-[13px] m-2 mt-4">
            Don't have an account?{' '}
            <span
              onClick={() => {
                return nav('/login');
              }}
              className="text-sky-400 font-bold cursor-pointer text-sm"
            >
              Login
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-400 text-white p-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-300 mt-3"
          >
            Create Account
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
