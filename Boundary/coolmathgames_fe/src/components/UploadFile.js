import React, { useState, useEffect } from "react";
import { FileInput, Label } from "flowbite-react";
import axios from "axios";

function UploadFile({picture, setPicture}) {
    const [imagePreview, setImagePreview] = useState(picture ? picture : null);
    const [error, setError] = useState('');

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
                // Display image preview
                const reader = new FileReader();
                // Read the image file as a data URL
                reader.onload = async (e) => {
                    const base64String = await convertToBase64(e.target.result);
                    // Set the image preview to the uploaded image
                    setImagePreview(e.target.result);
                    setPicture(base64String);
                    setError('');
                };
                reader.readAsDataURL(file);
            } else {
                setError('Please upload a JPG, JPEG, or PNG file.');
            }
        }
    };

    const convertToBase64 = (dataUrl) => {
        return new Promise((resolve, reject) => {
            const base64String = dataUrl.split(',')[1];
            resolve(base64String);
        });
    };

    return (
        <div className="flex w-full items-center justify-center">
            <Label
                htmlFor="dropzone-file"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    {/* Text content */}
                    {imagePreview ? (
                        <img src={imagePreview} alt="Uploaded" className="w-full h-32 object-cover" />
                    ) : (
                        <>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">JPG, JPEG, or PNG (MAX. 800x400px)</p>
                        </>
                    )}
                    {error && <div className="text-red-500 pt-2">{error}</div>}
                </div>
                <FileInput id="dropzone-file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
            </Label>
        </div>
    );
}

export default UploadFile;
