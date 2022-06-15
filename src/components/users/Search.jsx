import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, showClear, setAlert, clearUsers }) => {
    const [text, setText] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if (text === "") {
            setAlert("Do not leave search field blank", "light");
        } else {
            searchUsers(text);
            setText("");
        }
    };

    const onChange = e => {
        setText(e.target.value);
    };

    return (
        <div>
            <form action='' className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search users...' value={text} onChange={onChange} />
                <input type='submit' value='Search' className='btn btn-dark btn-block' />
                {showClear && (
                    <button type='button' className='btn btn-light btn-block' onClick={clearUsers}>
                        Clear Users
                    </button>
                )}
            </form>
        </div>
    );
};

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
};

export default Search;
