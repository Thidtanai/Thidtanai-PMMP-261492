import { FunctionComponent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface MyToken {
  id: string;
  name: string;
  group: string;
}

const MainMenu: FunctionComponent = () => {
  const [haveToken, setHaveToken] = useState<MyToken>();
  const [isLoggedin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  };

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
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };
    fetchData();
  }, []);

  return (
    <div className="z-20 mainmenu bg-white mx-auto shadow-lg w-[75%] flex flex-row items-start justify-center py-8 px-8 gap-[114px] text-left text-5xl text-cmu-purple font-heading-2">
      <div
        className="flex flex-col items-center justify-start gap-[0.5rem] cursor-pointer hover:bg-gray-200"
        onClick={() => handleNavigate("/activity")}
        aria-label="ข่าวสารกิจกรรม"
      >
        <FontAwesomeIcon icon="calendar-alt" />
        <b className="relative leading-[110%] uppercase">ข่าวสารกิจกรรม</b>
      </div>
      {isLoggedin && (
        <div
          className="flex flex-col items-center justify-start gap-[0.5rem] cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigate("/my-activity")}
          aria-label="กิจกรรมของฉัน"
        >
          <FontAwesomeIcon icon="calendar-check" />
          <b className="relative leading-[110%] uppercase">กิจกรรมของฉัน</b>
        </div>
      )}
      {isLoggedin && (
        <div
          className="flex flex-col items-center justify-start gap-[0.5rem] cursor-pointer hover:bg-gray-200"
          onClick={() => handleNavigate("/create-activity")}
          aria-label="สร้างกิจกรรม"
        >
          <FontAwesomeIcon icon="calendar-plus" />
          <b className="relative leading-[110%] uppercase">สร้างกิจกรรม</b>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
