import React, { Fragment, useState } from "react";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import userObject from "./users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";
import axios from "axios";

const App = () => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const searchUsers = async text => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        console.log(res.data.items);
        setUsers(res.data.items);
        setLoading(false);
    };

    const getUser = async username => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        console.log(res.data);
        setUser(res.data);
        setLoading(false);
    };

    const getUserRepos = async username => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=8&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        console.log(res.data);
        setRepos(res.data);
        setLoading(false);
    };

    const clearUsers = () => {
        console.log("Clearing Users state");
        setUsers([]);
        setLoading(false);
    };

    const showAlert = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => setAlert(null), 5000);
    };

    return (
        <Router>
            <NavBar title='Github Finder' icon='fa-brands fa-github' />
            <div className='container'>
                <Alert alert={alert} />
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <Fragment>
                                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert} />
                                <Users users={users} loading={loading} />
                            </Fragment>
                        }
                    />
                    <Route exact path='user/:login' element={<User getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading} />} />
                    <Route exact path='about' element={<About />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
