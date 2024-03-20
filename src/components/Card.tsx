import { FunctionComponent, useState, useEffect } from "react";
// import axios from 'axios'


interface ActivityCardProps{
  activity_name: string;
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
  activity_recruit: [{
    recruit_role: string;
    recruit_count: number;
    recruit_description?: string;
    recruit_member: string[]
  }];
  onClick: () => void;
}

const ProjectCard: FunctionComponent<ActivityCardProps> = ({activity_name, activity_description, activity_image, membered_user, onClick}) => {
  
  const [countdown, setCountdown] = useState<string>('')

  // const [data, setData] = useState<ActivityCardProps>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(null)
  
  //useEffect for retrieve data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Set loading to true while fetching data
  //       setLoading(true);

  //       // Fetch data from the server
  //       const response = await axios.get<ActivityCardProps>('http://localhost:4000/activity//info-activity/65dd0a70b8d733d2ebdc3efc');

  //       // Update the state with the fetched data
  //       setData(response.data);
  //     } catch (error) {
  //       // Set error state if there is an error
  //       setError(error.message || 'An error occurred');
  //     } finally {
  //       // Set loading to false whether the request was successful or not
  //       setLoading(false);
  //     }
  //   };

    // Call the fetchData function when the component mounts
  //   fetchData();
  // }, []);

  //useEffect for countdown logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = activity_description.end_date.getTime();
      const diff = end - now;
      // const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      // const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      // const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      // const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown('${days}d ${hours}h ${minutes}m');
      if(diff < 0) {
        clearInterval(interval);
        setCountdown('Ended');
      }

  }, 1000);
  return () => clearInterval(interval);
}, [activity_description.end_date]);

  return(
    <div className="activity-card" onClick={onClick}>
      <img src={activity_image} alt={activity_name} />
      <h2>{activity_name}</h2>
      <p>Tags: {activity_description.tag.join(', ')}</p>
      <p>Members: {membered_user.length}</p>
      {/* <p>End Date: {activity_description.end_date}</p> */}
      <p>Countdown: {countdown}</p>
    </div>
  )
};

export default ProjectCard;
