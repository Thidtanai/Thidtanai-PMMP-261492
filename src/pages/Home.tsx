import { FunctionComponent, useCallback } from "react"
import LoginBtn from "../components/LoginBtn"
export default function Home() {
    const onLoginBtnClick = useCallback(() => {
        //sync login page 
    }, [])
    return (
        <div className="flex flex-row items-end justify-start gap-x-[116px] max-w-full text-center font-menu text-31xl text-black self-stretch m-16">
            <div className="flex-1 flex flex-col items-start justify-start p-0 min-w-[357px] max-w-full sm:min-w-full">
                <img
                    className="h-[449px] max-w-full w-full object-cover overflow-hidden"
                    loading="lazy"
                    alt=""
                    src="../act-picture/entaneer-doi.jpg"
                />
            </div>
            <div className="relative flex flex-row flex-wrap items-start justify-between h-[445px] min-w-[470px] max-w-full w-[470px] sm:h-auto sm:min-h-[445px] md:min-w-full lg:flex-1">
                <div className=" top-0 left-0 flex flex-row items-center justify-start gap-x-[16px] w-[409px] max-w-full sm:flex-wrap">
                    <div className="h-[88px] w-[7px] bg-gradient-to-b from-[#6b69b1] to-[#6b69b1] sm:w-full sm:h-[7px]" />
                    <h1 className="m-0 relative w-[386px] min-w-[251px] max-w-full text-inherit leading-[110%] uppercase font-bold inline-block sm:text-11xl sm:leading-[33px] md:text-21xl md:leading-[44px]">
                        <p className="m-0">เพราะเราเชื่อในการ</p>
                        <p className="m-0">เริ่มทำสิ่งใหม่ๆ</p>
                    </h1>
                </div>
                <div className=" top-[140px] left-0 w-[455px] h-[237px] text-base leading-[170%] text-left text-grey font-body">
                    {/* <p className="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consectetur ipsum eu diam feugiat, vitae hendrerit nibh ullamcorper.</p> */}
                    <p className="m-0">&nbsp;</p>
                    <p className="m-0">
                    "เว็บไซต์แห่งนี้เป็นสถานที่สุดพิเศษที่รวบรวมกิจกรรมหลากหลายเพื่อตอบสนองความต้องการและความสนใจของนักศึกษาทุกคน 
                    ไม่ว่าคุณจะหลงใหลในการเรียนรู้, การทำงานกลุ่ม, การแข่งขัน, หรือการสร้างสรรค์ผลงานใหม่ๆ, เรามีทุกอย่างที่คุณต้องการ! 
                    เข้าร่วมกับเราวันนี้เพื่อสร้าง, แบ่งปัน, และสำรวจกิจกรรมที่ไม่มีที่สิ้นสุด สร้างประสบการณ์ที่ไม่ลืมเลือนและขยายขอบเขตการเรียนรู้ของคุณไปกับเพื่อนๆ 
                    นักศึกษามหาวิทยาลัยเชียงใหม่ มาร่วมกันสร้างความทรงจำและเรียนรู้สิ่งใหม่ๆ กับเรา ที่นี่ที่เดียว!"
                    </p>
                </div>
                {/* <LoginBtn onClick={onLoginBtnClick} /> */}
            </div>
        </div>
    );
    
}