import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import GithubContext from "../context/github/githubContext";

const Search = ({ setAlert }) => {
    const githubContext = useContext(GithubContext);
    const [text, setText] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if (text === "") {
            setAlert("Do not leave search field blank", "light");
        } else {
            githubContext.searchUsers(text);
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
                {githubContext.users.length > 0 && (
                    <button type='button' className='btn btn-light btn-block' onClick={githubContext.clearUsers}>
                        Clear Users
                    </button>
                )}
            </form>
        </div>
    );
};

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
};

export default Search;
