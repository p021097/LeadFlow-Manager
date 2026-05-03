import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const { authLoading, isAuthenticated } = useContext(AuthContext);
  const [usersData, setUsersData] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");

      if (res.status === 200) {
        setUsersData(res.data);
      } else {
        console.error("Unable to fetch users");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setUsersData([]);
        return;
      }

      alert(`Error while fetching the users Error : ${error}`);
      console.error(error);
    }
  };


  const deleteUser = async (id) => {
    try {
      const res = await api.delete(`/users/${id}`);
      if(res.status === 200){
        setUsersData((prev) => prev.filter((user)=> (user._id || user.id) !== id))
      alert("User deleted successfully");

      }
    } catch (error) {
      console.error("Error while deleting user : ", error);
    }
  };

const updateUser = async (id, updatedUser) => {
  try {
    const res = await api.put(`/users/${id}`, updatedUser)
    if(res.status === 200){
      setUsersData((prevData) => prevData.map((user) => ((user._id || user.id) === id ? res.data : user)))
    alert("User updated successfully")
    }else{
      console.error('Error while updating the user');
    }
  } catch (error) {
    console.error(`Error while updating user : `, error);
    alert(`Error : ${error}`)
    
  }
}

const createNewUser = async (formData) => {
  try {
    const res = await api.post("/users", formData)
    if(res.status === 200 || res.status === 201){
      setUsersData((prevData)=>[res.data, ...prevData])
      alert("User Successfully added")
      return { success: true };
    }else{
      console.error("Error while creating new user");
    }
  } catch (error) {
    console.error(`Error occured while creating new User Error :  ${error}`);
    
  }
}


  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated) {
      setUsersData([]);
      return;
    }

    fetchUsers();
  }, [authLoading, isAuthenticated]);

  const contextValue = {
    usersData,
    setUsersData,
    deleteUser,
    updateUser,
    createNewUser
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
