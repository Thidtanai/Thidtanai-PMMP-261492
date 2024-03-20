import { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import ImageUploadForm from "./ImageUploadForm";
import AddRoleSection from "./AddRoleSection";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import convertToBase64 from "./ConvertImage";

interface TagProp {
    value: string;
    label: string;
}
interface DepartmentProp {
    value: string;
    label: string;
}
interface RoleData {
    role: string;
    count: string; //might convert to number later
    description: string;
}
interface ActivityRecruit {
    recruit_role: string;
    recruit_count: number;
    recruit_description: string;
    recruit_member: [
        {
            member_id: string;
            member_status: string;
        }
    ];
}
const TagOptions = [
    { value: "วิชาชีพ", label: "วิชาชีพ" },
    { value: "กิจการนักศึกษา", label: "กิจการนักศึกษา" },
    { value: "เพิ่มทักษะ", label: "เพิ่มทักษะ" },
    { value: "เทคโนโลยี", label: "เทคโนโลยี" },
    { value: "บันเทิง", label: "บันเทิง" },
    { value: "ศิลปะ", label: "ศิลปะ" },
    { value: "การแสดง", label: "การแสดง" },
    { value: "ศาสนา", label: "ศาสนา" },
    { value: "เทศกาล", label: "เทศกาล" },
    { value: "สุขภาพ", label: "สุขภาพ" },
    { value: "กีฬา", label: "กีฬา" },
    { value: "เข้าสังคม", label: "เข้าสังคม" },
    { value: "จิตอาสา", label: "จิตอาสา" },
    { value: "ท่องเที่ยว", label: "ท่องเที่ยว" },
];
const DepartmentOptions = [
    { value: "ทุกคณะ", label: "ทุกคณะ" },
    { value: "คณะมนุษยศาสตร์", label: "คณะมนุษยศาสตร์" },
    { value: "คณะศึกษาศาสตร์", label: "คณะศึกษาศาสตร์" },
    { value: "คณะวิจิตรศิลป์", label: "คณะวิจิตรศิลป์" },
    { value: "คณะสังคมศาสตร์", label: "คณะสังคมศาสตร์" },
    { value: "คณะวิทยาศาสตร์", label: "คณะวิทยาศาสตร์" },
    { value: "คณะวิศวกรรมศาสตร์", label: "คณะวิศวกรรมศาสตร์" },
    { value: "คณะแพทยศาสตร์", label: "คณะแพทยศาสตร์" },
    { value: "คณะเกษตรศาสตร์", label: "คณะเกษตรศาสตร์" },
    { value: "คณะทันตแพทยศาสตร์", label: "คณะทันตแพทยศาสตร์" },
    { value: "คณะเภสัชศาสตร์", label: "คณะเภสัชศาสตร์" },
    { value: "คณะเทคนิคการแพทย์", label: "คณะเทคนิคการแพทย์" },
    { value: "คณะเภสัชศาสตร์", label: "คณะเภสัชศาสตร์" },
    { value: "คณะทันตแพทยศาสตร์", label: "คณะทันตแพทยศาสตร์" },
    { value: "คณะพยาบาลศาสตร์", label: "คณะพยาบาลศาสตร์" },
    { value: "คณะอุตสาหกรรมเกษตร", label: "คณะอุตสาหกรรมเกษตร" },
    { value: "คณะสัตวแพทยศาสตร์", label: "คณะสัตวแพทยศาสตร์" },
    { value: "คณะบริหารธุรกิจ", label: "คณะบริหารธุรกิจ" },
    { value: "คณะเศรษฐศาสตร์", label: "คณะเศรษฐศาสตร์" },
    { value: "คณะสถาปัตยกรรมศาสตร์", label: "คณะสถาปัตยกรรมศาสตร์" },
    { value: "คณะการสื่อสารมวลชน", label: "คณะการสื่อสารมวลชน" },
    {
        value: "คณะรัฐศาสตร์และรัฐประศาสนศาสตร์",
        label: "คณะรัฐศาสตร์และรัฐประศาสนศาสตร์",
    },
    { value: "คณะนิติศาสตร์", label: "คณะนิติศาสตร์" },
    {
        value: "วิทยาลัยศิลปะ สื่อ และเทคโนโลยี",
        label: "วิทยาลัยศิลปะ สื่อ และเทคโนโลยี",
    },
    { value: "คณะสาธารณสุขศาสตร์", label: "คณะสาธารณสุขศาสตร์" },
    {
        value: "วิทยาลัยการศึกษาและการจัดการทางทะเล",
        label: "วิทยาลัยการศึกษาและการจัดการทางทะเล",
    },
    {
        value: "วิทยาลัยนานาชาตินวัตกรรมดิจิทัล",
        label: "วิทยาลัยนานาชาตินวัตกรรมดิจิทัล",
    },
    { value: "สถาบันนโยบายสาธารณะ", label: "สถาบันนโยบายสาธารณะ" },
    { value: "สถาบันวิศวกรรมชีวการแพทย์", label: "สถาบันวิศวกรรมชีวการแพทย์" },
    {
        value: "สถาบันวิจัยวิทยาศาสตร์กีฬา",
        label: "สถาบันวิจัยวิทยาศาสตร์สุขภาพ",
    },
    { value: "บัณฑิตวิทยาลัย", label: "บัณฑิตวิทยาลัย" },
];

interface FormProps {
    onSubmit: (formData: FormData) => Promise<void>;
}

interface Activity {
    _id: string;
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
    membered_user: string[];
    activity_recruit: [
        {
            recruit_role: string;
            recruit_count: number;
            recruit_description?: string;
            recruit_member: string[];
        }
    ];
}

interface Recruit {
    recruit_role: string;
    recruit_count: number;
    recruit_description?: string;
    [key: string]: string | number | undefined; //index signature
}

interface MyToken {
    id: string;
    name: string;
    group: string;
}

export interface FormData {
    activity_owner: string;
    activity_name: string;
    activity_description: {
        description?: string;
        tag: string[];
        start_date: Date;
        end_date: Date;
        location?: string;
        department?: string[];
    };
    activity_image: string[];
    activity_contact: {
        email?: string;
        other?: string;
    };
    activity_recruit: {
        recruit_role: string;
        recruit_count: number;
        recruit_description?: string;
    }[];
}
const CreateActDesc: React.FC<FormProps> = ({ onSubmit }) => {
    const initialFormData: FormData = {
        activity_owner: "",
        activity_name: "",
        activity_description: {
            description: "",
            tag: [],
            start_date: new Date(),
            end_date: new Date(),
            location: "",
            department: [],
        },
        activity_image: [],
        activity_contact: {
            email: "",
            other: "",
        },
        activity_recruit: [],
    };

    const initialRecruitData = {
        recruit_role: "",
        recruit_count: 0,
        recruit_description: "",
    };

    //state to hold form data
    const [formData, setFormData] = useState<FormData>(initialFormData);
    //state to hold base64 encoded images
    const [base64Images, setBase64Images] = useState<string[]>([]);
    //state to manage tags minimum and maximum
    const [selectedOptions, setSelectedOptions] = useState<TagProp[]>([]);
    //state to track the number of Role components
    const [roleCount, setRoleCount] = useState<number>(0);

    //state to track users token
    const [havetoken, setHavetoken] = useState<MyToken>();
    const [activities, setActivities] = useState<Activity[]>([]);

    // In CreateActDesc
    const updateRoleData = (
        index: number,
        roleData: {
            recruit_role: string;
            recruit_count: number;
            recruit_description: string;
        }
    ) => {
        setFormData((currentFormData) => {
            // Copy current roles
            const updatedRoles = [...currentFormData.activity_recruit];
            // Update the specific role
            updatedRoles[index] = { ...updatedRoles[index], ...roleData };
            // Return new formData with the updated roles
            return { ...currentFormData, activity_recruit: updatedRoles };
        });
    };

    const addInitialRecruitData = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            activity_recruit: [...prevFormData.activity_recruit, initialRecruitData],
        }));
    };

    //function to add another Role components
    const addRole = () => {
        if (initialFormData.activity_recruit === undefined || initialFormData.activity_recruit.length == 0) {
            addInitialRecruitData();
        }
        setRoleCount((prevCount) => prevCount + 1);
    };

    const handleBase64ImagesChange = (newBase64Images: string[]) => {
        setBase64Images((prevImages) => [...prevImages, ...newBase64Images]);
        //update formData to include all base64 images in the activity_image field
        setFormData((prevFormData) => {
            // Check if there is already an activity_image field and it is an array
            const existingImages = Array.isArray(prevFormData.activity_image)
                ? prevFormData.activity_image
                : [];
            // Append new images to the existing array of images
            const updatedImages = [...existingImages, ...newBase64Images];
            return {
                ...prevFormData,
                activity_image: updatedImages, // Now activity_image is an array of all images
            };
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        if (name === "activity_name") {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else if (name.startsWith("activity_description.")) {
            const descriptionField = name.split(".")[1];
            setFormData({
                ...formData,
                activity_description: {
                    ...formData.activity_description,
                    [descriptionField]: value,
                },
            });
        } else if (name.startsWith("activity_contact.")) {
            const contactField = name.split(".")[1];
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

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        const dateValue = value ? new Date(value) : new Date(); //convert the input string to a Date object

        setFormData((prevFormData) => ({
            ...prevFormData,
            activity_description: {
                ...prevFormData.activity_description,
                [id]: dateValue,
            },
        }));
    };

    const handleTagsChange = (selectedOptions: MultiValue<TagProp>) => {
        //check if the number of selected options is within the range [1, 3]
        if (selectedOptions.length >= 1 && selectedOptions.length <= 3) {
            setSelectedOptions(selectedOptions as TagProp[]);
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            activity_description: {
                ...prevFormData.activity_description,
                tag: selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [],
            },
        }));
    };

    const handleDepartmentChange = (
        selectedOption: MultiValue<DepartmentProp>
    ) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            activity_description: {
                ...prevFormData.activity_description,
                department: selectedOption
                    ? selectedOption.map((option) => option.value)
                    : [],
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // todo: other way to handle undefined instead of defaultOwnerId
        setFormData({
            ...formData,
            activity_owner: havetoken?.id ?? "defaultOwnerId",
        });
        onSubmit(formData);
        console.log("submitting form", formData);

        //resetForm();
    };

    const handleResetForm = (event: React.FormEvent<HTMLButtonElement>) => {
        setFormData(initialFormData);
        setRoleCount(0);
    };

    //get user token
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    // Redirect to login page if token is not available
                    const decodedTk: MyToken = jwtDecode(token);
                    console.log(decodedTk);
                    setHavetoken(decodedTk);
                    const response = await axios.get("http://localhost:4000/activity", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setActivities(response.data);
                    if (decodedTk) {
                        setFormData((prevFormData) => ({
                            ...prevFormData,
                            activity_owner: decodedTk.id ?? "defaultOwnerId",
                        }));
                        console.log("problem here");
                    }
                } else {
                    const response = await axios.get("http://localhost:4000/activity");
                    setActivities(response.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle error
            }
        };

        fetchData();
    }, []);
    return (
        <form onSubmit={handleSubmit}>
            <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] self-stretch flex flex-row items-start justify-start py-[1rem] pr-[1rem] pl-[1rem] box-border max-w-full shrink-0 text-left text-[2rem] text-black font-heading-2 -mt-8">
                <div className="flex-1 flex flex-col items-end justify-start gap-[3.25rem_0rem] max-w-full mq750:gap-[1.625rem_0rem]">
                    <div className="self-stretch bg-lavender flex flex-row items-center justify-start gap-[0rem_1rem] max-w-full z-[1]">
                        <div className="h-[5.5rem] w-[0.438rem] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
                        <h1 className="m-0 w-[25.875rem] relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block max-w-[calc(100%_-_23px)] mq450:text-[1.5rem] mq450:leading-[1.75rem] mq1050:text-[2rem] mq1050:leading-[2.25rem]">
                            กรอกข้อมูลกิจกรรม
                        </h1>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[1.25rem] text-[1.25rem] text-black1 font-body mq1050:flex-wrap -mt-8">
                        <div className="w-[28.375rem] flex flex-col items-start justify-start gap-[1.188rem_0rem] min-w-[28.375rem] max-w-full mq750:min-w-full mq1050:flex-1">
                            <div className="w-[22.438rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.313rem] box-border gap-[0.25rem_0rem] max-w-full">
                                <div className="relative font-medium z-[1] mq450:text-[1rem]">
                                    ชื่อกิจกรรม
                                </div>
                                <input
                                    className="self-stretch rounded-lg bg-white box-border flex items-center justify-center h-[2.4rem] text-cmu-purple z-[1] border-[1px] border-solid border-cmu-purple w-full"
                                    placeholder="ชื่อกิจกรรม..."
                                    name="activity_name"
                                    type="text"
                                    value={formData.activity_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.313rem] gap-[0.25rem_0rem]">
                                <div className="relative font-medium z-[1] mq450:text-[1rem]">
                                    รายละเอียด
                                </div>
                                <textarea
                                    className="bg-white h-[14.375rem] w-auto [outline:none] self-stretch rounded-lg box-border overflow-hidden shrink-0 flex flex-row items-center justify-center p-[1.5rem] text-[1rem] text-cmu-purple z-[1] border-[1px] border-solid border-cmu-purple"
                                    placeholder={`รายละเอียดของกิจกรรม...`}
                                    name="activity_description.description"
                                    value={formData.activity_description.description}
                                    onChange={handleInputChange}
                                    rows={12}
                                    cols={23}
                                />
                            </div>
                            <div className="w-[22.563rem] flex flex-col items-start justify-start gap-[0.25rem_0rem] max-w-full">
                                <div className="relative font-medium z-[1] mq450:text-[1rem]">
                                    ประเภทกิจกรรม
                                </div>
                                {/* Tag Selection */}
                                <Select
                                    isMulti
                                    name="tags"
                                    options={TagOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    value={selectedOptions}
                                    onChange={handleTagsChange}
                                    styles={{
                                        menu: (provided) => ({
                                            ...provided,
                                            container: "#6b69b1",
                                            zIndex: 2,
                                        }),
                                        control: (provided) => ({
                                            ...provided,
                                            borderColor: "cmu-purple",
                                            height: "3rem",
                                            width: "29rem",
                                        }),
                                        // valueContainer: (provided) => ({
                                        //     ...provided,
                                        //     flexWrap: 'wrap',//prevent wrapping
                                        //      //enable horizontal scrolling
                                        //     '& > div': {
                                        //         display: 'inline-grid', //display options inline
                                        //     }
                                        // })
                                    }} // Set z-index for the dropdown menu
                                />
                            </div>
                            <div className="w-[22.5rem] flex flex-row items-start justify-start gap-[0rem_1.25rem] max-w-full mq450:flex-wrap">
                                <div className="flex-1 flex flex-col items-start justify-start gap-[1.563rem_0rem] min-w-[6.875rem]">
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                                        <div className="w-[10.063rem] relative font-medium inline-block z-[1] mq450:text-[1rem]">
                                            วันจัดกิจกรรม
                                        </div>
                                        <div className="self-stretch h-[2.4rem] rounded-lg box-border flex flex-row items-center justify-start pt-[0.625rem] pb-[0.75rem] z-[1] border-none">
                                            <input
                                                className="shadow appearance-none border-cmu-purple rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="start_date"
                                                type="date"
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem_0rem]">
                                        <div className="relative font-medium z-[1] mq450:text-[1rem]">
                                            สถานที่
                                        </div>
                                        <input
                                            className="self-stretch rounded-lg bg-white box-border flex items-center justify-center h-[2.4rem] text-cmu-purple z-[1] border-[1px] border-solid border-cmu-purple w-full"
                                            placeholder="สถานที่..."
                                            name="activity_description.location"
                                            type="text"
                                            value={formData.activity_description.location}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[1.563rem_0rem] min-w-[6.875rem]">
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
                                        <div className="w-[10.063rem] relative font-medium inline-block z-[1] mq450:text-[1rem]">
                                            วันสิ้นสุดกิจกรรม
                                        </div>
                                        <div className="self-stretch h-[2.4rem] rounded-lg box-border flex flex-row items-center justify-start pt-[0.625rem] pb-[0.75rem] z-[1] border-[1px] border-none">
                                            <input
                                                className="shadow appearance-none border-cmu-purple rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="end_date"
                                                type="date"
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem_0rem]">
                                        <div className="relative font-medium z-[1] mq450:text-[1rem]">
                                            คณะผู้เข้าร่วม
                                        </div>
                                        {/* department selection dropdown */}
                                        <Select
                                            isMulti
                                            name="department"
                                            options={DepartmentOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={handleDepartmentChange}
                                            styles={{
                                                menu: (provided) => ({ ...provided, zIndex: 10 }),
                                                control: (provided) => ({
                                                    ...provided,
                                                    borderColor: "cmu-purple",
                                                    minHeight: "initial",
                                                    height: "auto",
                                                    width: "15rem",
                                                }),
                                            }} // Set z-index for the dropdown menu
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-1 ml-8 w-[28.438rem] flex flex-col items-start justify-start gap-[2rem] min-w-[28.438rem] max-w-full mq750:min-w-full mq450:gap-[4rem_0rem] mq1050:flex-1">
                            <div className="self-stretch flex flex-col items-start justify-start gap-[1.125rem_0rem]">
                                <div className="relative font-light z-[1] mq450:text-[1rem]">
                                    อัพโหลดรูปภาพ
                                </div>
                                <ImageUploadForm
                                    onBase64ImagesChange={handleBase64ImagesChange}
                                />
                            </div>
                            <div className="w-[17.813rem] mt-3 flex flex-col items-start justify-start gap-[1rem_0rem]">
                                <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem_0rem]">
                                    <div className="relative font-medium z-[1] mq450:text-[1rem]">
                                        อีเมล์ติดต่อ
                                    </div>
                                    <input
                                        className="self-stretch rounded-lg bg-white box-border flex items-center justify-center h-[2.4rem] text-cmu-purple z-[1] border-[1px] border-solid border-cmu-purple w-full"
                                        placeholder="Email..."
                                        name="activity_contact.email"
                                        type="text"
                                        value={formData.activity_contact.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem_0rem]">
                                    <div className="relative font-medium z-[1] mq450:text-[1rem]">
                                        ช่องทางอื่นๆ
                                    </div>
                                    <input
                                        className="self-stretch rounded-lg bg-white box-border flex items-center justify-center h-[2.4rem] text-cmu-purple z-[1] border-[1px] border-solid border-cmu-purple w-full"
                                        placeholder="เบอร์โทรศัพท์, Facebook, Line, อื่นๆ..."
                                        name="activity_contact.other"
                                        value={formData.activity_contact.other}
                                        onChange={handleInputChange}
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <AddRoleSection
                        roleCount={roleCount}
                        updateRoleData={updateRoleData}
                    />
                    <div className="self-stretch flex flex-row items-start justify-end">
                        <div className="flex flex-row items-start justify-start py-[0rem] pr-[0.063rem] pl-[0rem] gap-[0rem_0.625rem]">
                            <button
                                className="cursor-pointer border-none pt-[0.75rem] pb-[0.688rem] px-[0.6rem] bg-red-500 flex flex-row items-center justify-center z-[1] hover:bg-rosybrown"
                                type="reset"
                                onClick={handleResetForm}
                            >
                                <div className="relative text-[1rem] font-medium font-body text-white bg-red-500 text-left z-[1]">
                                    ลบข้อมูลทั้งหมด
                                </div>
                            </button>
                            <button
                                className="cursor-pointer border-none pt-[0.75rem] px-[0.6rem] pb-[0.688rem] bg-purple-500 flex flex-row items-center justify-center z-[1] hover:bg-mediumorchid"
                                type="button"
                            >
                                <div
                                    onClick={addRole}
                                    className="relative text-[1rem] font-medium font-body text-white bg-purple-500 text-left z-[1]"
                                >
                                    เพิ่มตำแหน่ง
                                </div>
                            </button>
                            <button
                                className="cursor-pointer border-none pt-[0.75rem] px-[0.6rem] pb-[0.688rem] bg-green-500 flex flex-row items-center justify-center z-[1] hover:bg-seagreen"
                                type="submit"
                            >
                                <div className="relative text-[1rem] font-medium font-body text-white bg-green-500 text-left z-[1]">
                                    ประกาศกิจกรรม
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CreateActDesc;
