import { FunctionComponent } from 'react';

// Helper function to render tags
const renderTags = (tags: string[]) => {
    return tags.map((tag, index) => (
        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 mb-2">
            {tag}
        </span>
    ));
};

const ActivityCard: FunctionComponent = () => {
    const tags = ['กิจการนักศึกษา', 'วิชาชีพ', 'เทคโนโลยี']; // Define tags here

    return (
        <div className="w-64 rounded overflow-hidden shadow-lg">
            <img className="w-full" src='/images/tempAct.svg' alt="activity image" />
            <div className="mx-4 my-2 flex flex-col">
                <div className="font-bold text-xl text-left mb-4 text-cmu-purple">
                งานเเข่งขันเเบตมินตัน
                </div>
                <div className="mt-4 mb-2 ml-0">
                    Tags:{renderTags(tags)}
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
