import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

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
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const checkCredentials = async () => {
      await axios
        .get("http://localhost:3001/protected", {
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          navigate("/account/login");
          console.log(err);
        });
    };

    checkCredentials();
  });

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
