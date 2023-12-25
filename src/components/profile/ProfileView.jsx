import React, { useState } from 'react';
import Modal from '../TailwindCss/Modal';

function ViewProfileModal({
    showProfileViewModal,
    setShowProfileViewModal,
    travelMateData
}) {
    return (
        <Modal
            isOpen={showProfileViewModal}
            onClose={() => setShowProfileViewModal(false)}
            title="View Profile"
        >
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className='col-span-2'>
                        <label className="block mb-2 font-medium">Nick Name</label>
                        <input
                            type="text"
                            value={travelMateData.first_name}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    {/* <div>
                        <label className="block mb-2 font-medium">Last Name</label>
                        <input
                            type="text"
                            value={travelMateData.last_name}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div> */}
                </div>

                <label className="block mb-2 font-medium">Email</label>
                <input
                    type="email"
                    value={travelMateData.email}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 font-medium">Country Code</label>
                        <input
                            type="text"
                            value={travelMateData.contry_code}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Date of Birth</label>
                        <input
                            type="date"
                            value={travelMateData.date_of_birth}
                            readOnly
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <label className="block mb-2 font-medium">Bio</label>
                <input
                    type="text"
                    value={travelMateData.bio}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <label className="block mb-2 font-medium">Mother Tongue</label>
                <input
                    type="text"
                    value={travelMateData.mother_tongue}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
            </div>
        </Modal>
    );
}

export default ViewProfileModal;
