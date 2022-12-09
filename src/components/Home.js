import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);
  const [search,setSearch]=useState('')
  
  useEffect(() => {
    loadUsers();
  }, [search]);

  const loadUsers = async () => {
    const result=await axios.get(`http://localhost:3003/vegbucket?q=${search}&limit=20`)
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="py-4">
      <div className="search-box">
              <input type="search" placeholder="Search item/category" 
              onChange={(e)=>setSearch(e.target.value)}/>
          </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
            <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { 
            users.map((user, index) => (              
              <tr>
                <th scope="row">{index + 1}</th>
                
                <td> {user.name} </td>
                <td>{user.category}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/vegbucket/${user.id}`}>
                    Purchase
                  </Link>
           
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
