import { FunctionComponent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginBtn from "./LoginBtn";
import { useNavigate } from "react-router-dom";
import JoinReqModal from "./Modal/JoinReqModal";
import LogoutBtn from "./LogoutBtn";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface MyToken {
  id: string;
  name: string;
  group: string;
}

interface NotiForm {
  _id: string,
  noti_type: string,
  join_req_type: {
    req_user: string,
    activity_id: string,
    role: string,
    contact: string,
    description: string
  }
}

interface UserForm {
  _id: string,
  user_email: string,
  user_description: {
    first_name: string,
    last_name: string,
    department: string,
    gender: string
  }
  user_image: string,
  user_tag: [string]
}


const NavBar: FunctionComponent<{ headerText: string }> = ({
  headerText,
}) => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  const handleNotification = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/notification/notifications/${haveToken?.id}`);
      if(response.data.length > 0){
        setNotifications(response.data);
        setIsOpen(!isOpen);
      } else{
        alert("no notification");
      }
    } catch(error){
      console.log("Notification error: ", error);
    }
  };

  //check login
  const [isLoggedin, setIsLogin] = useState(false);
  //set notification show modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [haveToken, setHaveToken] = useState<MyToken>();
  const [notifications, setNotifications] = useState<NotiForm[]>([]); // Initialize as an empty array
  const [userData, setUserData] = useState<UserForm | undefined>();

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
            const getUser = await axios.get(
              `http://localhost:4000/user/${decodedTk.id}`
            );
            setUserData(getUser.data);
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

  const mapNotification = (notifications: NotiForm[]) => {
    return notifications.map((notification, index) => (
      <JoinReqModal key={index} isOpen={isOpen} toggleModal={handleNotification} join_req_type={notification.join_req_type} _id={notification._id}/>
    ));
  }

  return (
    <div className="w-full h-full">
      <div className="top-[0rem] left-[0rem] w-full flex flex-col items-center justify-start pt-[2.5rem] pb-[2rem] pr-[1.25rem] pl-[6.313rem] box-border gap-[5rem_0rem] max-w-full text-left text-[2rem] text-white font-heading-2 lg:pl-[3.125rem] lg:box-border mq750:gap-[2.5rem_0rem] mq750:pl-[1.563rem] mq750:box-border mq450:gap-[1.25rem_0rem]">
        <img
          className="w-full h-[16rem] absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="../../public/act-picture/entaneer-doi.jpg"
        />
        <div className="w-[75.063rem] flex flex-row items-start justify-start max-w-full">
          <div className="w-[70rem] flex flex-row items-center justify-between max-w-full gap-[1.25rem] z-[1] mq1050:flex-wrap">
            {/* div for website logo */}
            <div
              className="flex flex-row items-center justify-start gap-[0rem_0.5rem] hover:cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              <FontAwesomeIcon icon="people-group" />
              <h2 className="m-0 relative text-inherit leading-[90%] uppercase font-bold font-inherit mq450:text-[1.188rem] mq450:leading-[1.063rem] mq1050:text-[1.625rem] mq1050:leading-[1.438rem]">
                CMU Find Event
              </h2>
            </div>
            {/* div for menu */}
            <div className="flex flex-row items-center justify-end gap-[1.25rem]">
              <nav className="flex flex-row items-center justify-center gap-[1.25rem] whitespace-nowrap text-[1rem] text-white font-heading-2">
                <b
                  className="leading-[110%] uppercase inline-block hover:cursor-pointer"
                  onClick={() => handleNavigate("/")}
                >
                  หน้าหลัก
                </b>
                {isLoggedin && (
                  <b
                    className="leading-[110%] uppercase inline-block hover:cursor-pointer"
                    onClick={handleNotification}
                  >
                    <FontAwesomeIcon icon="bell" />
                  </b>
                )}
              </nav>
              <div>{isLoggedin ? <LogoutBtn user_email={userData?.user_email} user_image={userData?.user_image} first_name={userData?.user_description.first_name} last_name={userData?.user_description.last_name} /> : <LoginBtn />}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start gap-[0.5rem_0rem] max-w-full text-[5rem]">
          <h1 className="m-0 self-stretch relative text-inherit leading-[90%] uppercase font-bold font-inherit z-[1] mq450:text-[2rem] mq450:leading-[2.938rem] mq1050:text-[3.25rem] mq1050:leading-[4.375rem]">
            {/* headerText here */}
            {headerText}
          </h1>
        </div>
      </div>
      <div className="absolute">
        {mapNotification(notifications)}
      </div>
    </div>
  );
};

export default NavBar;
