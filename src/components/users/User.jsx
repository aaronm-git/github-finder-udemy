import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const User = ({ user, getUser, loading }) => {
    const username = useParams().login;
    useEffect(() => {
        console.log("useEffect:", username);
        getUser(username);
    }, []);

    const { name, avatar_url, location, bio, blog, login, html_url, company, followers, following, public_repos, public_gists, hirable } = user;
    if (loading) {
        return <Spinner />;
    } else
        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>
                    Back To Search
                </Link>
                Hirable: {hirable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger' />}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img src={avatar_url} alt='Github user profile picture' className='round-img' style={{ width: "150px" }} />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                        )}
                        <a href={html_url} className='btn btn-dark my-1' target='_blank'>
                            Visit Github Profile
                        </a>
                        <ul>
                            {login && (
                                <li>
                                    <strong>Username: </strong> {login}
                                </li>
                            )}
                            {company && (
                                <li>
                                    <strong>Company: </strong> {company}
                                </li>
                            )}
                            {blog && (
                                <li>
                                    <strong>Website: </strong>{" "}
                                    <a href={blog} target='_blank'>
                                        Link
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-primary'>strong: {followers}</div>
                    <div className='badge badge-success'>Following: {following}</div>
                    <div className='badge badge-light'>Public Repos: {public_repos}</div>
                    <div className='badge badge-dark'>Public Gists: {public_gists}</div>
                </div>
            </Fragment>
        );
};

User.propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired
};

export default User;
