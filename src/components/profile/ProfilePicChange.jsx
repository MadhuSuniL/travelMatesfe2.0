import React, { useEffect, useState } from 'react';
// import AvatarEditor from 'react-avatar-editor';
import Modal from '../TailwindCss/Modal';
import instance from '../../app/api';
import { toast } from 'react-toastify';

function ProfilePictureUploader({
    showChangeProfilePicModal,
    setShowChangeProfilePicModal,
    profilePicUrl,
    refreshProfile,
    setRefreshProfile,
    travelMateId
}) {
  const [image, setImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [scale, setScale] = useState(1);
  const [croppedImage ,setCroppedImage] = useState()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleScaleChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
    setCroppedImage(editor.getImageScaledToCanvas().toDataURL())
  };

  function dataURLtoFile(dataURL, filename) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  

  const handleSave = () => {
    if (editor) {
        const croppedImage = editor.getImageScaledToCanvas().toDataURL();
        const croppedFile = dataURLtoFile(croppedImage, 'cropped-image.png');    
        const formData = new FormData();
        formData.append('profile_pic', croppedFile);
        let url = `/travel-mates/update/${travelMateId}`
        instance.patch(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          .then((response) => {
            toast.info('Image uploaded successfully')
            setShowChangeProfilePicModal(false)
            setRefreshProfile(!refreshProfile)
          })        
    }
  };

  useEffect(()=>{
    setCroppedImage(profilePicUrl)
  },[profilePicUrl])

  return (
    <Modal
        isOpen={showChangeProfilePicModal}
        onClose={() => setShowChangeProfilePicModal(false)}
        title="View Profile"
    >
    <div>
        <div>
            <center>
                <img src={croppedImage} className='w-14 md:w-32 m-1 mb-0 rounded-full border-02 border-sky-400'/>    
                <label htmlFor="file-input" className='cursor-pointer text-sky-400 font-bold text-lg text-center'>Change Profile Picture</label>
            </center>
            <input
            type="file"
            accept="image/*"
            id="file-input"
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
        </div>
      {image && (
        <div>
            {/* <center>
                <AvatarEditor
                    ref={(ref) => setEditor(ref)}
                    image={image}
                    width={200}
                    height={200}
                    border={50}
                    color={[255, 255, 255, 0.6]} // Background color
                    scale={scale}
                />
            </center> */}
          <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={scale}
                onChange={handleScaleChange}
                className="w-full appearance-none rounded h-4 bg-gray-100"
            />
            <div className="flex justify-between">
                <span className="text-xs text-sky-400 font-bold">1%</span>
                <span className="text-xs text-sky-400 font-bold">100%</span>
            </div>
            <button
                onClick={handleSave}
                className="mt-2 bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded"
            >
                Save
            </button>
        </div>
      )}
    </div>
    </Modal>
  );
}

export default ProfilePictureUploader;
