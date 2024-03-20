import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';

const url = "http://localhost:4000/image/uploads";
const getUrl = "http://localhost:4000/image/"

function TestUpload(): JSX.Element {
  
  interface PostImage {
    myFile: string;
  }

  const [postImage, setPostImage] = useState<PostImage>({ myFile : "" });

  const createPost = async (newImage: PostImage) => {
    try {
      await axios.post(url, newImage);
    } catch(error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    console.log(webImage)
    e.preventDefault();
    createPost(postImage);
    console.log("Uploaded");
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      console.log(base64);
      setPostImage({ ...postImage, myFile : base64 });
    }
  };

  const [webImage, setWebImage] = useState<PostImage>({ myFile : "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getUrl); // Update with your actual API endpoint
        setWebImage(response.data); // Assuming response.data is the base64 string of the image
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        <h1>Got image</h1>
        <img src={webImage.myFile} alt="Fetched" />
      </div>
      <form onSubmit={handleSubmit}>

        <label htmlFor="file-upload" className='custom-file-upload'>
          <img src={postImage.myFile} alt="Uploaded" />
        </label>

        <input 
          type="file"
          label="Image"
          name="myFile"
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={handleFileUpload}
         />

         <h3>Doris Wilder</h3>
         <span>Designer</span>

         <button type='submit' className='bg-black'>Submit</button>
      </form>
    </div>
  );
}

export default TestUpload;

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
