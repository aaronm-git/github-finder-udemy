import React, { Fragment, useState } from "react";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
// import userObject from "./users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";
import axios from "axios";
import GithubSate from "./components/context/github/GithubState";
const App = () => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const getUserRepos = async username => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=8&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        console.log(res.data);
        setRepos(res.data);
        setLoading(false);
    };

    const showAlert = (msg, type) => {
        setAlert({ msg, type });
        setTimeout(() => setAlert(null), 5000);
    };

    return (
        <GithubSate>
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
                                    <Search setAlert={showAlert} />
                                    <Users />
                                </Fragment>
                            }
                        />
                        <Route exact path='user/:login' element={<User getUserRepos={getUserRepos} repos={repos} />} />
                        <Route exact path='about' element={<About />} />
                    </Routes>
                </div>
            </Router>
        </GithubSate>
    );
};

export default App;
