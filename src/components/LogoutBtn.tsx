import axios from "axios";
import {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useNavigate } from "react-router-dom";

export type LogoutBtnType = {
  /** Style props */
  frameDivBackgroundColor?: CSSProperties["backgroundColor"];
  frameDivBackground?: CSSProperties["background"];
  frameDivBorder?: CSSProperties["border"];
  frameDivWidth?: CSSProperties["width"];
  bDisplay?: CSSProperties["display"];
  _id: string;
  user_email: string;
  user_description: {
    first_name: string;
    last_name: string;
    department: string;
    gender: string;
  };
  user_image: string;
  user_tag: [string];
  first_name: string;
  last_name: string;
};

const LogoutBtn: FunctionComponent<LogoutBtnType> = ({
  frameDivBackgroundColor,
  frameDivBackground,
  frameDivBorder,
  frameDivWidth,
  bDisplay,
  user_image,
  user_email,
  first_name,
  last_name,
  _id,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      backgroundColor: frameDivBackgroundColor,
      background: frameDivBackground,
      border: frameDivBorder,
      width: frameDivWidth,
    };
  }, [
    frameDivBackgroundColor,
    frameDivBackground,
    frameDivBorder,
    frameDivWidth,
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [uploadImage, setUploadImage] = useState<string>();

  const bStyle: CSSProperties = useMemo(() => {
    return {
      display: bDisplay,
    };
  }, [bDisplay]);

  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear localStorage, remove session, etc.
    // Then navigate to the logout route
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      if (!files || files.length === 0) {
        return;
      }
      const file = files[0];
      const base64_file = await convertToBase64(file);
      const uploadImg = await axios.post(
        `http://localhost:4000/user/update/${_id}`,
        {
          user_image: base64_file,
        }
      );
      console.log(uploadImage)
      window.location.reload();
    } catch (error) {
      console.log("Error upload image: ", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Specify the type of the event
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    // <div
    //   className="bg-red-500 flex flex-row items-center justify-center py-2.5 px-5 text-left text-base text-white font-heading-2"
    //   style={frameDivStyle}
    // >
    //   <b className="relative leading-[110%] uppercase hover:cursor-pointer" style={bStyle} onClick={handleLogout}>
    //     ออกจากระบบ
    //   </b>
    // </div>
    <div className="relative inline-block items-center justify-center gap-[0.75rem] whitespace-nowrap text-[1rem] text-white font-heading-2">
      {/* Profile */}
      <div
        className="hover:cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {user_image ? (
          <img
            className="w-10 h-10 rounded-full object-full"
            src={user_image}
            alt="Rounded avatar"
          ></img>
        ) : (
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
          style={{ top: "100%", right: 0 }}
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-bold">{first_name + " " + last_name}</div>
            <div className="text-sm text-cmu-purple truncate">{user_email}</div>
          </div>
          <ul
            className="p-0 m-0 text-sm text-gray-700 dark:text-gray-200 list-none"
            aria-labelledby="avatarButton"
          >
            <li>
              <div className="hover:cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="hover:cursor-pointer">
                  เปลี่ยนรูปโปรไฟล์
                </label>
              </div>
            </li>
          </ul>
          <div className="py-1">
            <div
              className="hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              onClick={handleLogout}
            >
              ออกจากระบบ
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutBtn;

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        resolve(fileReader.result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
