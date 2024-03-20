import { FunctionComponent, useMemo, type CSSProperties, useState } from "react";

export type GroupComponent1Type = {
  prop?: string;
  placeholder?: string;
  numberPlaceholder?: string;
  placeholder1?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propWidth1?: CSSProperties["width"];
  propWidth2?: CSSProperties["width"];
  propPadding?: CSSProperties["padding"];

  //new prop for callback function
  onValueChange?: (value: string) => void;
};

const GroupComponent1: FunctionComponent<GroupComponent1Type> = ({
  prop,
  placeholder,
  numberPlaceholder,
  placeholder1,
  propWidth,
  propWidth1,
  propWidth2,
  propPadding,
  onValueChange, //Add the new prop
}) => {
  const divStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const inputStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth1,
    };
  }, [propWidth1]);

  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth2,
    };
  }, [propWidth2]);

  const textStyle: CSSProperties = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const [inputValue, setInputValue] = useState<string>("");
  const [numberInputValue, setNumberInputValue] = useState<string>(
    numberPlaceholder?.toString() || ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    // Call the callback function with the updated value
    if(onValueChange) {
      onValueChange(e.target.value);
    }
  }

  const handleNumberInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setNumberInputValue(value);

    if(onValueChange) {
      onValueChange(value);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-start py-[1rem] pr-[1.063rem] pl-[1rem] box-border relative gap-[1.5rem] min-w-[21.938rem] max-w-full z-[1] text-left text-[1.25rem] text-black1 font-body mq750:min-w-full">
      <div className="w-full h-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] bg-white" />
      <div className="self-stretch flex flex-row items-start justify-start gap-[0rem_2.25rem] max-w-full z-[1] mq750:flex-wrap mq750:gap-[0rem_2.25rem]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem_0rem] min-w-[14.563rem] max-w-full">
          <div
            className="w-[7.313rem] relative font-medium inline-block mq450:text-[1rem]"
            style={divStyle}
          >
            {prop}
          </div>
          <div className="self-stretch flex flex-row items-center justify-start pt-[0.625rem] px-[0.625rem] pb-[0.563rem] relative">
            <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-lg bg-gray box-border border-[1px] border-solid border-cmu-purple" />
            <input
              className="w-[3.688rem] [border:none] [outline:none] inline-block font-body text-[0.75rem] bg-[transparent] h-[0.938rem] relative italic text-darkslateblue text-left z-[1]"
              placeholder={placeholder}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="w-[4.625rem] h-[0.938rem] relative hidden text-[0.75rem] text-red">
            <div className="absolute top-[0rem] left-[1.25rem]">
              ห้ามเว้นว่าง
            </div>
            <img
              className="absolute top-[0rem] left-[0rem] w-[0.938rem] h-[0.938rem] overflow-hidden"
              alt=""
              src="/materialsymbolswarning.svg"
            />
          </div>
        </div>
        <div className="w-[7rem] flex flex-col items-start justify-start gap-[0.25rem]">
          <div className="relative font-medium mq450:text-[1rem]">จำนวน</div>
          <div className="self-stretch flex flex-row items-center justify-start pt-[0.563rem] px-[0.25rem] pb-[0.625rem] relative">
            <div className="h-full w-full absolute !m-[0] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-lg box-border border-[1px] border-solid border-cmu-purple" />
            <input
              className="w-[1.25rem] [border:none] [outline:none] font-light font-body text-[0.75rem] bg-[transparent] h-[0.938rem] relative text-cmu-purple text-left inline-block z-[1]"
              placeholder={numberPlaceholder?.toString()}
              type="text"
              value={numberInputValue}
              onChange={handleNumberInputValue}
              style={buttonStyle}
            />
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-center justify-center max-w-full z-[1]">
        <div className="flex-1 flex flex-col items-start justify-start py-[0rem] pr-[0.063rem] pl-[0rem] box-border gap-[0.25rem] max-w-full">
          <div className="w-[6.269rem] relative font-medium inline-block mq450:text-[1rem]">
            รายละเอียด
          </div>
          <div className="self-stretch rounded-lg bg-white box-border overflow-hidden flex flex-col items-start justify-start py-[0.5rem] pr-[0.563rem] pl-[0.438rem] gap-[1.5rem_0rem] max-w-full text-[1rem] text-cmu-purple font-open-sans border-[1px] border-solid border-cmu-purple">
            <div
              className="self-stretch flex flex-row items-start justify-start py-[1rem] px-[0.875rem] opacity-[0.6]"
              style={textStyle}
            >
              <div className="relative leading-[1.5rem]">{placeholder1}</div>
            </div>
            <div className="flex flex-row items-start justify-start py-[0.5rem] px-[1rem] box-border gap-[0rem_2.5rem] max-w-full mq750:flex-wrap mq450:gap-[0rem_2.5rem]">
              <div className="flex flex-row items-start justify-start gap-[0rem_0.5rem]">
                
              </div>
              <div className="flex flex-row items-start justify-start gap-[0rem_0.5rem]">
                
              </div>
              <div className="flex flex-row items-start justify-start gap-[0rem_1rem]">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupComponent1;
