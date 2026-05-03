import { useContext, useEffect, useState } from "react";
import "./Edit.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { usersData, updateUser } = useContext(StoreContext);
  const [user, setUser] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [showCompany, setShowCompany] = useState(false);


  useEffect(() => {
    const selectedUser = usersData.find((user) => (user._id || user.id) === id);
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [id, usersData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "suite", "zipcode"].includes(name)) {
      setUser((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else if (["lat", "lng"].includes(name)) {
      setUser((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          geo: {
            ...prevData.address.geo,
            [name]: value,
          },
        },
      }));
    } else if (["bs", "catchPhrase", "name"].includes(name)) {
      setUser((prevData) => ({
        ...prevData,
        company: {
          ...prevData.company,
          [name]: value,
        },
      }));
    } else {
      setUser((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(updateUser);

    if (user) {
      updateUser(id, user);
      navigate("/users");
    }
  };

  if (!user) {
    return <div>Loading......</div>;
  }

  return (
    <div className="edit">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </label>
        <label>
          UserName :
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number :
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Email :
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Website :
          <input
            type="text"
            name="website"
            value={user.website}
            onChange={handleChange}
          />
        </label>
        {showAddress ? (
          <label >
            <span className="label-heading" onClick={() => setShowAddress(false)}>Address :</span>
            <input
              type="text"
              name="street"
              value={user.address.street}
              onChange={handleChange}
              placeholder="Street"
            />
            <input
              type="text"
              name="suite"
              value={user.address.suite}
              onChange={handleChange}
              placeholder="Suite"
            />
            <input
              type="text"
              name="city"
              value={user.address.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              type="text"
              name="zipcode"
              value={user.address.zipcode}
              onChange={handleChange}
              placeholder="Zipcode"
            />
          </label>
        ) : (
          <div className="expand-buttons" onClick={() => setShowAddress(true)}>
            Click here to edit address
          </div>
        )}

        {
          showCompany ? (
            <label>
              <span className="label-heading" onClick={() => setShowCompany(false)}>
          Company :
              </span>
          <input
            type="text"
            name="name"
            value={user.company.name}
            onChange={handleChange}
            placeholder="Company Name"
          />
          <input
            type="text"
            name="bs"
            value={user.company.bs}
            onChange={handleChange}
            placeholder="BS"
          />
          <input
            type="text"
            name="catchPhrase"
            value={user.company.catchPhrase}
            onChange={handleChange}
            placeholder="Catch Phrase"
          />
        </label>
          ) : (
            <div className="expand-buttons" onClick={() => setShowCompany(true)}>
              Click here to edit company details
            </div>
          )
        }

        

        <button type="submit">Update User Details</button>
      </form>
    </div>
  );
};

export default Edit;
