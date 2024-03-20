import { FunctionComponent, useState } from "react";
import Role from "../components/AddRoleDetail";
import './AddRoleSection.css'

interface AddRoleSectionProps{
    roleCount: number //ensure roleCount is always a number
    updateRoleData: (index: number, roleData: {
        name: string;
        count: number;
        description: string;
    }) => void;
}
interface RoleData {
    name: string;
    count: number; //might convert to number later
    description: string;
}
const AddRoleSection: FunctionComponent<AddRoleSectionProps> = ({ roleCount, updateRoleData }) => {
    //state to track roles for submit
    const [roles, setRoles] = useState<RoleData[]>([]);

    
    return (
        <div className="self-stretch flex flex-row items-start justify-start pt-[0rem] pb-[0.375rem] pr-[2rem] pl-[0rem] box-border max-w-full shrink-0 text-left text-[3.125rem] text-black font-heading-2">
            <div className="flex-1 flex flex-col items-start justify-start gap-[2.375rem_0rem] max-w-full mq750:gap-[1.188rem_0rem]">
                <div className="self-stretch bg-lavender flex flex-row items-center justify-start gap-[0rem_1rem] max-w-full z-[0]">
                    <div className="h-[5.5rem] w-[0.438rem] relative [background:linear-gradient(#6b69b1,_#6b69b1),_#fff]" />
                    <h1 className="m-0 w-[31.063rem] relative text-inherit leading-[110%] uppercase font-bold font-inherit inline-block max-w-[calc(100%_-_23px)] mq450:text-[1.875rem] mq450:leading-[2.063rem] mq1050:text-[2.5rem] mq1050:leading-[2.75rem]">
                        กรอกข้อมูลการรับสมัคร
                    </h1>
                </div>
                <div className="roles-grid">
                    {[...Array(roleCount)].map((_, index) => (
                        <Role key={index} index={index} updateRoleData={updateRoleData}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddRoleSection;
