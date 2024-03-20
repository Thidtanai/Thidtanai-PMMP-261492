import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface FormData {
  user_email: string;
  user_password: string;
}

interface MyToken {
  id: string;
  name: string;
  group: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    user_email: "",
    user_password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:4000/user/login",
        formData
      );
      const data = await res.data;
      if (data.userTk) {
        console.log("userTk: ", data.userTk);
        localStorage.setItem("token", data.userTk);

        const token = localStorage.getItem("token");
        if (token) {
          const decodedTk: MyToken = jwtDecode(token);
          if (decodedTk) {
            const getUser = await axios.get(
              `http://localhost:4000/user/${decodedTk.id}`
            );
            console.log("user", getUser.data);
            if (getUser) {
              const userTag = getUser.data.user_tag;
              if (userTag.length < 3) {
                console.log("wah");
                navigate("/activity");
              }
              else {
                navigate("/choose")
              }
            }
          }
        } else {
          console.log(res);
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Login error: ", error);
      if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          // Password was wrong
          alert("รหัสผ่านไม่ถูกต้อง");
        } else if (axiosError.response?.status === 404) {
          // User not found
          alert("ไม่พบผู้ใช้งาน");
        } else {
          alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        }
      } else {
        alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    }
  };

  return (
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
              ยินดีต้อนรับ
            </p>
          </div>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
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
            <div className="flex items-start relative z-0 w-full mb-5 group">
              <div className="flex items-center h-5 mq750:h-1">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-solid border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 mq750:ms-6 text-sm text-gray-500 dark:text-gray-400"
              >
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              เข้าสู่ระบบ
            </button>
          </form>
          <div className="text-center">
            <p className="text-sm">
              ยังไม่ได้ลงทะเบียน?{" "}
              <a href="/register" className="text-cyan-600">
                ลงทะเบียน
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
