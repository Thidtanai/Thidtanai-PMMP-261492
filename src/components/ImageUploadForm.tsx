import React, { useEffect, useState } from 'react';
import convertToBase64 from './ConvertImage';
interface ImagePreview {
    id: string;
    src: string;
}

const ImageUploadForm: React.FC<{ onBase64ImagesChange: (base64Images: string[]) => void }> = ({ onBase64ImagesChange }) => {
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    // const [base64Images, setBase64Images] = useState<string[]>([]);
    //for preview images
    const [recentImage, setRecentImage] = useState<ImagePreview | null>(null)

    useEffect(() => {
        if (images.length > 0) {
            //set the most recent image to display it prominetly
            setRecentImage(images[images.length - 1])
        } else {
            setRecentImage(null)
        }
    }, [images])
    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files);
            setSelectedImages([...selectedImages, ...fileArray]);

            //for preview images 
            const newImagePreviews = fileArray.map((file) => {
                return {
                    id: URL.createObjectURL(file),
                    src: URL.createObjectURL(file),
                };
            });

            try {
                const base64Strings = await Promise.all(fileArray.map(file => convertToBase64(file)));
                const validBase64Strings = base64Strings.filter((item): item is string => typeof item === 'string');
                onBase64ImagesChange(validBase64Strings) // Update parent state
            } catch (error) {
                console.error('Error converting images to base64', error);
            }


            setImages([...images, ...newImagePreviews]);
        }
    };

    return (
        <div className="container mx-auto">
            {/* Display the most recent image prominently above the input field */}
            <div className=" mb-4 w-64 h-64 border-2 border-dashed border-gray-300 flex justify-center items-center">
                {recentImage ? (
                    <img src={recentImage.src} alt="Most recent upload" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-500">No image</span> // Placeholder text or leave blank
                )}
            </div>

            {/* input field */}
            <input
                type="file"
                onChange={handleImageChange}
                multiple
                className="mb-2"
            />
            {/* previously uploaded images */}
            <div className="flex flex-wrap gap-2 h-16">
                {images.map((image) => (
                    <div key={image.id} className="w-16 h-16 relative">
                        <img src={image.src} alt="Uploaded" className="w-full h-full object-cover absolute inset-0" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploadForm;
