import { useState, useEffect } from "react";
import axios from "axios";

interface APIResponse {
  id: number;
  title: string;
  image: string;
  price: number;
}

const API_URL = "https://fakestoreapi.com/products";

const Table = () => {
  const [APIs, setAPIs] = useState<APIResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<APIResponse[]>(API_URL);
        setAPIs(response.data);
      } catch (error) {
        console.error("Error fetching APIs:", error);
      }
    };

    fetchData();
  }, []);

  const sortedAPIs = APIs.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA < titleB) {
      return sortAscending ? -1 : 1;
    }
    if (titleA > titleB) {
      return sortAscending ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <div className="container">
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => setSortAscending(!sortAscending)}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white py-2 px-4 rounded-full shadow hover:shadow-lg transition duration-300 ease-in-out"
          >
            {sortAscending ? "Sort Descending" : "Sort Ascending"}
          </button>

          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md w-[50%] "
          />
        </div>
        <div className="sm:grid-cols-2 sm:gap-0 grid grid-cols-4 place-items-center justify-center gap-3">
          {sortedAPIs.map((item) => {
            return (
              <div
                key={item.id}
                className="sm:w-[92%] submain flex justify-center border m-2 w-[80%] p-2 max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
              >
                <div>
                  <img
                    src={item.image}
                    alt=""
                    className="sm:max-w-[150px] sm:h-[150px] m-auto max-w-[200px] h-[200px]"
                  />
                  <div className="w-full">
                    <span>
                      <b>{item.title?.slice(0, 30)}</b>
                    </span>
                    <p>
                      Rs: <b>{item.price}</b>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Table;
