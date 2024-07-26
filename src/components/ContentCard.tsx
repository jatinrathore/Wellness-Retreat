import { RetreatsType } from "../services/api-client";

function ContentCard(props: RetreatsType) {
  const formatCustomDate = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    const [month, day, year] = formattedDate.replace(",", "").split(" ");

    return `${month} ${day}, ${year}`;
  };

  return (
    <div className="custom-bg-color rounded-md overflow-hidden cursor-pointer sm:hover:bg-[#e0d9cfab] transition-all">
      <div className="card-img p-5">
        <img
          src={props.image}
          alt=""
          className="rounded-md w-full sm:w-60 h-56"
        />
      </div>
      <div className="card-info px-5">
        <h3 className="card-title text-lg font-semibold mb-3">{props.title}</h3>
        <p className="card-description mb-3 text-sm">{props.description}</p>
        <span className="card-date flex gap-1 text-sm mb-2">
          <p>Date: </p>
          <p>{formatCustomDate(props.date)}</p>
        </span>
        <span className="card-location flex gap-1 text-sm mb-2">
          <p>Location: </p>
          <p>{props.location}</p>
        </span>
        <span className="card-price flex gap-1 text-sm mb-5 font-semibold">
          <p>Price: </p>
          <p>{props.price}</p>
        </span>
      </div>
    </div>
  );
}

export default ContentCard;
