import React, { useState } from "react";
import ReactDOM, { render } from "react-dom";
import { Router, Route, Link, Switch, BrowserRouter } from "react-router-dom";
import Submitting from "./Submitting";
import Searching from "./Searching";

const Homepage = () => {
    return (
        <div>
            <p className="line-1 anim-typewriter">
                / * * * Computation Oncology <br />
                /* * * cell database V0.01 <br />
                /* * * Authored by OMG * * */
            </p>

            <h1>A temp Demo</h1>
            <h3>Use searching for query and Submitting new data for submission</h3>
            <h4>Currently very basic</h4>
        </div>
    );
};
const logo = require("./public/CCO_Logoweb.png");
const App = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">
                <img src={logo} width="300" height="80" />
            </div>
            <div className=" navbar-expand" id="navbarNav">
                <ul className="navbar-nav">
                    <Link to="/">
                        <li className="nav-item active">
                            <div className="nav-link">
                                Home <span className="sr-only">(current)</span>
                            </div>
                        </li>
                    </Link>
                    <Link to="/searching">
                        <li className="nav-item">
                            <div className="nav-link">Search</div>
                        </li>
                    </Link>
                    <Link to="/submitting">
                        <li className="nav-item">
                            <div className="nav-link">Submit</div>
                        </li>
                    </Link>
                </ul>
            </div>
        </nav>
    );
};

ReactDOM.render(
    <BrowserRouter>
        <Route path="/" component={App} />
        <Route exact path="/" component={Homepage} />
        <Route path="/searching" component={Searching} />
        <Route path="/submitting" component={Submitting} />
    </BrowserRouter>,
    document.getElementById("root")
);
