import { useContext, useState } from "react";
import "./DisplayCards.css";
import { StoreContext } from "../../context/StoreContext";
import Card from "../Card/Card";

const DisplayCards = () => {
  const { usersData } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  const idxOfLastUSer = currentPage * usersPerPage;
  const idxOfFirstUser = idxOfLastUSer - usersPerPage;
  const currentUsers = usersData.slice(idxOfFirstUser, idxOfLastUSer);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="display-cards">
      <h2>Users List</h2>
      <div className="display-users-list">
        {currentUsers.map((user) => {
          return (
            <Card
              key={user._id || user.id}
              id={user._id || user.id}
              name={user.name}
              email={user.email}
              phone={user.phone}
              website={user.website}
              company={user.company}
              address={user.address}
            />
          );
        })}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
            Next
        </button>
      </div>
    </div>
  );
};

export default DisplayCards;
