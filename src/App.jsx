import React, { Fragment } from "react";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";

import GithubSate from "./components/context/github/GithubState";
import AlertSate from "./components/context/alert/AlertState";

const App = () => {
    return (
        <GithubSate>
            <AlertSate>
                <Router>
                    <NavBar title='Github Finder' icon='fa-brands fa-github' />
                    <div className='container'>
                        <Alert />
                        <Routes>
                            <Route
                                exact
                                path='/'
                                element={
                                    <Fragment>
                                        <Search />
                                        <Users />
                                    </Fragment>
                                }
                            />
                            <Route exact path='user/:login' element={<User />} />
                            <Route exact path='about' element={<About />} />
                        </Routes>
                    </div>
                </Router>
            </AlertSate>
        </GithubSate>
    );
};

export default App;
