import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import NotFound from "./components/pages/404";

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
                            <Route exact path='/' element={<Home />} />
                            <Route exact path='user/:login' element={<User />} />
                            <Route exact path='about' element={<About />} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            </AlertSate>
        </GithubSate>
    );
};

export default App;
