import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './App.css'

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); // Store selected card IDs

  const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const result = data.users.map((each) => ({
      id: each.id,
      FirstName: each.firstName,
      LastName: each.lastName,
      Email: each.email,
      Age: each.age,
      Phone: each.phone,
    }));
    setData(result);
    setOriginalData(result);
  };

  const api = "https://dummyjson.com/users";
  
  useEffect(() => {
    getData(api);
  }, [search]);

  const removeItem = (id) => {
    const filterData = data.filter((each) => each.id !== id);
    setData(filterData);
    alert("Do you want delete?");
  };

  const displayData = () => {
    if (search === "") {
      setData(originalData);
    } else {
      const findData = originalData.filter((each) => each.id === Number(search));
      if (findData.length > 0) {
        setData(findData);
      } else {
        alert("No user found with the provided ID.");
      }
    }
  };

  const handleCheckboxChange = (id) => {
  
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeSelectedItems = () => {
  
    const filterData = data.filter((each) => !selectedIds.includes(each.id));
    setData(filterData);
    setSelectedIds([]); // Clear the selection after deletion
    alert("Selected items deleted!");
  };

  return (
    <div className="dashboard-container">
      <div className="heading">
        <h1>Employee Dashboard</h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Id"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className="search" onClick={() => displayData()}>
          Search
        </button>
      </div>

    
      {selectedIds.length > 0 && (
        <button className="delete-selected" onClick={removeSelectedItems}>
          Delete Selected
        </button>
      )}

      <div className="employee-data">
        {data.map((each) => (
          <div key={each.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(each.id)}
              onChange={() => handleCheckboxChange(each.id)}
              className="check"
            />
            <Link to={`/details/${each.id}`} className="link">
              <div className="card">
                <h1>ID: {each.id}</h1>
                <h1>FirstName: {each.FirstName}</h1>
                <h2>LastName: {each.LastName}</h2>
                <p>Email: {each.Email}</p>
                <p>Age: {each.Age}</p>
              </div>
            </Link>
            <button onClick={() => removeItem(each.id)}>Delete</button>
            <Link to={`/details/${each.id}`} className="link">
              <button className="display">Display</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
