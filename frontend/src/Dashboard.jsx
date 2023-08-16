import axios from "axios";
import { useState, useEffect } from "react";

const createParentChildrenTree = (data, parent) => {
  const children = data.filter((item) => item.parent === parent);
  return children.map((child) => ({
    ...child,
    children: createParentChildrenTree(data, child.id),
  }));
};

const mapParentChildrenTree = (data) => {
  return data.map((item, i) => {
    if (item.children.length) {
      return (
        <details key={i}>
          <summary>{item.name}</summary>
          {mapParentChildrenTree(item.children)}
        </details>
      );
    } else if (item.parent === null) {
      return <div key={i}>{item.name}</div>;
    } else {
      return <div key={i}>{item.name}</div>;
    }
  });
};

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getTerritoriesData = async () => {
      await axios
        .get("http://localhost:3001/territories")
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(response.data.data);
            setData(response.data.data);
          }
        })
        .catch((err) => {
          console.error(err);
          return [];
        });
    };
    getTerritoriesData();
    console.log("Data is: " + data);
  }, []);

  if (data === null) {
    return <div>Loading . . .</div>;
  }
  const tree = createParentChildrenTree(data, null);
  return (
    <div className="container">
      <h2>Territories</h2>
      <div>Here are the list of the territories</div>
      <div>{mapParentChildrenTree(tree)}</div>
    </div>
  );
};

export default Dashboard;
