import React, { useState } from "react";
import JoinFormModal from "./Modal/JoinFormModal";

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

const ActivityDetail: React.FC<ActivityDetailProps> = ({
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
  onClose, // Destructure onClose from props
}) => {
  // Additional details and join logic can be implemented here
  console.log(activity_description.start_date);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleJoinRecruit = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="activity-detail">
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative p-8 bg-white rounded-lg">
            <button
              onClick={onClose} // Call onClose function when the button is clicked
              className="absolute top-0 right-0 m-4 p-2 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <h2>{activity_name}</h2>
            <img
              src={activity_image}
              alt={activity_name}
              style={{ width: "200px", height: "200px" }}
            />
            <p>Description: {activity_description.description}</p>
            <p>Tags: {activity_description.tag.join(", ")}</p>
            <p>
              Start Date:{" "}
              {new Date(activity_description.start_date).toLocaleDateString()}
            </p>
            <p>
              End Date:{" "}
              {new Date(activity_description.end_date).toLocaleDateString()}
            </p>
            <p>Location: {activity_description.location}</p>
            <p>Department: {activity_description.department}</p>
            <p>Contact Email: {activity_contact.email}</p>
            <p>Contact Other: {activity_contact.other}</p>
            <p>Members: {membered_user.length}</p>
            <p>Recruit Roles:</p>
            <p>User ID: {user_id}</p>
            <p>User Name: {user_name}</p>
            <ul>
              <ul>
                {activity_recruit.map((recruit, index) => (
                  <li key={index}>
                    Role: {recruit.recruit_role}, Count: {recruit.recruit_count}
                    , Description: {recruit.recruit_description}
                    <button onClick={onJoin}>Join</button>
                  </li>
                ))}
              </ul>
            </ul>
            <button>สนใจเข้าร่วม</button>
            <button onClick={handleJoinRecruit}>สมัครเข้าร่วม</button>
          </div>
        </div>
      </div>
      <div className="absolute">
        <JoinFormModal
          isOpen={isOpen}
          toggleModal={handleJoinRecruit}
          user_id={user_id}
          activity_id={activity_id}
          role="สตาฟพยาบาล"
          activity_owner={activity_owner}
        />
      </div>
    </div>
  );
};

export default ActivityDetail;
