import React, { FunctionComponent, useState } from "react";
import GroupComponent1 from "./GroupComponent1";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import ImageUploadForm from "./ImageUploadForm";

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
    activity_image: FileList;
    activity_contact: {
        email?: string;
        other?: string;
    };
    activity_recruit: Recruit[];
}

const TagOptions = [
    { value: 'วิชาชีพ', label: 'วิชาชีพ' },
    { value: 'กิจการนักศึกษา', label: 'กิจการนักศึกษา' },
    { value: 'เพิ่มทักษะ', label: 'เพิ่มทักษะ' },
    { value: 'เทคโนโลยี', label: 'เทคโนโลยี' },
    { value: 'บันเทิง', label: 'บันเทิง' },
    { value: 'ศิลปะ', label: 'ศิลปะ' },
    { value: 'การแสดง', label: 'การแสดง' },
    { value: 'ศาสนา', label: 'ศาสนา' },
    { value: 'เทศกาล', label: 'เทศกาล' },
    { value: 'สุขภาพ', label: 'สุขภาพ' },
    { value: 'กีฬา', label: 'กีฬา' },
    { value: 'เข้าสังคม', label: 'เข้าสังคม' },
    { value: 'จิตอาสา', label: 'จิตอาสา' },
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
    { value: 'สถาบันวิจัยวิทยาศาสตร์กีฬา', label: 'สถาบันวิจัยวิทยาศาสตร์สุขภาพ' },
    { value: 'บัณฑิตวิทยาลัย', label: 'บัณฑิตวิทยาลัย' },
]



const Create3: React.FC<FormProps> = ({ onSubmit }) => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        resetForm();
    };

    const resetForm = () => {
        setFormData(initialFormData)
    }

    const [formData, setFormData] = useState<FormData>(initialFormData);

    return (
        <section onSubmit={handleSubmit}>
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <h1 className="text-xl font-semibold mb-2">ฟอร์มข้อมูลกิจกรรม</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                                ชื่อกิจกรรม
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventName" type="text" placeholder="University Day - 2020" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDescription">
                                รายละเอียด
                            </label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="eventDescription" placeholder="รายละเอียด..."></textarea>
                            
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                                    วันเริ่มกิจกรรม (วันที่)
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" />
                            </div>
                            <div className="w-1/2 ml-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                                    วันเสร็จกิจกรรม (วันที่)
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventLocation">
                                สถานที่
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventLocation" type="text" placeholder="ชื่อสถานที่" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventOrganizer">
                                คณะของผู้เข้าร่วม
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventOrganizer" type="text" placeholder="ชมรมนักศึกษา" />
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <h2 className="text-xl font-semibold mb-2">ช่องทางติดต่อ</h2>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="detailContact" type="text" placeholder="Email" />
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3" id="detailPhone" type="text" placeholder="อื่นๆ เช่น FB, Line" />
                        </div>
                        <div className="w-1/2 ml-2">
                            <h2 className="text-xl font-semibold mb-2">Upload event image</h2>
                            {/* <img className="w-full h-48 object-cover mb-3" src="https://placehold.co/600x400" alt="Event image showing a group of people in traditional clothing at a university event." />
                            <div className="flex justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    อัพโหลด
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    ลบ
                                </button>
                            </div> */}
                            <ImageUploadForm />
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-xl font-semibold mb-2">ฟอร์มข้อมูลการรับสมัคร</h1>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration1">
                                ชื่อหน่วยงาน 1
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="registration1" type="text" placeholder="ชื่อหน่วยงาน" />
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail1">
                                    รายละเอียด
                                </label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="detail1" placeholder="คุณสมบัติของผู้สมัคร"></textarea>
                                <div className="flex gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-bold"></i>
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-italic"></i>
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-underline"></i>
                                    </button>
                                    {/* Repeat for other buttons */}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 ml-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration2">
                                ชื่อหน่วยงาน 2
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="registration2" type="text" placeholder="ชื่อหน่วยงาน" />
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail2">
                                    รายละเอียด
                                </label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="detail2" placeholder="คุณสมบัติของผู้สมัคร"></textarea>
                                <div className="flex gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-bold"></i>
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-italic"></i>
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-underline"></i>
                                    </button>
                                    {/* Repeat for other buttons */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="registration3">
                                ชื่อหน่วยงาน 1
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="registration3" type="text" placeholder="ชื่อหน่วยงาน" />
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detail3">
                                    รายละเอียด
                                </label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="detail3" placeholder="คุณสมบัติของผู้สมัคร"></textarea>
                                <div className="flex gap-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-bold"></i>
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-italic"></i>
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        <i className="fas fa-underline"></i>
                                    </button>
                                    {/* Repeat for other buttons */}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="flex justify-center items-center border-2 border-dashed rounded h-48">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    + เพิ่ม
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="button">
                            บันทึก
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" type="button">
                            แก้ไขข้อมูลเพิ่มเติม
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            ยกเลิก
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Create3