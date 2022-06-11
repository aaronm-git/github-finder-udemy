import React from "react";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import userObject from "./users";
import "./App.css";
import axios from "axios";
class App extends React.Component {
    state = {
        users: [],
        loading: false
    };

    async componentDidMount() {
        this.setState({ loading: true });
        // this.setState({ users: userObject });
        const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        console.log(res.data);
        this.setState({ users: res.data });
        this.setState({ loading: false });
    }
    render() {
        return (
            <>
                <NavBar title='Github Finder' icon='fa-brands fa-github' />
                <div className='container'>
                    <Users users={this.state.users} loading={this.state.loading} />
                </div>
            </>
        );
    }
}

export default App;
