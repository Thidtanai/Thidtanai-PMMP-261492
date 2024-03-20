import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  user_email: string;
  user_password: string;
  user_repeat_password: string;
  user_description: {
    first_name: string;
    last_name: string;
    department: string;
    gender: string;
  };
  user_type: string;
  user_type_student: {
    education_level: string;
    study_plan: string;
    year: number;
  };
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    user_email: "",
    user_password: "",
    user_repeat_password: "",
    user_description: {
      first_name: "",
      last_name: "",
      department: "",
      gender: "",
    },
    user_type: "student",
    user_type_student: {
      education_level: "ปริญญาตรี",
      study_plan: "",
      year: 0,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const [firstLevel, secondLevel] = name.split(".");

    if (secondLevel) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [firstLevel]: {
          ...(prevFormData[firstLevel as keyof FormData] as Record<
            string,
            string
          >),
          [secondLevel]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (formData.user_password !== formData.user_repeat_password) {
        throw "Password not match!!";
      }
      // Omit user_repeat_password before posting to the database
      const cleanedFormData: Omit<FormData, "user_repeat_password"> = {
        ...formData,
      };

      const res = await axios.post(
        "http://localhost:4000/user/register",
        cleanedFormData
      );
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log("Register error: ", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response &&
          axiosError.response.data &&
          (axiosError.response.data as any).message ===
            "Email is already in use"
        ) {
          alert("อีเมลนี้ถูกใช้แล้ว");
        } else {
          alert("ลงทะเบียนไม่สำเร็จ");
        }
      } else {
        // Handle non-Axios errors
        alert("ลงทะเบียนไม่สำเร็จ");
      }
    }
  };

  return (
    <div>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative p-8 bg-white rounded-lg border-solid border-2 border-cmu-purple drop-shadow-xl shadow-lg shadow-cmu-purple/20">
            <div className="h-20 flex flex-row justify-start w-full overflow-hidden">
              <p className="w-full m-auto text-center font-bold text-cmu-purple ml-4 text-21xl mq450:text-5xl mq750:text-11xl">
                ลงทะเบียน
              </p>
            </div>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="user_email"
                  id="floating_email"
                  value={formData.user_email}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  อีเมล
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="user_password"
                  id="floating_password"
                  value={formData.user_password}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  รหัสผ่าน
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="password"
                  name="user_repeat_password"
                  id="floating_repeat_password"
                  value={formData.user_repeat_password}
                  onChange={handleInputChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_repeat_password"
                  className={`peer-focus:font-medium absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 ${
                    formData.user_password === formData.user_repeat_password
                      ? ""
                      : "text-red-500" // You can add a red color for incorrect confirmation
                  }`}
                >
                  {formData.user_password === formData.user_repeat_password
                    ? "ยืนยันรหัสผ่าน"
                    : "ยืนยันรหัสผ่านไม่ถูกต้อง"}
                </label>
              </div>

              <div className="grid grid-cols-2 gap-6 mq450:grid-cols mq450:gap-2">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="user_description.first_name"
                    id="floating_first_name"
                    value={formData.user_description.first_name}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    ชื่อจริง
                  </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="user_description.last_name"
                    id="floating_last_name"
                    value={formData.user_description.last_name}
                    onChange={handleInputChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_last_name"
                    className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    นามสกุล
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mq450:grid-cols mq450:gap-2">
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="department"
                    name="user_description.department"
                    value={formData.user_description.department}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="" disabled selected hidden>
                      คณะ
                    </option>
                    <option>คณะเกษตรศาสตร์</option>
                    {/* <option>คณะเศรษฐศาสตร์</option> */}
                    <option>คณะวิทยาศาสตร์</option>
                    <option>คณะวิศวกรรมศาสตร์</option>
                    {/* <option>คณะสังคมศาสตร์</option> */}
                    {/* <option>คณะสถาปัตยกรรมศาสตร์</option>
                    <option>คณะการสื่อสารมวลชน</option> */}
                    <option>คณะสัตวแพทยศาสตร์</option>
                    <option>คณะแพทยศาสตร์</option>
                    {/* <option>คณะสหเวชศาสตร์</option> */}
                    <option>คณะเภสัชศาสตร์</option>
                    <option>คณะทันตแพทยศาสตร์</option>
                    {/* <option>คณะนิติศาสตร์</option> */}
                    {/* <option>คณะนิเทศศาสตร์</option>
                    <option>คณะศิลปกรรมศาสตร์</option>
                    <option>คณะศึกษาศาสตร์</option>
                    <option>คณะวิทยาการสื่อสาร</option>
                    <option>คณะวิทยาศาสตร์การกีฬา</option>
                    <option>คณะวิทยาศาสตร์เพื่อสุขภาพ</option>
                    <option>คณะวิทยาลัยอิสลามศึกษา</option>
                    <option>คณะวิจัยและพัฒนา</option> */}
                  </select>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="gender"
                    name="user_description.gender"
                    value={formData.user_description.gender}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="" disabled selected hidden>
                      เพศ
                    </option>
                    <option>ชาย</option>
                    <option>หญิง</option>
                    <option>ไม่ระบุ</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mq450:grid-cols mq450:gap-2">
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="year"
                    name="user_type_student.year"
                    value={formData.user_type_student.year}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="" disabled selected hidden>
                      ชั้นปี
                    </option>
                    <option>59</option>
                    <option>60</option>
                    <option>61</option>
                    <option>62</option>
                    <option>63</option>
                    <option>64</option>
                    <option>65</option>
                    <option>66</option>
                  </select>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="plan"
                    name="user_type_student.study_plan"
                    value={formData.user_type_student.study_plan}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  >
                    <option value="" disabled selected hidden>
                      แผนการเรียน
                    </option>
                    <option>ปกติ</option>
                    <option>พิเศษ</option>
                    <option>นานาชาติ</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                สมัคร
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
