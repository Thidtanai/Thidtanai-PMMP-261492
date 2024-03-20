import React from 'react';
import CreateAct, {FormData} from '../components/CreateAct';
import axios from 'axios';

const CreatePage: React.FC = () => {
  const handleSubmit = async (formData: FormData): Promise<void> => {
    try {

      // log the form data to console
      // console.log('Form data:', formData);
      
      // Send data to MongoDB or any other backend
      await axios.post('http://localhost:4000/activity/create-activity', formData).then((res) => {
        console.log(res.data);
      });

      // Reset form or perform any other action on successful submission
      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <h1>React TypeScript Form</h1>
      <CreateAct onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePage;