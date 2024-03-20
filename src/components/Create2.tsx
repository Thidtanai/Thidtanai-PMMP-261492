import React, { FunctionComponent, useState } from "react";
import GroupComponent1 from "./GroupComponent1";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'

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

const TagOptions = [
  { value: 'วิชาการ', label: 'วิชาการ' },
  { value: 'บันเทิง', label: 'บันเทิง' },
  { value: 'สุขภาพ/กีฬา', label: 'สุขภาพ/กีฬา' },
  { value: 'เข้าสังคม', label: 'เข้าสังคม' },
  { value: 'จิตอาสา', label: 'จิตอาสา' },
  { value: 'วิชาชีพ', label: 'วิชาชีพ' },
  { value: 'เทคโนโลยี', label: 'เทคโนโลยี' },
  { value: 'ศิลปะ/การแสดง', label: 'ศิลปะ/การแสดง' },
  { value: 'กิจการนักศึกษา', label: 'กิจการนักศึกษา' },
  { value: 'ศาสนา', label: 'ศาสนา' },
  { value: 'เพิ่มทักษะ', label: 'เพิ่มทักษะ' },
  { value: 'ท่องเที่ยว', label: 'ท่องเที่ยว' },
]

const DepartmentOptions = [

  { value: 'ทุกคณะ', label: 'ทุกคณะ' },
  { value: 'คณะมนุษยศาสตร์', label: 'คณะมนุษยศาสตร์' },
  { value: 'คณะศึกษาศาสตร์', label: 'คณะศึกษาศาสตร์' },
  { value: 'คณะวิจิตรศิลป์', label: 'คณะวิจิตรศิลป์' },
  { value: 'คณะสังคมศาสตร์', label: 'คณะสังคมศาสตร์' },
  { value: 'คณะวิทยาศาสตร์', label: 'คณะวิทยาศาสตร์' },
  { value: 'คณะวิศวกรรมศาสตร์', label: 'คณะวิศวกรรมศาสตร์' },
  { value: 'คณะแพทยศาสตร์', label: 'คณะแพทยศาสตร์' },
  { value: 'คณะเกษตรศาสตร์', label: 'คณะเกษตรศาสตร์' },
  { value: 'คณะทันตแพทยศาสตร์', label: 'คณะทันตแพทยศาสตร์' },
  { value: 'คณะเภสัชศาสตร์', label: 'คณะเภสัชศาสตร์' },
  { value: 'คณะเทคนิคการแพทย์', label: 'คณะเทคนิคการแพทย์' },
  { value: 'คณะเภสัชศาสตร์', label: 'คณะเภสัชศาสตร์' },
  { value: 'คณะทันตแพทยศาสตร์', label: 'คณะทันตแพทยศาสตร์' },
  { value: 'คณะพยาบาลศาสตร์', label: 'คณะพยาบาลศาสตร์' },
  { value: 'คณะอุตสาหกรรมเกษตร', label: 'คณะอุตสาหกรรมเกษตร' },
  { value: 'คณะสัตวแพทยศาสตร์', label: 'คณะสัตวแพทยศาสตร์' },
  { value: 'คณะบริหารธุรกิจ', label: 'คณะบริหารธุรกิจ' },
  { value: 'คณะเศรษฐศาสตร์', label: 'คณะเศรษฐศาสตร์' },
  { value: 'คณะสถาปัตยกรรมศาสตร์', label: 'คณะสถาปัตยกรรมศาสตร์' },
  { value: 'คณะการสื่อสารมวลชน', label: 'คณะการสื่อสารมวลชน' },
  { value: 'คณะรัฐศาสตร์และรัฐประศาสนศาสตร์', label: 'คณะรัฐศาสตร์และรัฐประศาสนศาสตร์' },
  { value: 'คณะนิติศาสตร์', label: 'คณะนิติศาสตร์' },
  { value: 'วิทยาลัยศิลปะ สื่อ และเทคโนโลยี', label: 'วิทยาลัยศิลปะ สื่อ และเทคโนโลยี' },
  { value: 'คณะสาธารณสุขศาสตร์', label: 'คณะสาธารณสุขศาสตร์' },
  { value: 'วิทยาลัยการศึกษาและการจัดการทางทะเล', label: 'วิทยาลัยการศึกษาและการจัดการทางทะเล' },
  { value: 'วิทยาลัยนานาชาตินวัตกรรมดิจิทัล', label: 'วิทยาลัยนานาชาตินวัตกรรมดิจิทัล' },
  { value: 'สถาบันนโยบายสาธารณะ', label: 'สถาบันนโยบายสาธารณะ' },
  { value: 'สถาบันวิศวกรรมชีวการแพทย์', label: 'สถาบันวิศวกรรมชีวการแพทย์' },
  { value: 'สถาบันวิจัยวิทยาศาสตร์สุขภาพ', label: 'สถาบันวิจัยวิทยาศาสตร์สุขภาพ' },
  { value: 'บัณฑิตวิทยาลัย', label: 'บัณฑิตวิทยาลัย' },
]


