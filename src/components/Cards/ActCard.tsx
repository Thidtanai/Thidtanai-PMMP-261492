import { FunctionComponent } from "react";

interface ActCardProps {
  name: string;
  start_date: Date;
  end_date: Date;
  tags: string[];
  member: number;
  image: string[];
}

const ActCard: FunctionComponent<ActCardProps> = ({
  name,
  start_date,
  end_date,
  tags,
  member,
  image,
}) => {
  const date_left = Math.ceil(
    (start_date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const isInProgress = date_left <= 0;
  const isPast =
    Math.ceil((end_date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) < 0;

  return (
    <div
      className="w-64 border-solid border border-cmu-purple bg-white drop-shadow-xl shadow-lg shadow-cmu-purple/20 rounded-2xl overflow-hidden"
      style={{ width: "16rem" }}
    >
      <div className="relative">
        {isPast ? (
          <div className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-2xl bg-cmu-purple-shade p-2 px-4 text-white text-sm font-bold">
            สิ้นสุดลงแล้ว
          </div>
        ) : isInProgress ? (
          <div className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-2xl bg-orange p-2 px-4 text-white text-sm font-bold">
            กำลังดำเนินการ
          </div>
        ) : (
          <div className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-2xl bg-cmu-purple p-2 px-4 text-white text-sm font-bold">
            เหลือเวลา {date_left} วัน
          </div>
        )}

        {image && (image.toString() !== "image.png" && image.toString() !== "") ? (
          <img
            className="w-full h-48 object-contain"
            src={image[0]}
            alt="Card image cap"
          />
        ) : (
          <img
            className="w-full h-48 object-none"
            src="https://placehold.co/600x400?text=N"
            alt="Card image cap"
          />
        )}
      </div>
      <div className="px-4 py-2 h-32">
        <div className="flex flex-col w-full h-full">
          <p className="flex flex-row break-words hyphens-manual  mt-0 mb-0 basis-3/4 truncate text-left text-pretty text-cmu-purple text-xl font-semibold">
            {name}
          </p>
          <p className="flex flex-row text-left mt-0 mb-0 basis-1/4 text-sm text-gray-600">
            Tags: {tags.join(", ")}
          </p>
          <div className="flex flex-row w-full justify-between mt-0 mb-0 basis-1/4 text-xs text-gray-600">
            <div className="flex flex-row items-center space-x-1">
              <i className="fa-solid fa-user-group"></i>
              <p>{member}</p>
            </div>
            <div className="flex flex-row items-center">
              <p>Date: </p>
              <p>
                {start_date.toLocaleDateString()} -{" "}
                {end_date.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActCard;
