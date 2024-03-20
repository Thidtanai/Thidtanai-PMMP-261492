import { FunctionComponent } from "react";
import './Footer.css'

const Footer: FunctionComponent = () => {
  return (
    <div className="bottom-[0rem] left-0 right-0 bg-cmu-purple flex flex-col items-start justify-end box-border text-left text-[3.13rem] text-white font-heading-2">
      <div className="self-stretch flex flex-row items-center justify-between ml-1">
        <b className="flex-1 relative left-2 bold-text-small-screen">
          <p className="m-0">คุณพร้อมร่วม</p>
          <p className="m-0">
            <span className="text-orange">กิจกรรม</span>
            <span>เเล้วหรือยัง?</span>
          </p>
        </b>
        <div className=" flex flex-col items-center justify-center mr-3 ml-1">
          <div className="flex flex-row items-start justify-start">
            <i class="fa-brands fa-linkedin m-1"></i>
            <i class="fa-brands fa-facebook m-1"></i>
            <i class="fa-brands fa-instagram m-1"></i>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-between text-[0.75rem] font-body mr-1">
        <div className="flex flex-row items-center justify-between ml-3">
          <i class="fa-solid fa-envelope mr-1 email-icon"></i>
          <div className="relative site-email">info@cmufindevent.com</div>
        </div>
        <div className="flex flex-row items-start justify-between">
          <div className="relative m-1">นโยบายความเป็นส่วนตัว</div>
          <div className="relative m-1">ข้อกำหนดและเงื่อนไข</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
