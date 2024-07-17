import React from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem 0;
  padding-left: 2.5rem;

  .user-icon,
  .user-avatar {
    width: 50px; /* Increased icon size */
    height: 50px; /* Increased icon size */
    border-radius: 50%;
    margin-right: 20px; /* Increased margin for better spacing */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color);
    color: var(--text-secondary-color);
    font-size: 20px; /* Adjust icon size */
  }

  .user-details {
    display: grid;
    grid-template-rows: auto auto; /* Two rows */
    gap: 5px; /* Gap between the rows */
  }

  .user-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--text-primary-color);
  }

  .user-email {
    font-size: 16px;
    color: var(--text-secondary-color);
  }
`;

const SmallUserCard = ({ user }) => {
  return (
    <Wrapper>
      {user.avatar ? (
        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
      ) : (
        <div className="user-icon">
          <FaUserCircle />
        </div>
      )}
      <div className="user-details">
        <p className="user-name">{user.name}</p>
        <p className="user-email">{user.email}</p>
      </div>
    </Wrapper>
  );
};

export default SmallUserCard;
