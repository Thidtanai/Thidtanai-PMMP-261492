import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export type LogoutBtnType = {
  /** Style props */
  frameDivBackgroundColor?: CSSProperties["backgroundColor"];
  frameDivBackground?: CSSProperties["background"];
  frameDivBorder?: CSSProperties["border"];
  frameDivWidth?: CSSProperties["width"];
  bDisplay?: CSSProperties["display"];
};

const LogoutBtn: FunctionComponent<LogoutBtnType> = ({
  frameDivBackgroundColor,
  frameDivBackground,
  frameDivBorder,
  frameDivWidth,
  bDisplay,
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

  const bStyle: CSSProperties = useMemo(() => {
    return {
      display: bDisplay,
    };
  }, [bDisplay]);

  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic here
    // For example, clear localStorage, remove session, etc.
    // Then navigate to the logout route
    localStorage.removeItem('token');
    navigate("/");
    window.location.reload();
  }

  return (
    <div
      className="bg-red-500 flex flex-row items-center justify-center py-2.5 px-5 text-left text-base text-white font-heading-2"
      style={frameDivStyle}
    >
      <b className="relative leading-[110%] uppercase hover:cursor-pointer" style={bStyle} onClick={handleLogout}>
        ออกจากระบบ
      </b>
    </div>
  );
};

export default LogoutBtn;
