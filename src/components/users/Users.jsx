import React from "react";
import UserItem from "./UserItem";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const Users = ({ loading, users }) => {
    if (loading) {
        return <Spinner />;
    } else if (!users.length) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px" }}>
                <p>No users found</p>
            </div>
        );
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}
            </div>
        );
    }
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem"
};

export default Users;
