import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JoinDetailCard from "./Cards/JoinDetailCard";
import JoinFormModal from "./Modal/JoinFormModal";
import { useNavigate } from "react-router-dom";
interface ActivityDetailProps {
  activity_name: string;
  activity_owner: string;
  activity_description: {
    description?: string;
    tag: string[];
    start_date: Date;
    end_date: Date;
    location?: string;
    department?: string;
  };
  activity_image: string;
  activity_contact: {
    email?: string;
    other?: string;
  };
  membered_user: string[];
  activity_recruit: [
    {
      recruit_role: string;
      recruit_count: number;
      recruit_description?: string;
      recruit_member: string[];
    }
  ];
  onJoin: () => void;
  onClose: () => void; // New prop for closing the activity detail
  user_name: string;
  user_id: string;
  activity_id: string;
}

const ActivityInfo: React.FC<ActivityDetailProps> = ({
  activity_name,
  activity_owner,
  activity_description,
  activity_image,
  membered_user,
  activity_recruit,
  activity_contact,
  user_id,
  user_name,
  activity_id,
  onJoin,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recruitNum, setRecruitNum] = useState<number>();
  const navigate = useNavigate();
  const handleJoinRecruit = () => {
    setIsOpen(!isOpen);
  };

  const handleJoinActivity = async()=>{
    try{
      const actRes = await axios.post(
        `http://localhost:4000/activity/activities/${activity_id}/add-member`,
        {
          membered_user: user_id
        }
      );
      console.log(actRes)
      const userRes = await axios.post(
        `http://localhost:4000/user/users/${user_id}/add-activity`,
        {
          activity_id: activity_id
        }
      );
      console.log(userRes)
      window.location.reload();
      navigate("/activity");
    } catch(error){
      alert("สมัครไปแล้ว")
      window.location.reload();
      navigate("/activity")
      console.log(error);
    }
  }

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center pt-[18rem] overflow-y-auto bg-black bg-opacity-50"
      style={{ margin: "auto" }}
    >
      <div
        className="flex-1 flex flex-col items-center justify-center max-w-3xl z-[1] text-left text-black1 font-body bg-white overflow-hidden rounded-lg"
        style={{}}
      >
        <div className="self-stretch flex flex-col items-center justify-center pt-[3rem] pb-[2rem]  pr-[8rem] pl-[1rem] box-border relative max-w-full lg:box-border">
          <div className="w-[1.2rem] h-[1.2rem] !m-[0] rounded-xl bg-white" />
          <div className="w-[1.2rem] h-[1.2rem] z-[1]" />
          <div className="self-stretch flex flex-row items-start justify-between py-[0rem] pr-[0.063rem] pl-[0rem] box-border max-w-full shrink-0 gap-[1.25rem] mq1050:flex-wrap">
            <div className="flex flex-col items-start ml-6 justify-start gap-[1rem_0rem] max-w-sm mq750:min-w-full mq1050:flex-1 text-[1rem]">
              <div className="flex flex-row items-start justify-start py-[0rem] px-[0.25rem] box-border max-w-full">
                <div className="flex-1 flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[0.375rem] box-border gap-[0.25rem_0rem] max-w-full z-[1]">
                  {/* activity name */}
                  <h2 className="m-0 relative text-4xl font-bold font-inherit inline-block max-w-full mq450:text-[1rem]">
                    {/* activity_name */}
                    {activity_name}
                  </h2>
                  {/* activity tags */}
                  <div className="flex flex-row items-start justify-start py-[0rem] pr-[1.813rem] pl-[0rem] box-border gap-[0rem_0.5rem]">
                    {activity_description.tag[0] && (
                      <button className="cursor-pointer [border:none] pt-[0.438rem] px-[0.375rem] pb-[0.375rem] bg-[transparent] h-[1.813rem] w-auto flex flex-row items-center justify-center box-border relative">
                        <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-sm box-border border-[1px] border-solid border-cmu-purple" />
                        <div className="relative text-[0.75rem] font-light font-body text-cmu-purple text-left inline-block shrink-0 z-[1]">
                          {/* activity_description.tag[0] */}
                          {activity_description.tag[0]}
                        </div>
                      </button>
                    )}
                    {activity_description.tag[1] && (
                      <button className="cursor-pointer [border:none] pt-[0.438rem] pb-[0.375rem] pr-[0.625rem] pl-[0.563rem] bg-[transparent] h-[1.813rem] w-auto flex-1 flex flex-row items-center justify-center box-border relative">
                        <div className="h-full w-full absolute !m-[0] top-[0rem] right-[-0.006rem] bottom-[0rem] left-[0.006rem] rounded-sm box-border border-[1px] border-solid border-cmu-purple" />
                        <div className="flex-1 relative text-[0.75rem] font-light font-body text-cmu-purple text-left z-[1]">
                          {/* activity_description.tag[1] */}
                          {activity_description.tag[1]}
                        </div>
                      </button>
                    )}
                    {activity_description.tag[2] && (
                      <button className="cursor-pointer [border:none] pt-[0.438rem] px-[0.375rem] pb-[0.375rem] bg-[transparent] h-[1.813rem] w-auto flex flex-row items-center justify-center box-border relative">
                        <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0.013rem] bottom-[0rem] left-[-0.012rem] rounded-sm box-border border-[1px] border-solid border-cmu-purple" />
                        <div className="relative text-[0.75rem] font-light font-body text-cmu-purple text-left inline-block shrink-0 z-[1]">
                          {/* activity_description.tag[2] */}
                          {activity_description.tag[2]}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* activity description */}
              <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.25rem] box-border max-w-full">
                <div className="flex-1 flex flex-row items-center justify-center max-w-full z-[1]">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem] max-w-full">
                    <h2 className="m-0 relative text-inherit font-medium font-inherit mq450:text-[1rem]">
                      รายละเอียด
                    </h2>
                    <textarea
                      className="bg-white [outline:none] rounded-lg box-border overflow-hidden resize-none overflow-y-auto shrink-0 flex flex-row items-center justify-center text-[0.75rem] text-cmu-purple border-[1px] border-solid border-cmu-purple"
                      style={{ height: "10rem", width: "20rem" }}
                      value={activity_description.description}
                      rows={12}
                      cols={23}
                    />
                  </div>
                </div>
              </div>
              {/* start and end date */}
              <div className="flex flex-row items-start justify-start py-[0rem] px-[0.25rem]">
                <div className="flex flex-col items-start justify-start gap-[1rem_0rem] z-[1]">
                  <div className="flex flex-row items-center justify-center">
                    <div className="relative mq450:text-[1rem]">
                      <span className="font-medium">{`วันเปิดรับสมัคร: `}</span>
                      {new Date(
                        activity_description.start_date
                      ).toLocaleDateString()}
                      <span></span>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <div className="relative mq450:text-[1rem]">
                      <span className="font-medium">{`วันปิดรับสมัคร: `}</span>
                      <span></span>
                      {new Date(
                        activity_description.end_date
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              {/* department */}
              <div className="flex flex-row items-center justify-center z-[1] px-[0.25rem]">
                <h2 className="m-0 relative text-inherit inline-block font-inherit mq450:text-[1rem]">
                  <span className="font-medium">{`คณะของผู้เข้าร่วม: `}</span>
                  <span className="font-medium">
                    {activity_description.department}
                  </span>
                </h2>
              </div>
              {/* location */}
              <div className="flex flex-row items-center justify-center z-[1] px-[0.25rem]">
                <h2 className="m-0 relative text-inherit inline-block font-inherit mq450:text-[1rem]">
                  <span className="font-medium">{`สถานที่: `}</span>
                  <span className="font-medium">
                    {activity_description.location}
                  </span>
                </h2>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start pt-[2.688rem] mr-10 px-[0rem] pb-[0rem] box-border max-w-full mq750:min-w-full mq1050:flex-1">
              <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[0.75rem_0rem]">
                {/* all images section */}
                <div className="self-stretch flex-1 mt-6 flex flex-col items-end gap-[0.75rem] z-[1]">
                  {/* big image */}
                  <div className="flex flex-1 w-1/2 justify-end border-[1px] border-solid border-cmu-purple">
                    <img
                      className="self-stretch flex-1 items-end justify-start relative rounded-lg overflow-hidden object-cover"
                      style={{ width: "300px", height: "200px" }}
                      loading="lazy"
                      alt=""
                      src={activity_image[0]}
                    />
                  </div>
                  {/* each small images */}
                  {/* todo: when click small image, show big image */}
                  <div className="flex flex-row items-start justify-end gap-[0rem_0.938rem]">
                    {activity_image[0] && (
                      <img
                        className="h-[3.069rem] w-[5.006rem] relative rounded-lg object-cover border-[1px] border-md min-h-[3.063rem]"
                        loading="lazy"
                        alt="[0]"
                        src={activity_image[0]}
                      />
                    )}
                    {activity_image[1] && (
                      <img
                        className="h-[3.069rem] w-[5.006rem] relative rounded-lg object-cover border-[1px] border-md min-h-[3.063rem]"
                        loading="lazy"
                        alt="[1]"
                        src={activity_image[1]}
                      />
                    )}
                    {activity_image[2] && (
                      <img
                        className="h-[3.069rem] w-[5.006rem] relative rounded-lg object-cover border-[1px] border-md min-h-[3.063rem]"
                        alt="[2]"
                        src={activity_image[2]}
                      />
                    )}
                  </div>
                </div>
                {/* contact and join button */}
                <div className="self-stretch flex flex-col items-end justify-start gap-[6.063rem_0rem] mq450:gap-[6.063rem_0rem]">
                  <div className="self-stretch flex flex-row items-end justify-end">
                    <div className="flex flex-col items-end justify-start gap-[0.5rem_0rem]">
                      <div className="flex flex-row items-center justify-center z-[1] ">
                        <h2 className="m-0 relative text-inherit font-inherit mq450:text-[1rem]">
                          <span className="font-medium">{`อีเมล์ติดต่อ: `}</span>
                          <span className="font-medium">
                            {activity_contact.email}
                          </span>
                        </h2>
                      </div>
                      <div className="flex flex-row items-center justify-center z-[1]">
                        <div className="relative mq450:text-[1rem]">
                          <span className="font-medium">{`ช่องทางอื่น: `}</span>
                          {activity_contact.other}
                          <span className="font-medium">{` `}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-row items-center justify-center z-[1]">
                    <div className="flex flex-row items-center justify-center mt-5 pt-[0.875rem] pb-[0.75rem] pr-[1.5rem] pl-[1.625rem] relative">
                      <div className="h-full w-full absolute !m-[0] bg-cmu-purple" />
                      <div
                        className="relative text-[1rem] font-medium font-body text-background-white text-left inline-block shrink-0 z-[1]"
                        onClick={handleJoinActivity}
                      >
                        สนใจเข้าร่วม
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* recruit header */}
          <div className="mt-2 self-stretch flex flex-row items-start  justify-start box-border max-w-full shrink-0 text-[2rem] text-black font-heading-2">
            <div className="flex-1 bg-lavender w-[20rem] flex flex-row items-center justify-start gap-[0rem_1rem]  max-w-full z-[1]">
              <div className="h-[3rem] w-[0.438rem] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
              <h1 className="m-0 relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block  text-[2rem] mq450:text-[1.875rem] mq450:leading-[2.063rem] mq1050:text-[2.5rem] mq1050:leading-[2.75rem]">
                ข้อมูลการรับสมัคร
              </h1>
            </div>
          </div>
          {/* activity header */}
          <div
            className="absolute top-[2rem] left-[1rem] self-stretch flex flex-row items-start  justify-start box-border max-w-full shrink-0 text-[2rem] text-black font-heading-2"
            style={{ width: "95%" }}
          >
            <div className="flex-1 bg-lavender flex flex-row items-center justify-start gap-[0rem_1rem] max-w-full z-[1]">
              <div className="h-[3rem] w-[0.438rem] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
              <h1 className="m-0 relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block  text-[2rem] mq450:text-[1.875rem] mq450:leading-[2.063rem] mq1050:text-[2.5rem] mq1050:leading-[2.75rem]">
                ข้อมูลกิจกรรม
              </h1>
            </div>
          </div>
          {/* onClose button */}
          <div
            className="w-[2rem] h-[3rem] absolute !m-[0] top-0 right-0 z-[3] cursor-pointer"
            onClick={onClose}
          >
            <FontAwesomeIcon icon="square-xmark" size="2x" />
          </div>
          {/* recruit */}
          <ul className="roles-grid">
            {activity_recruit.map((recruit, index) => (
              <li key={index}>
                <div className="flex flex-col relative">
                  <JoinDetailCard
                    recruit_role={recruit.recruit_role}
                    recruit_count={recruit.recruit_count}
                    recruit_description={recruit.recruit_description}
                    onJoin={onJoin}
                  />
                  <button
                    onClick={handleJoinRecruit}
                    className="mt-auto ml-auto mr-0 mb-2 rounded-md bg-cmu-purple w-[3rem] h-8"
                  >
                    เข้าร่วม
                  </button>
                </div>
                <div className="absolute">
                  <JoinFormModal
                    isOpen={isOpen}
                    toggleModal={handleJoinRecruit}
                    user_id={user_id}
                    activity_id={activity_id}
                    role={recruit.recruit_role}
                    activity_owner={activity_owner}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityInfo;

{
  /* <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pr-[0rem] pl-[0.125rem] box-border max-w-full">
  <div className="flex-1 flex flex-col items-start justify-start gap-[0.938rem_0rem] max-w-full">
    <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[0rem_2.625rem] max-w-full mq750:gap-[0rem_2.625rem]">
      <GroupComponent1 />
      <GroupComponent1 />
    </div>
    <div className="w-[33.75rem] flex flex-col items-end justify-start pt-[1rem] pb-[0.5rem] pr-[0.688rem] pl-[1rem] box-border relative gap-[0.625rem] max-w-full z-[1]">
      <div className="w-full h-full absolute !m-[0] top-[-0.019rem] right-[0rem] bottom-[0.019rem] left-[0rem] bg-white" />
      <div className="self-stretch flex flex-col items-start justify-start gap-[1rem_0rem] max-w-full">
        <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] z-[1] mq450:flex-wrap">
          <div className="flex flex-row items-center justify-center">
            <h2 className="m-0 relative text-inherit italic font-normal font-inherit mq450:text-[1rem]">
              สตาฟคุมแถว
            </h2>
          </div>
          <div className="flex flex-row items-center justify-center">
            <div className="relative font-medium mq450:text-[1rem]">
              จำนวน: 115/200
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-center max-w-full z-[1]">
          <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem] max-w-full">
            <h2 className="m-0 w-[6.269rem] relative text-inherit font-medium font-inherit inline-block mq450:text-[1rem]">
              รายละเอียด
            </h2>
            <textarea
              className="bg-white h-[8.5rem] w-auto [outline:none] self-stretch rounded-lg box-border overflow-hidden shrink-0 flex flex-row items-center justify-center py-[1.5rem] px-[1.375rem] font-open-sans text-[1rem] text-cmu-purple border-[1px] border-solid border-cmu-purple"
              placeholder="คอยคุมแถวขณะเดินขบวน"
              rows={7}
              cols={25}
            />
          </div>
        </div>
      </div>
      <div className="h-[2.813rem] flex flex-row items-start justify-start py-[0rem] px-[0.438rem] box-border">
        <button className="cursor-pointer [border:none] pt-[0.75rem] px-[1.375rem] pb-[0.875rem] bg-[transparent] flex flex-row items-center justify-center relative z-[1]">
          <div className="h-full w-full absolute !m-[0] top-[-0.019rem] right-[0.063rem] bottom-[0.019rem] left-[0rem] bg-cmu-purple" />
          <div className="relative text-[1rem] font-medium font-body text-background-white text-left whitespace-nowrap z-[1]">
            สมัครเข้าร่วม
          </div>
        </button>
      </div>
    </div>
  </div>
</div> */
}
