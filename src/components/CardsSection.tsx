import { useEffect, useState } from "react";
import useRetreats from "../hooks/useRetreats";
import ContentCard from "./ContentCard";
import SkeletonCard from "./SkeletonCard";

function CardsSection() {
  const { data, isLoading, isError } = useRetreats();

  const [page, setPage] = useState(1);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const limit = 3;
  let totalPage;
  let filteredData;

  const formatCustomDate = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    const [year] = formattedDate.replace(",", "").split(" ");

    return `${year}`;
  };

  useEffect(() => {
    if (data) {
      const types = new Set<string>(
        data
          .map((retreat) => retreat.type)
          .filter((type): type is string => type !== undefined)
      );
      setUniqueTypes([...types]);
    }
  }, [data]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.toLowerCase());
    setPage(1);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
    setPage(1);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setPage(1);
  };

  filteredData = data?.filter((retreat) => {
    const matchesTitle = retreat.title.toLowerCase().includes(searchInput);
    const matchesDate =
      selectedDate === "" || formatCustomDate(retreat.date) === selectedDate;
    const matchesType = selectedType === "" || retreat.type === selectedType;

    return matchesTitle && matchesDate && matchesType;
  });

  totalPage = filteredData ? Math.ceil(filteredData.length / limit) : 1;

  filteredData = filteredData?.slice((page - 1) * limit, page * limit);

  if (isError)
    return (
      <h1 className="text-red-500 text-2xl text-center mt-5">
        Something bad happened!
      </h1>
    );

  return (
    <>
      <div className="rounded-md overflow-hidden hidden sm:block">
        <div className="custom-bg-color py-3 px-5">
          <div className="card-img">
            <img src="/yoga-dummy.webp" className="rounded-md w-full" />
          </div>
          <h3 className="font-semibold text-xl py-4">
            Discover Your Inner Peace
          </h3>
          <p className="pb-2">
            Join us for a series of wellness retreats designed to help you find
            tranquility and rejuvenation.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between my-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <select
            id="date"
            className="bg-slate-200 outline-none border-2 border-slate-300 sm:border-none sm:bg-blue-950 text-gray-600 sm:text-white p-2 rounded-md cursor-pointer"
            onChange={handleDateChange}
          >
            <option value="">Filter by Date</option>
            <option value="2024">2024-2025</option>
            <option value="2023">2023-2024</option>
          </select>
          <select
            id="type"
            className="bg-slate-200 outline-none border-2 border-slate-300 sm:border-none sm:bg-blue-950 text-gray-600 sm:text-white p-2 rounded-md cursor-pointer"
            onChange={handleTypeChange}
          >
            <option value="">Filter by Type</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search retreats by title"
          className="bg-white outline-none border-2 border-slate-200 sm:border-none sm:bg-blue-950 text-gray-600 sm:text-white p-2 rounded-md placeholder-gray-600 sm:placeholder-slate-400 w-full sm:w-1/3 pl-4 mt-5 sm:mt-0"
          onChange={handleSearchInput}
        />
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: limit }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : filteredData?.map((post) => (
                <ContentCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  price={post.price}
                  date={post.date}
                  location={post.location}
                  image={post.image}
                />
              ))}
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-950 text-white rounded-3xl sm:rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((old) => old + 1)}
            disabled={page === totalPage}
            className="px-4 py-2 bg-blue-950 text-white rounded-3xl sm:rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CardsSection;