const Create2: React.FC<FormProps> = ({onSubmit}) => {
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


  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData({ ...formData, activity_image: file ? URL.createObjectURL(file) : ''});
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
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({
      ...formData,
      activity_description: {
        ...formData.activity_description,
        tag: selectedOptions,
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
    <section onSubmit={handleSubmit} className="w-[76.875rem] flex flex-col items-center justify-start pt-[3.438rem] px-[3.438rem] pb-[3.5rem] box-border relative gap-[4.063rem_0rem] max-w-full text-left text-[3.125rem] text-black font-heading-2 mq750:gap-[4.063rem_0rem] mq750:pt-[1.25rem] mq750:pb-[1.25rem] mq750:box-border mq1275:py-[2.25rem] mq1275:px-[1.688rem] mq1275:box-border mq1275:w-[calc(100%_-_40px)] mq450:gap-[4.063rem_0rem] mq1100:pt-[1.438rem] mq1100:pb-[1.438rem] mq1100:box-border">
      <div className="w-full h-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] bg-white" />
      <div className="self-stretch flex flex-col items-end justify-start gap-[3.25rem_0rem] max-w-full shrink-0 mq750:gap-[3.25rem_0rem]">
        <div className="self-stretch bg-lavender flex flex-row items-center justify-start gap-[0rem_1rem] max-w-full z-[1]">
          <div className="h-[5.5rem] w-[0.438rem] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
          <h1 className="m-0 w-[25.875rem] relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block max-w-[calc(100%_-_23px)] mq750:text-[2.5rem] mq750:leading-[2.75rem] mq450:text-[1.875rem] mq450:leading-[2.063rem]">
            กรอกข้อมูลกิจกรรม
          </h1>
        </div>
        <div className="self-stretch flex flex-row items-start justify-between pt-[0rem] px-[0rem] pb-[0rem] box-border max-w-full gap-[1.25rem] z-[1] text-[1.25rem] text-black1 font-body mq1100:flex-wrap">
          <div className="w-[28.375rem] flex flex-col items-start justify-start gap-[1.5rem_0rem] min-w-[28.375rem] max-w-full shrink-0 mq750:min-w-full mq1100:flex-1">
            <div className="w-[24.688rem] flex flex-col items-start justify-start py-[0rem] pr-[2.25rem] pl-[0rem] box-border gap-[0.25rem_0rem] max-w-full">
              <div className="relative font-medium mq450:text-[1rem]">
                ชื่อกิจกรรม
              </div>
              <div className="self-stretch flex flex-row items-center justify-start pt-[0.625rem] px-[0.625rem] pb-[0.563rem] relative">
                <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-lg bg-gray box-border border-[1px] border-solid border-cmu-purple" />
                <input
                  className="w-[12.444rem] [border:none] [outline:none] inline-block font-body text-[0.75rem] bg-[transparent] h-[0.938rem] relative italic text-darkslateblue text-left z-[1]"
                  placeholder="กรอกชื่อกิจกรรม"
                  type="text"
                  name="activity_name"
                  value={formData.activity_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-[4.625rem] h-[0.938rem] relative hidden text-[0.75rem] text-red">
                <div className="absolute top-[0rem] left-[1.25rem]">
                  ห้ามเว้นว่าง
                </div>
                <img
                  className="absolute top-[0rem] left-[0rem] w-[0.938rem] h-[0.938rem] overflow-hidden"
                  alt=""
                  src="/materialsymbolswarning.svg"
                />
              </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-center max-w-full">
              <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem] max-w-full">
                <div className="relative font-medium mq450:text-[1rem]">
                  รายละเอียด
                </div>
                {/* description box */}
                <div className="self-stretch rounded-lg bg-white box-border overflow-hidden flex flex-col items-start justify-start py-[0.5rem] pr-[0.563rem] pl-[0.438rem] gap-[1.5rem_0rem] max-w-full text-[1rem] text-cmu-purple font-open-sans border-[1px] border-solid border-cmu-purple">
                  <div className="self-stretch flex flex-row items-start justify-start py-[1rem] pr-[1.813rem] pl-[1rem] box-border opacity-[0.6] min-h-[9.375rem] max-w-full">
                    <div className="h-[3.25rem] w-[24.563rem] relative leading-[1.5rem] inline-block max-w-full">
                      <input 
                        className="[margin-block-start:0] [margin-block-end:4px]"
                        type="text"
                        name="activity_description.description"
                        value={formData.activity_description.description}
                        onChange={handleInputChange}
                      >
                      </input>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
            {/* tags selection */}
            <div className="w-[14.25rem] flex flex-col items-start justify-start gap-[0.25rem]">
              <div className="relative font-medium mq450:text-[1rem]">
                ประเภทกิจกรรม
              </div>
                <Select 
                  defaultValue={[TagOptions[2], TagOptions[3]]}
                  isMulti
                  name="tags"
                  options={TagOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 2 }) }} // Set z-index for the dropdown menu
                />
              <label>
                {/* <select
                  name="tags"
                  multiple
                  value={formData.activity_description.tag}
                  onChange={handleDropdownChange}
                >
                  <option value="">Select tags</option>
                  <option value="วิชาการ">วิชาการ</option>
                  <option value="บันเทิง">บันเทิง</option>
                  <option value="สุขภาพ/กีฬา">สุขภาพ/กีฬา</option>
                  <option value="เข้าสังคม">เข้าสังคม</option>
                  <option value="จิตอาสา">จิตอาสา</option>
                  <option value="วิชาชีพ">วิชาชีพ</option>
                  <option value="เทคโนโลยี">เทคโนโลยี</option>
                  <option value="ศิลปะ/การแสดง">ศิลปะ/การแสดง</option>
                  <option value="กิจการนักศึกษา">กิจการนักศึกษา</option>
                  <option value="ศาสนา">ศาสนา</option>
                  <option value="เพิ่มทักษะ">เพิ่มทักษะ</option>
                  <option value="ท่องเที่ยว">ท่องเที่ยว</option>
                  <option value="ประจำปี">ประจำปี</option>
                  {/* Add more departments as needed */}
                {/* </select> */}
              </label>
            </div>
            {/* date selection */}
            <div className="w-[22.5rem] flex flex-row items-start justify-start gap-[0rem_1.25rem] max-w-full mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem] min-w-[6.875rem]">
                <div className="w-[10.063rem] relative font-medium inline-block mq450:text-[1rem]">
                  วันจัดกิจกรรม
                </div>
                <div className="self-stretch flex flex-row items-start justify-between pt-[0.688rem] px-[0.5rem] pb-[0.563rem] relative gap-[1.25rem] text-[0.75rem] text-cmu-purple">
                  <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
                  <div className="w-[6.194rem] relative font-light inline-block shrink-0 z-[1]">
                    <DatePicker selected={formData.activity_description.start_date} onChange={(date) => handleCalendarChange(date as Date, 'start_date')}/>
                  </div>
                  <img
                    className="h-[1.125rem] w-[1.063rem] relative rounded-lg overflow-hidden shrink-0 min-h-[1.125rem] z-[1]"
                    alt=""
                    src="/calendar-today.svg"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem] min-w-[6.875rem]">
                <div className="relative font-medium mq450:text-[1rem]">
                  วันสิ้นสุดกิจกรรม
                </div>
                <div className="self-stretch flex flex-row items-start justify-between pt-[0.688rem] px-[0.5rem] pb-[0.563rem] relative gap-[1.25rem] text-[0.75rem] text-cmu-purple">
                  <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
                  <div className="w-[6.281rem] relative font-light inline-block shrink-0 z-[1]">
                    <DatePicker selected={formData.activity_description.end_date} onChange={(date) => handleCalendarChange(date as Date, 'end_date')}/>
                  </div>
                  <img
                    className="h-[1.125rem] w-[0.969rem] relative rounded-lg overflow-hidden shrink-0 min-h-[1.125rem] z-[1]"
                    alt=""
                    src="/calendar-today-1.svg"
                  />
                </div>
              </div>
            </div>
            {/* location selection */}
            <div className="w-[21.188rem] flex flex-row items-end justify-start gap-[0rem_1.75rem] max-w-full mq450:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0rem] box-border gap-[0.313rem] min-w-[6.875rem]">
                <div className="relative font-medium mq450:text-[1rem]">
                  สถานที่
                </div>
                <div className="mb-[-0.062rem] self-stretch flex flex-row items-center justify-start pt-[0.625rem] px-[0.313rem] pb-[0.75rem] relative">
                  <div className="h-full w-full absolute !m-[0] top-[0.025rem] right-[0rem] bottom-[-0.025rem] left-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
                  <input
                    className="w-[6.888rem] [border:none] [outline:none] font-light font-body text-[0.75rem] bg-[transparent] h-[1.05rem] relative text-cmu-purple text-left inline-block z-[1]"
                    placeholder="ชื่อสถานที่"
                    type="text"
                    name="activity_description.location"
                    value={formData.activity_description.location}
                    onChange={handleInputChange}
                    style={{position: 'relative', zIndex: 1}}
                  />
                </div>
              </div>
              {/* department selection */}
              <div className="flex flex-col items-start justify-start gap-[0.25rem]">
                <div className="relative font-medium whitespace-nowrap mq450:text-[1rem]">
                  คณะของผู้เข้าร่วม
                </div>
                  <Select 
                    defaultValue={[DepartmentOptions[0]]}
                    isMulti
                    name="department"
                    options={DepartmentOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={{ menu: (provided) => ({ ...provided, zIndex: 0 }) }} // Set z-index for the dropdown menu
                  />
                {/* <div className="w-[7.875rem] flex flex-row items-start justify-between py-[0.625rem] pr-[0.563rem] pl-[0.375rem] box-border relative whitespace-nowrap gap-[1.25rem] text-[0.75rem] text-cmu-purple">
                  <div className="h-full w-full absolute !m-[0] top-[-0.006rem] right-[0rem] bottom-[0.006rem] left-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
                  <div className="relative font-light inline-block shrink-0 z-[1]">{`Select `}</div>
                </div> */}
              </div>
            </div>
          </div>
          {/* upload */}
          <div className="mb-[-0.062rem] h-[44.375rem] w-[28.5rem] flex flex-col items-start justify-start py-[0rem] pr-[0.063rem] pl-[0rem] box-border gap-[1.5rem_0rem] min-w-[28.5rem] max-w-full mq750:min-w-full mq1100:flex-1 mq1100:pr-[0rem] mq1100:box-border">
            <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
              <div className="flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[0.438rem]">
                <div className="relative [text-decoration:underline] font-light mq450:text-[1rem]">
                  Upload event image
                </div>
              </div>
              <img
                className="self-stretch flex-1 relative rounded-lg max-w-full overflow-hidden max-h-full object-cover"
                loading="lazy"
                alt=""
                src="/rectangle-56@2x.png"
              />
              <div className="flex flex-row items-start justify-start gap-[0rem_0.938rem]">
                <img
                  className="h-[3.069rem] w-[5.006rem] relative rounded-lg object-cover min-h-[3.063rem]"
                  loading="lazy"
                  alt=""
                  src="/rectangle-60@2x.png"
                />
                <img
                  className="h-[3.069rem] w-[5.006rem] relative rounded-lg object-cover min-h-[3.063rem]"
                  loading="lazy"
                  alt=""
                  src="/rectangle-61@2x.png"
                />
                <img
                  className="h-[3.069rem] w-[5.006rem] relative rounded-lg object-cover min-h-[3.063rem]"
                  loading="lazy"
                  alt=""
                  src="/rectangle-62@2x.png"
                />
              </div>
              <div className="self-stretch flex flex-row items-start justify-end text-right text-[0.875rem] text-cmu-purple">
                <div className="w-[10.438rem] flex flex-row items-center justify-start py-[0.375rem] px-[0rem] box-border relative gap-[2.063rem]">
                  <div className="h-full w-[5.938rem] absolute !m-[0] top-[0rem] right-[-0.019rem] bottom-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
                  <div className="w-[3.313rem] relative font-light inline-block shrink-0">
                    img.jpg
                  </div>
                  <div className="w-[4.281rem] relative text-[0.625rem] font-light text-left inline-block shrink-0 z-[1]">
                    Choose file
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[17.813rem] flex flex-col items-start justify-start gap-[1.063rem_0rem]">
              <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0rem] gap-[0.313rem]">
                <div className="relative font-medium mq450:text-[1rem]">
                  อีเมล์ติดต่อ
                </div>
                <div className="self-stretch flex flex-row items-center justify-start pt-[0.625rem] px-[0.875rem] pb-[0.75rem] relative">
                  <div className="h-full w-full absolute top-0 right-[0rem] bottom-0 left-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
                  <input 
                    placeholder="example@gmail.com"
                    type="text" 
                    name="activity_contact.email" 
                    value={formData.activity_contact.email} 
                    onChange={handleInputChange} 
                    style={{position: 'relative', zIndex: 1}}
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                <div className="relative font-medium mq450:text-[1rem]">
                  ช่องทางอื่นๆ
                </div>
                <div className="self-stretch flex flex-row items-center justify-start pt-[0.625rem] px-[0.875rem] pb-[0.75rem] relative">
                  <div className="h-full w-full absolute top-0 right-[0rem] bottom-0 left-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
                  <input 
                    placeholder="Line, Facebook, หรืออื่นๆ"
                    type="text" 
                    name="activity_contact.other" 
                    value={formData.activity_contact.other} 
                    onChange={handleInputChange} 
                    style={{position: 'relative', zIndex: 1}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.375rem] box-border gap-[2.313rem_0rem] max-w-full shrink-0 mq750:gap-[2.313rem_0rem]">
        <div className="self-stretch bg-lavender flex flex-row items-center justify-start gap-[0rem_1rem] max-w-full">
          <div className="h-[5.5rem] w-[0.438rem] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
          <h1 className="m-0 w-[31.063rem] relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block max-w-[calc(100%_-_23px)] mq750:text-[2.5rem] mq750:leading-[2.75rem] mq450:text-[1.875rem] mq450:leading-[2.063rem]">
            กรอกข้อมูลการรับสมัคร
          </h1>
        </div>
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
        <div className="self-stretch flex flex-col items-start justify-start gap-[2.125rem_0rem] max-w-full text-[1.25rem] text-black1 font-body mq750:gap-[2.125rem_0rem]">
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[0rem_2.5rem] max-w-full mq750:gap-[0rem_2.5rem]">
            {/* <GroupComponent1
              prop="ชื่อตำแหน่งที่ 1"
              placeholder="สตาฟคุมแถว"
              numberPlaceholder="200"
              placeholder1="คอยคุมแถวขณะเดินขบวน"
            />
            <GroupComponent1
              prop="ชื่อตำแหน่งที่ 2"
              placeholder="สตาฟพยาบาล"
              numberPlaceholder="50"
              placeholder1="ดูแลผู้บาดเจ็บ"
              propWidth="7.5rem"
              propWidth1="12.444rem"
              propWidth2="100%"
              propPadding="1rem 0.813rem"
            /> */}
          </div>
          <div className="self-stretch flex flex-row items-start justify-start gap-[0rem_2.5rem] max-w-full text-[2rem] text-cmu-purple mq750:gap-[0rem_2.5rem] mq1100:flex-wrap">
            {/* <GroupComponent1
              prop="ชื่อตำแหน่งที่ 1"
              placeholder="สตาฟจราจร"
              numberPlaceholder="100"
              placeholder1="ควบคุมการจราจรตลอดขบวน"
              propWidth="7.313rem"
              propWidth1="12.444rem"
              propWidth2="100%"
              propPadding="1rem 0.875rem"
            /> */}
            <div className="flex-[0.9842] flex flex-row items-center justify-center pt-[7.563rem] pb-[7.625rem] pr-[1.25rem] pl-[1.313rem] box-border relative min-w-[21.938rem] max-w-full z-[1] mq750:min-w-full mq1100:flex-1">
              <div className="h-full w-full absolute !m-[0] top-[0rem] right-[-0.25rem] bottom-[-0.25rem] left-[0rem] bg-white box-border border-[2px] border-dashed border-cmu-purple" />
              <div className="w-[5.688rem] flex flex-row items-center justify-start gap-[0rem_0.375rem] z-[1]">
                <img
                  className="h-[2rem] w-[2rem] relative"
                  loading="lazy"
                  alt=""
                  src="/vector.svg"
                />
                <h2 className="m-0 flex-1 relative text-inherit font-medium font-inherit mq750:text-[1.625rem] mq450:text-[1.188rem]">
                  เพิ่ม
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[2.813rem] flex flex-row items-start justify-end max-w-full">
        <div className="h-[2.813rem] w-[26.875rem] flex flex-row items-start justify-start gap-[1.375rem] max-w-full z-[1]">
          <div className="h-[2.813rem] flex-1 flex flex-col items-start justify-start py-[0rem] pr-[0.438rem] pl-[0rem] box-border">
            <button className="cursor-pointer [border:none] pt-[0.813rem] px-[2.5rem] pb-[0.688rem] bg-[transparent] self-stretch h-[2.813rem] flex flex-row items-center justify-center box-border relative">
              <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0.063rem] bottom-[0rem] left-[0rem] bg-button-red" />
              <div className="flex-1 relative text-[1rem] font-medium font-body text-soft-grey text-left z-[1]">
                ยกเลิก
              </div>
            </button>
          </div>
          <button className="cursor-pointer [border:none] pt-[0.688rem] px-[0.688rem] pb-[0.813rem] bg-[transparent] h-[2.813rem] flex-[0.8734] flex flex-row items-center justify-center box-border relative">
            <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0.025rem] bottom-[0rem] left-[-0.025rem] [background:linear-gradient(#faab1d,_#faab1d),_#fff]" />
            <div className="flex-1 relative text-[1rem] font-medium font-body text-soft-grey text-left z-[1]">
              บันทึกฉบับร่าง
            </div>
          </button>
          <button className="cursor-pointer [border:none] pt-[0.813rem] pb-[0.688rem] pr-[3rem] pl-[2.438rem] bg-[transparent] h-[2.813rem] flex-[0.3249] flex flex-row items-center justify-start box-border relative">
            <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0.031rem] bottom-[0rem] left-[-0.031rem] bg-button-green" />
            <div className="flex-1 relative text-[1rem] font-medium font-body text-soft-grey text-left z-[1]">
              ต่อไป
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Create2;
