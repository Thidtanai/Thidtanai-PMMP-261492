import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

interface Recruit {
  recruit_role: string;
  recruit_count: number;
  recruit_description?: string;
  [key: string]: string | number | undefined;  //index signature
}

export interface FormData {
  activity_name: string;
  activity_description: {
    description?: string;
    tag: string[];
    start_date: Date;
    end_date: Date;
    location?: string;
    department?: string;
  };
  activity_image: string;
  activity_contact: {
    email?: string;
    other?: string;
  };
  activity_recruit: Recruit[];
}

const CreateAct: React.FC<FormProps> = ({ onSubmit }) => {
  const initialFormData: FormData = {
    activity_name: '',
    activity_description: {
      description: '',
      tag: [],
      start_date: new Date(),
      end_date: new Date(),
      location: '',
      department: '',
    },
    activity_image: '',
    activity_contact: {
      email: '',
      other: '',
    },
    activity_recruit: [],
  }
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'activity_name') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (name.startsWith('activity_description.')) {
      const descriptionField = name.split('.')[1];
      setFormData({
        ...formData,
        activity_description: {
          ...formData.activity_description,
          [descriptionField]: value,
        },
      });
    } else if (name.startsWith('activity_contact.')) {
      const contactField = name.split('.')[1];
      setFormData({
        ...formData,
        activity_contact: {
          ...formData.activity_contact,
          [contactField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCalendarChange = (date: Date, field: 'start_date' | 'end_date') => {
    setFormData({
      ...formData,
      activity_description: {
        ...formData.activity_description,
        [field]: date,
      },
    });
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData({
      ...formData,
      activity_description: {
        ...formData.activity_description,
        tag: tags,
      },
    });
  };

  const handleRecruitChange = (index: number, field: string, value: string | number) => {
    const updatedRecruits = [...formData.activity_recruit];
    updatedRecruits[index][field] = value;
    setFormData({
      ...formData,
      activity_recruit: updatedRecruits,
    });
  };


  const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) {
        return; // No files selected, do nothing
      }
  
      const file = files[0]; // Assuming you only want to handle the first file
      const base64_file = await convertToBase64(file);
      setFormData({ ...formData, activity_image: base64_file});
    } catch(error) {
      console.log('Error change picture:', error);
    }
  };

  const handleAddRecruit = () => {
    setFormData({
      ...formData,
      activity_recruit: [...formData.activity_recruit, { recruit_role: '', recruit_count: 0 }],
    });
  };

  const handleRemoveRecruit = (index: number) => {
    const updatedRecruits = [...formData.activity_recruit];
    updatedRecruits.splice(index, 1);
    setFormData({
      ...formData,
      activity_recruit: updatedRecruits,
    });
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      activity_description: {
        ...formData.activity_description,
        department: e.target.value,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    resetForm();
  };

  const resetForm = () => {
    setFormData(initialFormData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ชื่อกิจกรรม:
        <input type="text" name="activity_name" value={formData.activity_name} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        รายละเอียด:
        <input type="text" name="activity_description.description" value={formData.activity_description.description} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        สถานที่:
        <input type="text" name="activity_description.location" value={formData.activity_description.location} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        Email:
        <input type="text" name="activity_contact.email" value={formData.activity_contact.email} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        ช่องทางติดต่ออื่นๆ:
        <input type="text" name="activity_contact.other" value={formData.activity_contact.other} onChange={handleInputChange} />
      </label>
      <br />

      <label>
        วันเริ่มต้น:
        <DatePicker selected={formData.activity_description.start_date} onChange={(date) => handleCalendarChange(date as Date, 'start_date')} />
      </label>
      <br />

      <label>
        วันสิ้นสุด:
        <DatePicker selected={formData.activity_description.end_date} onChange={(date) => handleCalendarChange(date as Date, 'end_date')} />
      </label>
      <br />

      <label>
        Tags:
        <input type="text" value={formData.activity_description.tag.join(',')} onChange={(e) => handleTagsChange(e.target.value.split(','))} />
      </label>
      <br />

      {/* required department dropdown */}
      <label>
        คณะ:
        <select
          name="department"
          value={formData.activity_description.department}
          onChange={handleDropdownChange}
        >
          <option value="">Select Department</option>
          <option value="ทุกคณะ">ทุกคณะ</option>
          <option value="วิศวะ">วิศวะกรรมศาสตร์</option>
          <option value="ศึกษา">ศึกษาศาสตร์</option>
          <option value="วิทยา">วิทยาศาสตร์</option>
          {/* Add more departments as needed */}
        </select>
      </label>
      <br />

      {/* recruit member */}
      <label>
        Recruit Roles:
        {formData.activity_recruit.map((recruit, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Role"
              value={recruit.recruit_role}
              onChange={(e) => handleRecruitChange(index, 'recruit_role', e.target.value)}
            />
            <input
              type="number"
              placeholder="Count"
              value={recruit.recruit_count}
              onChange={(e) => handleRecruitChange(index, 'recruit_count', parseInt(e.target.value, 10))}
            />
            <input
              type="text"
              placeholder="Description"
              value={recruit.recruit_description}
              onChange={(e) => handleRecruitChange(index, 'recruit_description', e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveRecruit(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddRecruit}>
          Add Recruit
        </button>
      </label>
      <br />

      <label>
        Upload Picture:
        <input type="file" accept="image/*" onChange={handlePictureChange} />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateAct;

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