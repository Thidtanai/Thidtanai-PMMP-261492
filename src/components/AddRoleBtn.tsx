import { FunctionComponent } from "react";

import React from 'react';

const AddRoleBtn = () => {
    return (
        <button className="relative flex items-center justify-center bg-transparent border-none cursor-pointer min-w-[21.938rem] pt-6 px-12 pb-6 z-10">
            <div className="absolute inset-0 mx-0 mt-0 mb-[2px] mr-[3px] bg-white border-2 border-dashed border-cmu-purple"></div>
            <img src="/plusicon.svg" alt="+" className="h-8 w-8 mr-2 -mt-8 -ml-9" />
            <span className="font-medium text-cmu-purple text-2xl leading-none -mr-10 relative z-10">เพิ่ม</span>
        </button>
    );
};

export default AddRoleBtn;
