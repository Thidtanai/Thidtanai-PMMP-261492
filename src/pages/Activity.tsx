import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Buffer } from "buffer";
import { Navigate, useNavigate } from "react-router-dom";
import ActivityCard from "../components/Card";
import ActivityDetail from "../components/ActivityDetail";
import ActCard from "../components/Cards/ActCard";
import HeadText from "../components/Text/HeadText";
import JoinReqModal from "../components/Modal/JoinReqModal";
import ActivityInfo from "../components/ActInfo";

interface Activity {
  _id: string;
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
}

interface User {
  user_tag: [string];
}

interface MyToken {
  id: string;
  name: string;
  group: string;
}

const ActivityList: React.FC = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [showActivityDetail, setShowActivityDetail] = useState<boolean>(false);
  const [activitiesToShow, setActivitiesToShow] = useState<number>(8);
  const [haveToken, setHaveToken] = useState<MyToken>();
  const [userTag, setUserTag] = useState<User>();
  const [userTags, setUserTags] = useState<string[]>([]); // State for user tags

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedTk: MyToken = jwtDecode(token);
          setHaveToken(decodedTk);
          const response = await axios.get("http://localhost:4000/activity", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setActivities(response.data);
          const getUser = await axios.get(
            `http://localhost:4000/user/${decodedTk.id}`
          );
          setUserTag(getUser.data.user_tag);
          setUserTags(getUser.data.user_tag); // Setting userTags array
        } else {
          const response = await axios.get("http://localhost:4000/activity");
          setActivities(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const hasActivityEnded = (activity: Activity): boolean => {
    const endDate = new Date(activity.activity_description.end_date);
    return endDate < new Date();
  };

  const handleJoin = () => {
    // Implement logic to join the activity
  };

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowActivityDetail(true);
  };

  const handleActivityClose = () => {
    setSelectedActivity(null);
    setShowActivityDetail(false);
  };

  const handleSeeMore = () => {
    setActivitiesToShow(activitiesToShow + 4);
  };

  const mapActivities = (activityArray: Activity[]) => {
    return activityArray.map((activity) => (
      <div
        key={activity._id}
        className="cursor-pointer"
        onClick={() => handleActivityClick(activity)}
      >
        <ActCard
          name={activity.activity_name}
          tags={activity.activity_description.tag}
          image={activity.activity_image || "image.png"}
          member={activity.membered_user.length}
          start_date={new Date(activity.activity_description.start_date)}
          end_date={new Date(activity.activity_description.end_date)}
        />
      </div>
    ));
  };

  return (
    <div className="p-40 mq450:p-8 mq750:p-16 pt-32 -mt-20">
      {showActivityDetail && (
        <ActivityInfo
          key={selectedActivity?.activity_name}
          activity_name={selectedActivity?.activity_name}
          activity_description={selectedActivity?.activity_description}
          activity_image={selectedActivity?.activity_image}
          activity_contact={selectedActivity?.activity_contact}
          membered_user={selectedActivity?.membered_user}
          activity_recruit={selectedActivity?.activity_recruit}
          user_id={haveToken?.id}
          user_name={haveToken?.name}
          activity_id={selectedActivity?._id}
          activity_owner={selectedActivity?.activity_owner}
          onJoin={() => handleJoin()}
          onClose={() => handleActivityClose()}
        />
      )}
      <div className="flex flex-col space-y-14">
        {/* กิจกรรมทั้งหมด */}
        <HeadText text="กิจกรรมทั้งหมด" haveBg={false} />
        <div className="flex flex-row flex-wrap gap-y-5 gap-x-14 mq450:justify-center">
          {activities
            .slice()
            .sort((a, b) => {
              const endDateA = new Date(a.activity_description.end_date);
              const endDateB = new Date(b.activity_description.end_date);
              const hasEndedA = hasActivityEnded(a);
              const hasEndedB = hasActivityEnded(b);

              if (!hasEndedA && !hasEndedB) {
                return (
                  new Date(a.activity_description.start_date) -
                  new Date(b.activity_description.start_date)
                );
              }

              if (!hasEndedA) {
                return -1;
              }

              if (!hasEndedB) {
                return 1;
              }

              return (
                new Date(a.activity_description.start_date) -
                new Date(b.activity_description.start_date)
              );
            })
            .slice(0, activitiesToShow)
            .map((activity) => (
              <div
                key={activity._id}
                className="cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <ActCard
                  name={activity.activity_name}
                  tags={activity.activity_description.tag}
                  image={activity.activity_image || "image.png"}
                  member={activity.membered_user.length}
                  start_date={
                    new Date(activity.activity_description.start_date)
                  }
                  end_date={new Date(activity.activity_description.end_date)}
                />
              </div>
            ))}
        </div>
        {activitiesToShow < activities.length && (
          <button onClick={handleSeeMore} className="bg-white">
            <div className="cursor-pointer flex flex-rows justify-center items-center space-x-2 text-cmu-purple text-13xl font-extrabold">
              <p>ดูเพิ่มเติม</p>
              <FontAwesomeIcon icon="fa-solid fa-angle-down" />
            </div>
          </button>
        )}
        {/* กิจกรรมผู้คนสนใจ */}
        <HeadText text="กิจกรรมที่ช่วงนี้ผู้คนสนใจ" haveBg={false} />
        <div className="flex flex-row flex-wrap gap-y-5 gap-x-14 mq450:justify-center">
          {activities
            .filter(
              (activity) =>
                new Date(activity.activity_description.end_date) > new Date()
            )
            .slice()
            .sort((a, b) => b.membered_user.length - a.membered_user.length)
            .slice(0, 4)
            .map((activity) => (
              <div
                key={activity._id}
                className="cursor-pointer"
                onClick={() => handleActivityClick(activity)}
              >
                <ActCard
                  name={activity.activity_name}
                  tags={activity.activity_description.tag}
                  image={activity.activity_image || "image.png"}
                  member={activity.membered_user.length}
                  start_date={
                    new Date(activity.activity_description.start_date)
                  }
                  end_date={new Date(activity.activity_description.end_date)}
                />
              </div>
            ))}
        </div>
        {/* กิจกรรมแนะนำ */}
        {userTag && <HeadText text="กิจกรรมแนะนำ" haveBg={false} />}
        {userTag && (
          <div className="flex flex-row flex-wrap gap-y-5 gap-x-14 mq450:justify-center">
            {activities
              .filter((activity) => {
                if (userTag && userTags.length >= 3) {
                  const commonTags = userTags.filter((tag) =>
                    activity.activity_description.tag.includes(tag)
                  );
                  return commonTags.length >= 1;
                }
                return false;
              })
              .slice()
              .sort((a, b) => {
                const endDateA = new Date(a.activity_description.end_date);
                const endDateB = new Date(b.activity_description.end_date);
                const hasEndedA = hasActivityEnded(a);
                const hasEndedB = hasActivityEnded(b);

                if (!hasEndedA && !hasEndedB) {
                  return (
                    new Date(a.activity_description.start_date) -
                    new Date(b.activity_description.start_date)
                  );
                }

                if (!hasEndedA) {
                  return -1;
                }

                if (!hasEndedB) {
                  return 1;
                }

                return (
                  new Date(a.activity_description.start_date) -
                  new Date(b.activity_description.start_date)
                );
              })
              .slice(0, 4)
              .map((activity) => (
                <div
                  key={activity._id}
                  className="cursor-pointer"
                  onClick={() => handleActivityClick(activity)}
                >
                  <ActCard
                    name={activity.activity_name}
                    tags={activity.activity_description.tag}
                    image={activity.activity_image || "image.png"}
                    member={activity.membered_user.length}
                    start_date={
                      new Date(activity.activity_description.start_date)
                    }
                    end_date={new Date(activity.activity_description.end_date)}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityList;
