import React, { useState } from 'react';
import Modal from '../TailwindCss/Modal';
import { toast } from 'react-toastify';
import instance from '../../app/api';

function ChangePasswordModal({
    showChangePasswordModal,
    setShowChangePasswordModal,
    logout
}) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSaveChanges = () => {
      if (newPassword !== confirmPassword) {
        toast.warning('New password and confirm password are not the same!')
        return 0
      }
      let url = `/travel-mates/change-password`
      let body = {
        old_password: oldPassword,
        new_password: newPassword
      }
      instance.post(url, body)
      .then(response => response.data)
      .then(data => {
          toast.info('Password changed, Login again!')
          logout()
      }
      )
    };

    return (
        <>
            <Modal
                isOpen={showChangePasswordModal}
                onClose={() => setShowChangePasswordModal(false)}
                title="Change Password"
            >
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Old Password</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border-2 border-sky-300 rounded-lg"
                    />
                </div>

                <button
                    onClick={handleSaveChanges}
                    className="bg-sky-400 font-bold float-right text-white border-2 border-sky-400 rounded-lg p-2 hover:bg-sky-500 hover:border-sky-500 cursor-pointer"
                >
                    Change & Logout
                </button>
                <br />
                <br />
            </Modal>
        </>
    );
}

export default ChangePasswordModal;
