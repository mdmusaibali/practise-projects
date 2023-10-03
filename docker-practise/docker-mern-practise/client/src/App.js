import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("/api/users");
    const data = await response.data;
    if (data && data.users) setUsers(data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const changeHandler = (e) => {
    const name = e.target.name;

    setFormData((prevData) => {
      return { ...prevData, [name]: e.target.value };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/user", formData);
    const data = await response.data;
    if (data && data.user) setUsers((prevUsers) => [...prevUsers, data.user]);
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          required
        />
        <button>Submit</button>
      </form>
      <div>
        <h1>Users:</h1>
        {users &&
          users.map((user, i) => (
            <div key={i}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
