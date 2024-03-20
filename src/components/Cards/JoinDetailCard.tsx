
interface RecruitDetailProps {
    recruit_role: string;
    recruit_count: number;
    recruit_description?: string;
    onJoin: () => void;
}

const JoinDetailCard: React.FC<RecruitDetailProps> = ({recruit_role, recruit_count, recruit_description, onJoin}) => {
    return (
        <div className="self-stretch flex flex-col items-start justify-start gap-[1rem_0rem] max-w-full">
            <div className="self-stretch flex flex-row items-start justify-between gap-[1.25rem] z-[1] mq450:flex-wrap">
                <div className="flex flex-row items-center justify-center">
                    <h2 className="m-0 relative text-inherit font-normal font-inherit mq450:text-[1rem]">
                        {/* recruit role */}
                        {recruit_role}
                    </h2>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <div className="relative font-medium mq450:text-[1rem]">
                        {/* จำนวน: recruit count */}
                        รับ {recruit_count} คน
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-center max-w-full z-[1]">
                <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem] max-w-full">
                    {/* <h2 className="m-0 w-[6.269rem] relative text-inherit font-medium font-inherit inline-block mq450:text-[1rem]">
                        description
                    </h2> */}
                    <textarea
                        className="bg-white h-[6rem] w-auto [outline:none] resize-none self-stretch rounded-lg box-border overflow-hidden shrink-0 flex flex-row overflow-y-auto items-center justify-center  px-[1.375rem] font-open-sans text-[1rem] text-cmu-purple border-[1px] border-solid border-cmu-purple"
                        placeholder="placeholder"
                        value={recruit_description}
                        rows={7}
                        cols={25}
                    />
                </div>
            </div>
        </div>
    )
}

export default JoinDetailCard