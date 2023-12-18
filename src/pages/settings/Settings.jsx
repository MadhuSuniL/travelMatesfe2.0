import React,{useState} from 'react';
import Header from '../../Header';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from '../../components/profile/ChangePassword.jsx';
import Loading from '../../components/global/Loading'

const Settings = () => {
    const nav = useNavigate();
    const [showChangePasswordModal,setShowChangePasswordModal] = useState(false) 
    const [isLoading,setIsLoading] = useState(false)



    const logout = () =>{
        localStorage.clear()
        nav('/login')
    }

    return (
        <div>
        {isLoading && <Loading/>}
            <div className="max-w-screen-md mx-auto px-4 md:px-0">
                <h1
                    onClick={() => nav('/profile/self')}
                    className="cursor-pointer text-lg md:text-xl font-semibold text-gray-700 flex items-center"
                >
                    <FaArrowLeft className="mr-2 text-gray-600" /> Settings
                </h1>

                <div className="mt-8 grid md:grid-cols-2 gap-2">
                    {/* Account Section */}
                    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                        <h2 className="text-md font-semibold text-gray-600 mb-4">Account</h2>
                        <ul className="space-y-2">
                            <li>
                                <button onClick={()=> setShowChangePasswordModal(true)} className="text-sky-400 hover:underline">Change Password</button>
                            </li>
                            <li>
                                <button onClick={logout} className="text-red-400 font-bold hover:underline">Logout</button>
                            </li>
                        </ul>
                    </div>

                    {/* Preference Section */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-md font-semibold text-gray-600 mb-4">Preference</h2>
                        <ul className="space-y-2">
                            <li>
                                <button className="text-sky-400 hover:underline">Language Preferences</button>
                            </li>
                            <li>
                                <button className="text-sky-400 hover:underline">Notification Settings</button>
                            </li>
                            <li>
                                <button className="text-sky-400 hover:underline">Privacy Settings</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {showChangePasswordModal && <ChangePasswordModal
            showChangePasswordModal = {showChangePasswordModal}
            setShowChangePasswordModal = {setShowChangePasswordModal} 
            setIsLoading = {setIsLoading}  
            logout = {logout} 
            />}

        </div>
    );
};

export default Settings;
