import { FunctionComponent, useEffect } from "react";
import HeadText from "../Text/HeadText";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface JoinReqModalProps {
  toggleModal: () => void;
  isOpen: boolean;
  _id: string;
  join_req_type: {
    req_user: string;
    activity_id: string;
    role: string;
    contact: string;
    description: string;
  };
}

const JoinReqModal: FunctionComponent<JoinReqModalProps> = ({
  toggleModal,
  isOpen,
  join_req_type,
  _id
}) => {
  const navigate = useNavigate();
  useEffect(() => {
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

  const handleCloseReq = async () => {
    try {
      // Assuming you have the notification ID available
      const response = await axios.put(
        `http://localhost:4000/notification/update-noti/${_id}`,
        {
          noti_status: "shown",
        }
      );

      console.log(response.data); // Log the updated notification data
      toggleModal();
      window.location.reload();
      navigate("/activity");
      // Perform any additional actions you need after updating the notification
    } catch (error) {
      console.error("Error updating notification status:", error);
      window.location.reload();
      navigate("/activity");
      // Handle error
    }
  };

  const handleAcceptReq = async () => {
    try {
      // Make an HTTP request to update the activity's recruit members
      console.log("handle accept", join_req_type.activity_id)
      const actRes = await axios.post(
        `http://localhost:4000/activity/activities/${join_req_type.activity_id}/add-recruit`,
        {
          member_id: join_req_type.req_user,
          member_status: "accepted", // Assuming you have a status for accepted members
          recruit_role: join_req_type.role
        }
      );
      console.log(actRes)
      const userRes = await axios.post(
        `http://localhost:4000/user/users/${join_req_type.req_user}/add-recruit`,
        {
          recruit_registered: join_req_type.role,
          activity_id: join_req_type.activity_id
        }
      );
      console.log(userRes)
      handleCloseReq();
    } catch (error) {
      console.error("Error accepting request:", error);
      // Handle error
    }
  };

  const handleDeniedReq = async () => {
    handleCloseReq();
  };

  return (
    <>
      {/* Main modal */}
      {isOpen && (
        <>
          {/* Black drop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-40"
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
                  <HeadText text="คำขอเข้าร่วม" haveBg={true} />
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
                  <div className="flex flex-row w-full basis-3/6 place-content-start items-center gap-2">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                      <img
                        className="h-full w-full object-cover"
                        src="public/images/loginBG.jpg"
                        alt="user image"
                      />
                    </div>
                    <div className="h-full pt-4 flex flex-col space-y-0">
                      <p className="m-0 font-bold">{join_req_type.req_user}</p>
                      <p className="m-0 text-sm text-cmu-purple">นักศึกษา ปี</p>
                    </div>
                  </div>
                  <div className="basis-1/6 flex flex-row w-full">
                    <p className="font-bold">ตำแหน่ง: </p>
                    <p> {join_req_type.role}</p>
                  </div>
                  <div className="basis-1/6 flex flex-row w-full">
                    <p className="font-bold">แนะนำตัว: </p>
                    <p> {join_req_type.description}</p>
                  </div>
                  <div className="basis-1/6 flex flex-row w-full">
                    <p className="font-bold">ช่องทางการติดต่อ: </p>
                    <p> {join_req_type.contact}</p>
                  </div>
                </div>
                <form className="pt-4 md:p-5 flex flex-row justify-end">
                  <button
                    type="button"
                    onClick={handleDeniedReq}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    ปฏิเสธ
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptReq}
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    อนุมัติ
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JoinReqModal;
