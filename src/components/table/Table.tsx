// import { useState, useEffect } from "react";
// import axios from "axios";

const API_URL = "https://api.publicapis.org/entries";

const Table = () => {
//   const [APIs, setAPIs] = useState([]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(API_URL);
  //         // setAPIs(response.data.entries);
  //         console.log(response)
  //       } catch (error) {
  //         console.error('Error fetching APIs:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);
  const fetchData = async () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {/* {APIs.map((api, index) => (
        <div key={index}>
          <h2>{api?.API_NAME}</h2>
          <p>{api?.DESCRIPTION}</p>
        </div>
      ))} */}
    </div>
  );
};

export default Table;
