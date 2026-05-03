import { useContext, useState } from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import PropTypes from "prop-types";

const Card = ({ id, name, email, phone, website, company, address }) => {
  const { deleteUser } = useContext(StoreContext);
  const [showCompanyDetails, setShowCOmpanyDetails] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="user-card">
      <div className="basic-details">
        <p>
          {" "}
          <strong>Id : </strong> {id}
        </p>
        <p>
          {" "}
          <strong>Name : </strong>
          {name}
        </p>
      </div>
      <div className="user-contact-details">
        <p>
          <strong>Phone No. : </strong>
          {phone}
        </p>
        <p>
          <strong>Email : </strong>
          {email}
        </p>
        <p>
          <strong>Website :</strong> {website}
        </p>
      </div>
      {showCompanyDetails ? (
        <div className="show-company-details">
          <div className="show-company-details-heading">
            <h5>Company Details</h5>
            <button
              className="show-company-button"
              onClick={() => setShowCOmpanyDetails(false)}
            >
              X
            </button>
          </div>

          <p>
            <strong>Company Name :</strong> {company.name}
          </p>
          <p>
            <strong>Catch Phrase : </strong> {company.catchPhrase}
          </p>
          <p>
            <strong> BS : </strong> {company.bs}
          </p>
        </div>
      ) : (
        <></>
      )}
      {showAddress ? (
        <div className="show-address">
          <div className="show-address-heading">
            <h5>Address Details</h5>
            <button
              className="show-address-button"
              onClick={() => setShowAddress(false)}
            >
              X
            </button>
          </div>
          <p>
            <strong>Address :</strong> 
            <span>{address.street} </span>
            <span>{address.suite} </span>
            <span>{address.city} </span>
            <span>{address.zipcode} </span>
          </p>
        </div>
      ) : (
        <></>
      )}
      {/* <div className="other-details">
        <p>
          <strong>Company Name :</strong> {company}
        </p>
      </div> */}
      <div className="action-buttons">
        <button onClick={() => navigate(`/edit/${id}`)} className="edit-user">
          Edit
        </button>
        <button onClick={() => setShowCOmpanyDetails(true)}>
          Company Details
        </button>
        <button onClick={() => setShowAddress(true)}>View Address</button>
        <button onClick={() => deleteUser(id)} className="delete-user">
          Delete
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  company: PropTypes.shape({
    name: PropTypes.string,
    catchPhrase: PropTypes.string,
    bs: PropTypes.string,
  }).isRequired,
  address: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
  }).isRequired,
};

export default Card;
