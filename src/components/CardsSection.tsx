import { useEffect, useState } from "react";
import useRetreats from "../hooks/useRetreats";
import ContentCard from "./ContentCard";
import SkeletonCard from "./SkeletonCard";

function CardsSection() {
  const { data, isLoading, isError } = useRetreats();

  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);

  const limit = 3;
  let totalPage;

  const filteredData = data?.slice((page - 1) * limit, page * limit);

  totalPage = data ? Math.ceil(data.length / limit) : 1;

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
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option defaultValue="">Filter by Date</option>
            <option value="2024">2024-2025</option>
            <option value="2023">2023-2024</option>
          </select>
          <select
            id="type"
            className="bg-slate-200 outline-none border-2 border-slate-300 sm:border-none sm:bg-blue-950 text-gray-600 sm:text-white p-2 rounded-md cursor-pointer"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option defaultValue="">Filter by Type</option>
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
        />
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: limit }).map((s, idx) => (
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
