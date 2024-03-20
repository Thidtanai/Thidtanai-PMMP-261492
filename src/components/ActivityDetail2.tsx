import { FunctionComponent } from "react";
// import JoinButtonFrame from "./JoinButtonFrame";

const ActivityDetail: FunctionComponent = () => {
    return (
        <div className="w-[1230px] h-[1663px] tracking-[normal] mq1000:h-auto mq1000:min-h-[1663]">
            <section className="h-full w-full top-[0px] right-[0px] bottom-[0px] left-[0px] flex flex-col items-center justify-center max-w-full text-left text-31xl text-black font-menu">
                <div className="self-stretch flex flex-col items-center justify-start pt-[55px] pb-[39px] pr-[55px] pl-[52px] box-border relative gap-[16px] max-w-full mq725:pl-[26px] mq725:pr-[27px] mq725:box-border">
                    <div className="w-full h-full !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-xl bg-white" />
                    <div className="w-[213px] h-6 hidden z-[1]" />
                    <div className="self-stretch h-[124px] flex flex-row items-start justify-start pt-0 pb-9 pr-0 pl-[3px] box-border max-w-full">
                        <div className="self-stretch flex-1 bg-lavender flex flex-row items-center justify-start gap-[0px_16px] max-w-full z-[1]">
                            <div className="self-stretch w-[7px] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
                            <h1 className="m-0 w-[296px] relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block mq450:text-11xl mq450:leading-[33px] mq1000:text-21xl mq1000:leading-[44px]">
                                ข้อมูลกิจกรรม
                            </h1>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row items-start justify-start pt-0 pb-[81px] px-0 box-border max-w-full shrink-0 text-xl text-black1 font-body">
                        <div className="w-[1070px] flex flex-row flex-wrap items-start justify-start gap-[0px_157px] max-w-full shrink-0 mq725:gap-[0px_39px] mq450:gap-[0px_20px] mq1050:gap-[0px_78px]">
                            <div className="flex-1 flex flex-col items-start justify-start gap-[16px_0px] min-w-[298px] max-w-full">
                                <div className="w-[403px] flex flex-row items-start justify-start py-0 px-1 box-border max-w-full">
                                    <div className="flex-1 flex flex-col items-start justify-start pt-0 px-0 pb-1.5 box-border gap-[4px_0px] max-w-full z-[1]">
                                        <div className="relative font-medium inline-block max-w-full mq450:text-base">
                                            กิจกรรมรับน้องขึ้นดอย ปีการศึกษา 2566
                                        </div>
                                        <div className="w-[228px] flex flex-row items-start justify-start py-0 pr-[29px] pl-0 box-border gap-[0px_8px]">
                                            <button className="cursor-pointer [border:none] pt-[7px] px-1.5 pb-1.5 bg-[transparent] h-[29px] w-14 flex flex-row items-center justify-center box-border relative">
                                                <div className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-sm box-border border-[1px] border-solid border-cmu-purple" />
                                                <div className="w-[40.4px] relative text-xs font-light font-body text-cmu-purple text-left inline-block shrink-0 z-[1]">
                                                    sport
                                                </div>
                                            </button>
                                            <button className="cursor-pointer [border:none] pt-[7px] pb-1.5 pr-2.5 pl-[9px] bg-[transparent] h-[29px] flex-1 flex flex-row items-center justify-center box-border relative">
                                                <div className="h-full w-full absolute !m-[0] top-[0px] right-[-0.1px] bottom-[0px] left-[0.1px] rounded-sm box-border border-[1px] border-solid border-cmu-purple" />
                                                <div className="flex-1 relative text-xs font-light font-body text-cmu-purple text-left z-[1]">
                                                    outdoor
                                                </div>
                                            </button>
                                            <button className="cursor-pointer [border:none] pt-[7px] px-1.5 pb-1.5 bg-[transparent] h-[29px] w-14 flex flex-row items-center justify-center box-border relative">
                                                <div className="h-full w-full absolute !m-[0] top-[0px] right-[0.2px] bottom-[0px] left-[-0.2px] rounded-sm box-border border-[1px] border-solid border-cmu-purple" />
                                                <div className="w-[40.4px] relative text-xs font-light font-body text-cmu-purple text-left inline-block shrink-0 z-[1]">
                                                    yearly
                                                </div>
                                            </button>
                                        </div>
                                        <div className="w-[74px] h-[15px] relative hidden text-xs text-red">
                                            <div className="absolute top-[0px] left-[20px]">
                                                ห้ามเว้นว่าง
                                            </div>
                                            <img
                                                className="absolute top-[0px] left-[0px] w-[15px] h-[15px] overflow-hidden"
                                                alt=""
                                                src="/materialsymbolswarning.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-1 box-border max-w-full">
                                    <div className="flex-1 flex flex-row items-center justify-center max-w-full z-[1]">
                                        <div className="flex-1 flex flex-col items-start justify-start gap-[4px] max-w-full">
                                            <div className="relative font-medium mq450:text-base">
                                                รายละเอียด
                                            </div>
                                            <textarea
                                                className="bg-white h-[230px] w-auto [outline:none] self-stretch rounded-lg box-border overflow-hidden shrink-0 flex flex-row items-center justify-center p-6 text-base text-cmu-purple border-[1px] border-solid border-cmu-purple"
                                                placeholder={`ขอเชิญชวนนักศึกษา ศิษย์เก่า และคณาจารย์ มาเข้าร่วมกิจกรรม
รับน้องขึ้นดอย...`}
                                                rows={12}
                                                cols={23}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-start justify-start py-0 px-1">
                                    <div className="flex flex-col items-start justify-start gap-[16px_0px] z-[1]">
                                        <div className="flex flex-row items-center justify-center">
                                            <div className="relative mq450:text-base">
                                                <span className="font-medium">{`วันเปิดรับสมัคร: `}</span>
                                                <span>19/พย/2566</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-center">
                                            <div className="relative mq450:text-base">
                                                <span className="font-medium">{`วันปิดรับสมัคร: `}</span>
                                                <span>2/ตค/2566</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-center z-[1]">
                                    <div className="w-[213px] relative inline-block mq450:text-base">
                                        <span className="font-medium">{`คณะของผู้เข้าร่วม: `}</span>
                                        <span>ทุกคณะ</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-center z-[1]">
                                    <div className="w-[234px] relative inline-block mq450:text-base">
                                        <span className="font-medium">{`สถานที่: `}</span>
                                        <span>มหาวิทยาลัยเชียงใหม่</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start justify-start pt-[29px] px-0 pb-0 box-border min-w-[296px] max-w-full">
                                <div className="self-stretch flex flex-col items-start justify-start gap-[10px_0px] max-w-full">
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[26px] max-w-full z-[1]">
                                        <textarea
                                            className="bg-gray-100 h-[387.8px] w-auto [outline:none] self-stretch relative rounded-lg box-border border-[1px] border-solid border-cmu-purple"
                                            rows={19}
                                            cols={23}
                                        />
                                        <div className="flex flex-row items-start justify-start py-0 px-[53px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
                                            <div className="flex flex-row items-start justify-start gap-[0px_15px]">
                                                <img
                                                    className="h-[49.1px] w-[80.1px] relative rounded-lg object-cover min-h-[49px]"
                                                    loading="lazy"
                                                    alt=""
                                                    src="/rectangle-60@2x.png"
                                                />
                                                <img
                                                    className="h-[49.1px] w-[80.1px] relative rounded-lg object-cover min-h-[49px]"
                                                    loading="lazy"
                                                    alt=""
                                                    src="/rectangle-61@2x.png"
                                                />
                                                <img
                                                    className="h-[49.1px] w-[80.1px] relative rounded-lg object-cover min-h-[49px]"
                                                    loading="lazy"
                                                    alt=""
                                                    src="/rectangle-62@2x.png"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start py-0 px-[51px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
                                        <div className="flex flex-row items-center justify-center z-[1]">
                                            <div className="relative mq450:text-base">
                                                <span className="font-medium">{`อีเมล์ติดต่อ: `}</span>
                                                <span>contact@cmu.ac.th</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-start justify-start py-0 px-[53px] box-border max-w-full mq450:pl-5 mq450:pr-5 mq450:box-border">
                                        <div className="flex flex-row items-center justify-center z-[1]">
                                            <div className="relative mq450:text-base">
                                                <span className="font-medium">{`เบอร์ติดต่อ: `}</span>
                                                <span>053 941300</span>
                                                <span className="font-medium">{` `}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col items-end justify-start pt-0 pb-5 pr-px pl-0.5 box-border gap-[25px_0px] max-w-full shrink-0">
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-row items-center justify-center z-[1]">
                            <div className="flex flex-row items-center justify-center pt-3.5 pb-3 pr-6 pl-[26px] relative">
                                <div className="h-full w-full absolute !m-[0] top-[0.3px] right-[0px] bottom-[-0.3px] left-[0px] bg-cmu-purple" />
                                <div className="w-[77.2px] relative text-base font-medium font-body text-soft-grey text-left inline-block shrink-0 z-[1]">
                                    สนใจเข้าร่วม
                                </div>
                            </div>
                        </button>
                        <div className="self-stretch bg-lavender flex flex-row items-center justify-start gap-[0px_16px] max-w-full z-[1]">
                            <div className="h-[88px] w-[7px] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
                            <h1 className="m-0 w-[379px] relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block max-w-[calc(100%_-_23px)] mq450:text-11xl mq450:leading-[33px] mq1000:text-21xl mq1000:leading-[44px]">
                                ข้อมูลการรับสมัคร
                            </h1>
                        </div>
                    </div>
                    {/* <JoinButtonFrame />
                    <JoinButtonFrame /> */}
                    <img
                        className="w-8 h-[31.9px] absolute !m-[0] top-[39.3px] right-[38px] z-[2]"
                        loading="lazy"
                        alt=""
                        src="/vector4.svg"
                    />
                </div>
            </section>
        </div>
    );
};

export default ActivityDetail;
