import { FunctionComponent, useEffect, useState } from "react";
import HeadText from "../Text/HeadText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JoinReqModalProps {
  toggleModal: () => void;
  isOpen: boolean;
  user_id: string;
  activity_id: string;
  role: string;
  activity_owner: string;
}

interface FormData {
  noti_type: string;
  noti_receiver: string;
  join_req_type: {
    req_user: string;
    user_profile: string;
    activity_id: string;
    role: string;
    description: string;
    contact: string;
  };
}

interface ActData {
  _id: string;
  membered_user: string;
}

interface UserData {
  _id: string;
  membered_activity: [
    {
      activity_id: string;
    }
  ];
}

interface MyToken {
  id: string;
  name: string;
  group: string;
  profile: string;
}

const JoinFormModal: FunctionComponent<JoinReqModalProps> = ({
  toggleModal,
  isOpen,
  user_id,
  activity_id,
  role,
  activity_owner,
}) => {
  const [haveToken, setHaveToken] = useState<MyToken>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedTk: MyToken = jwtDecode(token);
      setHaveToken(decodedTk);
    }
    // Function to disable scrolling
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    // Enable scrolling when the modal is closed
    if (isOpen) {
      disableScroll();
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    noti_type: "join_req",
    noti_receiver: activity_owner,
    join_req_type: {
      req_user: user_id,
      user_profile: "",
      activity_id: activity_id,
      role: role,
      description: "",
      contact: "",
    },
  });
  const actData = {
    _id: activity_id,
    membered_user: user_id,
  };
  const userData = {
    _id: user_id,
    membered_activity: [
      {
        activity_id: activity_id,
      },
    ],
  };

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
      if (haveToken && haveToken.profile) {
        // Update formData with user_profile from haveToken
        setFormData((prevFormData) => ({
          ...prevFormData,
          join_req_type: {
            ...prevFormData.join_req_type,
            user_profile: haveToken.profile,
          },
        }));
      }
      console.log(formData);
      const notiRes = await axios.post(
        "http://localhost:4000/notification/create-noti",
        formData
      );
      console.log("notification res: ", notiRes);
      const actRes = await axios.post(
        `http://localhost:4000/activity/activities/${activity_id}/add-member`,
        { membered_user: user_id }
      );

      console.log("activity res: ", actRes);
      const userRes = await axios.post(
        `http://localhost:4000/user/users/${user_id}/add-activity`,
        { activity_id: activity_id }
      );
      console.log("user res: ", userRes);
      window.location.reload();
      navigate("/activity");
    } catch (error) {
      alert("สมัครไปแล้ว");
      console.log("Create norification error: ", error);
      window.location.reload();
      navigate("/activity");
    }
  };

  return (
    <>
      {/* Main modal */}
      {isOpen && (
        <>
          {/* Black drop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-50"
            onClick={toggleModal}
          ></div>
          {/* Main modal */}
          <div
            id="crud-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative p-8 bg-white rounded-lg">
                {/* Modal header */}
                <div className="flex relative">
                  <HeadText text="กรอกคำขอเข้าร่วม" haveBg={true} />
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="absolute right-0 top-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="mt-5 flex flex-col text-left">
                  <form className="w-full" onSubmit={handleSubmit}>
                    <div className="pt-5">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                      >
                        แนะนำตัว
                      </label>
                      <textarea
                        id="description"
                        name="join_req_type.description"
                        rows={4}
                        value={formData.join_req_type.description}
                        onChange={handleInputChange}
                        className="block p-2.5 w-72 text-sm text-cmu-purple bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="แนะนำตัวเองหน่อย"
                      ></textarea>
                    </div>
                    <div className="pt-5">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                      >
                        ช่องทางการติดต่อ
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="join_req_type.contact"
                        value={formData.join_req_type.contact}
                        onChange={handleInputChange}
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border border-gray-300 text-cmu-purple text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@gmail.com"
                      />
                    </div>
                    <div className="pt-4 md:p-5 flex flex-row justify-end">
                      <button
                        type="submit"
                        className="focus:outline-none cursor-pointer text-white bg-cmu-purple hover:bg-cornflowerblue focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        สมัครเข้าร่วม
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JoinFormModal;
