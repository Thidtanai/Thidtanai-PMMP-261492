import { text } from '@fortawesome/fontawesome-svg-core';
import { FunctionComponent } from 'react';

interface HeadProp {
    text: string;
    haveBg: boolean;
}

const HeadText: FunctionComponent<HeadProp> = ({ text, haveBg }) => {
    return (
        <div className={`h-20 flex flex-row justify-start w-full overflow-hidden ${haveBg ? 'bg-cmu-purple bg-opacity-20' : ''}`}>
            <div className="bg-cmu-purple p-1 h-full"></div>
            <p className="w-full m-auto text-left font-bold ml-4 text-21xl mq450:text-5xl mq750:text-11xl">{text}</p>
        </div>
    );
}

export default HeadText;
