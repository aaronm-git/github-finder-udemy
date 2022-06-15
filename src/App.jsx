import React, { Fragment } from "react";
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
class App extends React.Component {
    state = {
        user: {},
        users: [],
        loading: false,
        alert: null
    };

    // async componentDidMount() {
    //     this.setState({ loading: true });
    //     // this.setState({ users: userObject });
    //     const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //     console.log(res.data);
    //     this.setState({ users: res.data, loading: false });
    // }

    getUser = async username => {
        console.log("getUser: ", username);
        this.setState({ loading: true });

        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        console.log(res.data);
        this.setState({ user: res.data, loading: false });
    };

    searchUsers = async text => {
        console.log(text);
        this.setState({ loading: true });

        if (!text) {
            const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
            console.log(res.data);
            this.setState({ users: res.data, loading: false });
        } else {
            const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
            console.log(res.data.items);
            this.setState({ users: res.data.items, loading: false });
        }
    };

    clearUsers = () => {
        console.log("clear");
        this.setState({ users: [], loading: false });
    };

    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });
        setTimeout(() => this.setState({ alert: null }), 5000);
    };

    render() {
        return (
            <Router>
                <NavBar title='Github Finder' icon='fa-brands fa-github' />
                <div className='container'>
                    <Alert alert={this.state.alert} />
                    <Routes>
                        <Route
                            exact
                            path='/'
                            element={
                                <Fragment>
                                    <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true : false} setAlert={this.setAlert} />
                                    <Users users={this.state.users} loading={this.state.loading} />
                                </Fragment>
                            }
                        />
                        <Route exact path='user/:login' element={<User getUser={this.getUser} user={this.state.user} loading={this.state.loading} />} />
                        <Route exact path='about' element={<About />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
