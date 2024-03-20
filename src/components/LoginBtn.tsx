import { FunctionComponent, useMemo, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export type LoginBtnType = {
  /** Style props */
  frameDivBackgroundColor?: CSSProperties["backgroundColor"];
  frameDivBackground?: CSSProperties["background"];
  frameDivBorder?: CSSProperties["border"];
  frameDivWidth?: CSSProperties["width"];
  bDisplay?: CSSProperties["display"];
};

const LoginBtn: FunctionComponent<LoginBtnType> = ({
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
  const handleNavigate = (path: string) => {
    navigate(path);
  }

  return (
    <div
      className="bg-cmu-purple flex flex-row items-center justify-center py-2.5 px-5 text-left text-base text-white font-heading-2"
      style={frameDivStyle}
    >
      <b className="relative leading-[110%] uppercase hover:cursor-pointer" style={bStyle} onClick={() => handleNavigate("/login")}>
        เข้าสู่ระบบ
      </b>
    </div>
  );
};

export default LoginBtn;
