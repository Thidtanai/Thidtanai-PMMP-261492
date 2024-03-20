import { FunctionComponent } from "react";
import CreateActDesc, {FormData} from "../components/CreateActDesc";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const CreateAct: FunctionComponent = () => {
    const navigate = useNavigate();
    const handleSubmit = async (formData: FormData): Promise<void> => {
        try {
            //send data to mongoDB or any other backend
            await axios.post('http://localhost:4000/activity/create-activity', formData).then((res) => {
                console.log(res.data);
            });
            //reset form or perform any other action on successful submission
            console.log('Form submitted successfully')
            alert("สร้างกิจกรรมสำเร็จ")
            navigate('/activity')
        }catch(error){
            console.error('Error submitting form:', error);
            alert("สร้างกิจกรรมไม่สำเร็จ")
        }
    }
    return (
        <>
        <div className="w-full relative overflow-hidden flex flex-col items-center justify-start gap-[3.313rem_0rem] tracking-[normal] mq750:gap-[1.625rem_0rem]">
            <section className="w-[77.688rem] flex flex-row items-start justify-start py-[0rem] pr-[0.813rem] pl-[0rem] box-border max-w-full shrink-0 text-left text-[0.75rem] text-red font-body">
                <div className="flex-1 bg-white flex flex-col items-center justify-start pt-[3.438rem] pb-[24.25rem] pr-[1.438rem] pl-[3.438rem] box-border gap-[4.063rem_0rem] max-w-full lg:pl-[1.688rem] lg:pt-[2.25rem] lg:pb-[15.75rem] lg:box-border mq750:gap-[2rem_0rem] mq750:pt-[1.25rem] mq750:pb-[6.688rem] mq750:box-border mq450:gap-[1rem_0rem] mq1050:pt-[1.438rem] mq1050:pb-[10.25rem] mq1050:box-border">
                    <div className="w-[76.875rem] h-[117.313rem] relative bg-white hidden max-w-full" />
                    <CreateActDesc onSubmit={handleSubmit} />
                </div>
            </section>
        </div>
        </>
    );
};

export default CreateAct;
