import React, { useEffect, useState } from 'react';
import Loading from '../components/global/Loading';
import logo from '../assests/plane.png';
import { useNavigate } from 'react-router-dom';
import instance from '../app/api';
import {toast} from 'react-toastify'
import useAuth from '../Auth/auth';

const ForgotPassword = () => {
    const nav = useNavigate();
    const [isLoading,setIsloading] = useState(false)
    const {rootPath, checkTokenExpiration} = useAuth()
    const [phone,setPhone] = useState('')
    const [otp,setOtp] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    //stages
    const [currentState, setCurrentStage] = useState('otp-send')
 


  const handlOtpSend = (f) =>{
    setIsloading(true)
    f.preventDefault()
    let url = 'travel-mates/otp-send'
    let body = {
        phone,
    }
    instance.post(url, body)
    .then(response => response.data)
    .then(data => {
        toast.info(data.detail,{
            position:'top-center',
          })
        setIsloading(false)
        setCurrentStage('otp-verification')
    })
    .catch(error => {
        try {
            toast.warning(error.response.data.detail,{
             position:'top-center',
           })
           setIsloading(false)
        } catch (error) {
            toast.warning(error.response.data.detail,{
             position:'top-center',
           })
           setIsloading(false)            
        }
    }
    )
  }

  const handlOtpVerify = (f) =>{
    setIsloading(true)
    f.preventDefault()
    let url = 'travel-mates/otp-verification'
    let body = {
        phone,
        otp
    }
    instance.post(url, body)
    .then(response => response.data)
    .then(data => {
        toast.info(data.msg,{
            position:'top-center',
          })
          if (data.status){
              setCurrentStage('forgot-password')
          }
        setIsloading(false)
    })
    .catch(error => {
        try {
            toast.warning(error.response.data.detail,{
             position:'top-center',
           })
           setIsloading(false)
        } catch (error) {
            toast.warning(error.response.data.detail,{
             position:'top-center',
           })
           setIsloading(false)            
        }
    }
    )
  }

  const handleForgotPassword = (f) =>{
    setIsloading(true)
    f.preventDefault()
    if (newPassword !== confirmPassword){
        toast.warning('Confirm password is incorrect!',{
            position:'top-center',
        })
        return ;
    }
    let url = 'travel-mates/forgot-password'
    let body = {
        phone,
        new_password : newPassword
    }
    instance.post(url, body)
    .then(response => response.data)
    .then(data => {
        toast.info(data.detail,{
            position:'top-center',
          })
        setIsloading(false)
        nav('/login')
        return ;
    })
    .catch(error => {
        try {
            toast.warning(error.response.data.detail,{
             position:'top-center',
           })
           setIsloading(false)
        } catch (error) {
            toast.warning(error.response.data.detail,{
             position:'top-center',
           })
           setIsloading(false)            
        }
    }
    )
  }

  useEffect(() =>{
    if(!checkTokenExpiration()){
        return nav(rootPath)
    }
    },[])

  return (
    <>
    {
        isLoading && <Loading/>
    }
        {
            currentState === 'otp-send' &&
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
                <form onSubmit={handlOtpSend} className="border-2 border-sky-200 shadow-lg shadow-sky-300 rounded-lg p-5 px-3 md:mr-20 mt-1 md:mt-28">
                    <h1 className="m-3 text-center text-xl font-semibold text-sky-400">Forgot Password</h1>
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
                    <input
                    type="submit"
                    value={'Send OTP'}
                    className="w-full bg-sky-400 text-white cursor-pointer p-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-300 mt-3"
                    />
                </form>
                </div>
            </div>  
        }
        {
            currentState === 'otp-verification' &&
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
                <form onSubmit={handlOtpVerify} className="border-2 border-sky-200 shadow-lg shadow-sky-300 rounded-lg p-5 px-3 md:mr-20 mt-1 md:mt-28">
                    <h1 className="m-3 text-center text-xl font-semibold text-sky-400">Forgot Password</h1>
                    <div className="m-2">
                    <label htmlFor="phone" className="font-medium">Enter OTP</label>
                    <input
                        type="number"
                        autoFocus={true}
                        id="phone"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full p-2 border border-sky-400 rounded-md focus:outline-none focus:border-sky-600"
                    />
                        <p className='text-yellow-400 text-[10px] mx-2 mt-1'>"OTP has been sent to your registered email. Please check your inbox and enter the OTP in the box below to proceed. The OTP is valid for 10 minutes."</p>
                    </div>
                    <input
                    type="submit"
                    value={'Verify OTP'}
                    className="w-full bg-sky-400 text-white cursor-pointer p-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-300 mt-3"
                    />
                </form>
                </div>
            </div>  
        }
        {
            currentState === 'forgot-password' &&
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
            <form onSubmit={handlOtpVerify} className="border-2 border-sky-200 shadow-lg shadow-sky-300 rounded-lg p-5 px-3 md:mr-20 mt-1 md:mt-28">
            <h1 className="m-3 text-center text-xl font-semibold text-sky-400">Forgot Password</h1>

                <div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Enter New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border-2 border-sky-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-semibold mb-2">Enter Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border-2 border-sky-300 rounded-lg"
                        />
                    </div>

                    <button
                        onClick={handleForgotPassword}
                        className="bg-sky-400 font-bold float-right text-white border-2 border-sky-400 rounded-lg p-2 hover:bg-sky-500 hover:border-sky-500 cursor-pointer"
                    >
                        Submit
                    </button>
                    <br />
                    <br />
                </div>
            </form>
            </div>
        </div>  
        }
    </>
  );
};



export default ForgotPassword