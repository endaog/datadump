```
import React, { useState } from "react";

const MyComponent = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/some-endpoint"); // Replace with your API endpoint
      if (!response.ok) throw new Error("Error fetching data");

      const result = await response.json();
      setData(result);

      // Perform some other action after receiving the data
      console.log("Data received:", result);
      someOtherAction(result);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const someOtherAction = (data) => {
    console.log("Doing something else with the data:", data);
    // Your other logic here
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default MyComponent;
