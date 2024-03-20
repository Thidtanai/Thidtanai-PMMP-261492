import * as fs from "fs";
import { useEffect, useState } from "react";
import academic from "../../public/tags-picture/academic.jpg";
import art from "../../public/tags-picture/art.jpg";
import charity from "../../public/tags-picture/charity.jpg";
import council from "../../public/tags-picture/council.jpg";
import entertain from "../../public/tags-picture/entertain.jpg";
import festival from "../../public/tags-picture/festival.jpg";
import health from "../../public/tags-picture/health.jpg";
import job from "../../public/tags-picture/job.jpg";
import performance from "../../public/tags-picture/performance.jpg";
import religion from "../../public/tags-picture/religion.jpg";
import social from "../../public/tags-picture/social.jpg";
import sport from "../../public/tags-picture/sport.jpg";
import tech from "../../public/tags-picture/tech.jpg";
import travel from "../../public/tags-picture/travel.jpg";
import upskill from "../../public/tags-picture/upskill.jpg";
import HeadText from "../components/Text/HeadText";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const initialImages = [
  { name: "วิชาการ", src: academic },
  { name: "วิชาชีพ", src: job },
  { name: "เพิ่มทักษะ", src: upskill },
  { name: "กิจการนักศึกษา", src: council },
  { name: "เทคโนโลยี", src: tech },
  { name: "บันเทิง", src: entertain },
  { name: "ศิลปะ", src: art },
  { name: "การแสดง", src: performance },
  { name: "ศาสนา", src: religion },
  { name: "เทศกาล", src: festival },
  { name: "สุขภาพ", src: health },
  { name: "เข้าสังคม", src: social },
  { name: "จิตอาสา", src: charity },
  { name: "ท่องเที่ยว", src: travel },
  { name: "กีฬา", src: sport },
];
type TagProps = {
  user_tag: string[];
};

interface UserData {
  //todo: should add user_id
  user_tag: string[];
}
interface MyToken {
    id: string;
    name: string;
    group: string;
  }

interface FormProps {
  onSubmit: (formData: UserData) => Promise<void>;
}
const ChooseTags: React.FC<FormProps> = ({ onSubmit }) => {
  const initialFormData: UserData = {
    user_tag: [],
  };
  const [formData, setFormData] = useState<UserData>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const [clickedImages, setClickedImages] = useState<string[]>([]);
  const navigate = useNavigate();

  // Function to handle image click
  const handleImageClick = (name: string) => {
    if (clickedImages.includes(name)) {
      // If image is already clicked, remove it from clickedImages
      setClickedImages(clickedImages.filter((item) => item !== name));
    } else if (clickedImages.length < 3) {
      // If less than 3 images are selected, add the clicked image to clickedImages
      setClickedImages([...clickedImages, name]);
    }
  };

  const handleSubmitTag = () => {
    // Extract only the names of clicked images
    const selectedTags = initialImages
      .filter((image) => clickedImages.includes(image.name))
      .map((image) => image.name);

    // Update the form data with the selected tags
    setFormData({
      ...formData,
      user_tag: selectedTags,
    });

    // Reset clicked images after updating form data
    setClickedImages([]);

    // Send the selected tags to the server
    axios
      .post(`http://localhost:4000/user/users/${haveToken?.id}/add-tag`, { user_tag: selectedTags })
      .then((response) => {
        // Handle successful response if needed
        console.log("Tags added successfully:", response.data);
        alert("เลือกแท็กสำเร็จ")
        navigate('/activity')
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error adding tags:", error);
        alert("เลือกแท็กไม่สำเร็จ")
        navigate('/activity')
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("submitting form", formData.user_tag);
    resetForm();
  };

  //check login
  const [isLoggedin, setIsLogin] = useState(false);
  const [haveToken, setHaveToken] = useState<MyToken>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedTk: MyToken = jwtDecode(token);
          if (!decodedTk) {
            localStorage.removeItem("token");
            setIsLogin(false);
          } else {
            console.log(decodedTk);
            setHaveToken(decodedTk);
            setIsLogin(true);
          }
        }

        // const response = await axios.get("http://localhost:4000/activity", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full h-full">
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-5xl max-h-full">
          <div className="relative p-8 bg-white rounded-lg border-solid border-2 border-cmu-purple drop-shadow-xl shadow-lg shadow-cmu-purple/20">
            <form onSubmit={handleSubmit}>
              <div className="inset-0items-center h-full w-full">
                <div className="relative top-2 mx-auto w-auto p-0.5 border  md:w-3/4 shadow-lg rounded-md bg-grey-200">
                  <div className=" text-center">
                    {/* <div className="text-4xl leading-6 font-bold text-gray-900 mt-4 mb-4">เลือกประเภทกิจกรรมที่ชอบ</div> */}
                    <div className="flex justify-center mt-4">
                      <div className="self-stretch bg-lavender flex flex-row items-center justify-start gap-[0rem_1rem] w-full z-[1] rounded-md">
                        <HeadText text="เลือกแท็กที่สนใจ" haveBg={true} />
                      </div>
                    </div>
                    <div className="mt-1 flex justify-center">
                      <div className="grid grid-cols-4 gap-2 bg-white rounded-md">
                        {initialImages.map((image, index) => (
                          // each image and name is a button
                          <button
                            key={index}
                            className={`focus:outline-none ${
                              clickedImages.includes(image.name)
                                ? "bg-gray-300"
                                : ""
                            }`}
                            onClick={() => handleImageClick(image.name)}
                          >
                            <div className="w-48">
                              <img
                                src={image.src}
                                style={{
                                  width: "150px",
                                  height: "100px",
                                  marginTop: "10px",
                                }}
                                alt="55555"
                                className="rounded-md"
                              />
                              <div className="text-sm mt-2 mb-2 font-semibold text-center">
                                {image.name}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-center mt-1">
                      <div className="flex justify-center px-4 py-3 w-1/2 h-[3rem]">
                        <button
                          className="px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          type="button"
                          onClick={handleSubmitTag}
                        >
                          ตกลง
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChooseTags;
