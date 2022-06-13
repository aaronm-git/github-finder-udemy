import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
    state = {
        text: ""
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.text === "") {
            this.props.setAlert("Do not leave search field blank", "light");
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: "" });
        }
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <form action='' className='form' onSubmit={this.onSubmit}>
                    <input type='text' name='text' placeholder='Search users...' value={this.state.text} onChange={this.onChange} />
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                    <button type='button' className='btn btn-light btn-block' onClick={this.props.clearUsers}>
                        Clear Users
                    </button>
                </form>
            </div>
        );
    }
}

export default Search;
