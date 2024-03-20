import { FunctionComponent, useState } from "react";

//Define an interface for the components' state
interface Rolestate{
    recruit_role: string;
    recruit_count: number; //might convert to number later
    recruit_description: string;
}

interface AddRoleDetailProps {
    index: number;
    updateRoleData: (index: number, roleData: { recruit_role: string, recruit_count: number, recruit_description: string }) => void;
}
const Role: React.FC<AddRoleDetailProps> = ({index, updateRoleData}) => {
    const [role, setRole] = useState<Rolestate>({recruit_role: '', recruit_count: 0, recruit_description: ''});

    //handlers for input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        //validate count input
        // if (name === 'count') {
        //     //Allow empty string to display placeholder or numeric values
        //     if (value === '' || /^[0-9]+$/.test(value)) {
        //         // Convert value to number when setting state, but handle empty string separately
        //         const newValue = value === '' ? 0 : Number(value);
        //         setRole(prevRole => ({
        //             ...prevRole,
        //             [name]: newValue,
        //         }));
        //     }
        // } else {
        // }
        setRole(prevRole => {
            const updatedRole = { ...prevRole, [name]: value };
            // Call updateRoleData to update the parent's state
            updateRoleData(index, updatedRole);
            return updatedRole;
        });
    };
    return (
        <div className="flex-1 flex flex-col items-center justify-start pr-[1.063rem] box-border relative gap-[1.5rem_0rem] min-w-[20rem] max-w-[22.5rem] z-[1] text-left text-[1.25rem] text-black1 font-body mq750:min-w-full">
            {/* <div className="w-full h-full !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] bg-white" /> */}
            <div className="self-stretch flex flex-row items-start justify-start gap-[0rem_2.25rem] max-w-full z-[1] mq750:flex-wrap mq750:gap-[0rem_1.125rem]">
                <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem_0rem] min-w-[14.563rem] max-w-full">
                    <div className="relative font-medium mq450:text-[1rem]">
                        ชื่อตำแหน่ง
                    </div>
                    <input
                        className="self-stretch rounded-lg bg-white box-border flex items-center justify-center h-[2.4rem] text-cmu-purple z-[1] border-[1px] border-solid border-cmu-purple w-full"
                        placeholder="ชื่อตำแหน่ง..."
                        type="text"
                        name="recruit_role"
                        value={role.recruit_role}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="w-[7rem] flex flex-col items-start justify-start gap-[0.25rem]">
                    <div className="relative font-medium mq450:text-[1rem]">จำนวน</div>
                    <input
                        className="self-stretch rounded-lg bg-white box-border flex items-center justify-center h-[2.4rem] text-cmu-purple z-[1] border-[1px] border-solid border-cmu-purple w-full"
                        placeholder={role.recruit_count === 0 ? '' : role.recruit_count.toString()}
                        type="text"
                        name="recruit_count"
                        value={role.recruit_count}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-center max-w-full z-[1]">
                <div className="flex-1 flex flex-col items-start justify-start py-[0rem] pr-[0.063rem] pl-[0rem] box-border gap-[0.25rem] max-w-full">
                    <div className="w-[6.269rem] relative font-medium inline-block mq450:text-[1rem]">
                        รายละเอียด
                    </div>
                    <textarea
                        className="bg-white h-[8.5rem] w-auto [outline:none] self-stretch rounded-lg box-border overflow-hidden shrink-0 flex flex-row items-center justify-center py-[1.5rem] px-[1.375rem] font-open-sans text-[1rem] text-cmu-purple border-[1px] border-solid border-cmu-purple"
                        placeholder="รายละเอียดและหน้าที่..."
                        rows={7}
                        cols={25}
                        name="recruit_description"
                        value={role.recruit_description}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Role;