import React, { useState, useEffect } from "react";
import { FileInput, Label } from "flowbite-react";
import axios from "axios";

function UploadFile() {
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [imageFromDB, setImageFromDB] = useState(null);

    // get image from db
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/image')
        .then(response => {
            setImageFromDB(response.data.image);
    })
    .catch(error => {
        console.error('Error fetching image:', error);
        });
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
                // Display image preview
                const reader = new FileReader();
                // Read the image file as a data URL
                reader.onload = (e) => {
                    // Set the image preview to the uploaded image
                    setImagePreview(e.target.result);
                };
                reader.readAsDataURL(file);
                setError('');
            } else {
                setError('Please upload a JPG, JPEG, or PNG file.');
            }
        }
    };

    return (
        <div className="flex w-full items-center justify-center">
            <Label
                htmlFor="dropzone-file"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    {/* Render SVG logo only if imagePreview is null */}
                    {/* Render imagePreview if it is not null */}
                    {imagePreview === null && imageFromDB == null && (
                        // SVG Logo
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                    )}
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
