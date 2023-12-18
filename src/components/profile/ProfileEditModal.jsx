import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Modal from '../TailwindCss/Modal';
import instance from '../../app/api';
import { toast } from 'react-toastify';
import Loading from '../../components/global/Loading'

function ProfileEditModal({
    showProfileEditModal,
    setShowProfileEditModal,
    refreshProfile,
    setRefreshProfile,
    travelMateId,
}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [bio, setBio] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [motherTongue, setMotherTongue] = useState('');
    const [isLoading,setIsLoading] = useState(false)

    const mother_tongues = [
      "English",
      "Spanish",
      "Mandarin",
      "Hindi",
      "Arabic",
      "Bengali",
      "Portuguese",
      "Russian",
      "Japanese",
      "French",
      "German",
      "Korean",
      "Italian",
      "Dutch",
      "Swedish",
      "Polish",
      "Turkish",
      "Greek",
      "Hebrew",
      "Vietnamese",
      "Thai",
      "Tagalog",
      "Swahili",
      "Urdu",
      "Persian",
      "Romanian",
      "Czech",
      "Hungarian",
      "Finnish",
      "Danish",
      "Norwegian",
      "Indonesian",
      "Malay",
      "Hausa",
      "Yoruba",
      "Zulu",
      "Sinhala",
      "Tamil",
      "Punjabi",
      "Gujarati",
      "Marathi",
      "Telugu",
      "Tamil",
      "Burmese",
      "Kannada",
      "Malayalam",
      "Odia",
      "Nepali",
      "Tibetan",
      "Kurdish",
      "Kazakh",
      "Uighur",
      "Tajik",
      "Pashto",
      "Amharic",
      "Somali",
  ]
    const motherTongueOptions = [
    ...mother_tongues.map((language) => ({
        value: language,
        label: language,
    })),
  ];

  
  

    const handleSave = () => {
        setIsLoading(true)
        let url = `/travel-mates/update/${travelMateId}`
        let body = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          contry_code: countryCode,
          bio: bio,
          date_of_birth: dateOfBirth,
          mother_tongue: motherTongue,
        }


        instance.patch(url,body)
        .then(response => response.data)
        .then(data => {
          updateProfileData(data)
          setRefreshProfile(!refreshProfile)
          toast.info('Profile updated successfully')
          setShowProfileEditModal(false)
          setIsLoading(false)
        })
        .catch(error => {
            try {
                toast.warning(error.response.data.detial)
                setIsLoading(false)
            } catch (error) {
                toast.error('Internal error: ')                
                setIsLoading(false)
            }
        })    
    };

    const updateProfileData = (data)=>{
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setEmail(data.email)
      setBio(data.bio)
      setCountryCode(data.contry_code)
      setDateOfBirth(data.date_of_birth)
      setMotherTongue(data.mother_tongue)
    }

    const getProfileData = () => {
        setIsLoading(true)
      let url = `/travel-mates/travel_mate/${travelMateId}`
      instance.get(url)
      .then(response => response.data)
      .then(data => {
        updateProfileData(data)
        setIsLoading(false)
  })
  .catch(error => {
    try {
        toast.warning(error.response.data.detial)
        setIsLoading(false)
    } catch (error) {
        toast.error('Internal error: ')                
        setIsLoading(false)
    }
})    
    }


    useEffect(()=>{
        getProfileData()
    },[])

    return (
        <Modal
            isOpen={showProfileEditModal}
            onClose={() => setShowProfileEditModal(false)}
            title="Edit Profile"
        >
        {isLoading && <Loading/>}
            <div className="p-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                        <label className="block mb-2 font-medium">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-300"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-300"
                        />
                    </div>
                </div>

                <label className="block mb-2 font-medium">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-300 mb-2"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                        <label className="block mb-2 font-medium">Country Code</label>
                        <input
                            type="text"
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-300"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Date of Birth</label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-sky-300"
                        />
                    </div>
                </div>

                <label className="block mb-2 font-medium">Bio</label>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md  focus:ring-sky-300 mb-2"
                />

                <label className="block mb-2 font-medium">Mother Tongue</label>
                <Select
                    options={motherTongueOptions}
                    value={{value: motherTongue,label:motherTongue}}
                    onChange={(selectedOption) => setMotherTongue(selectedOption.value)}
                />
            </div>

            <button
                onClick={handleSave}
                className="bg-sky-400 text-white p-2 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-sky-300"
            >
                Save
            </button>
        </Modal>
    );
}

export default ProfileEditModal;
