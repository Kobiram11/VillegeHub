import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
	render() {
		return (
			<nav className="col-md-2 d-none d-md-block bg-light sidebar">
	    		<ul className="nav flex-column">
	    			<li className="nav-item">
	    				<NavLink to="/" onlyActiveOnIndex={true} className="nav-link" activeClassName="active">
	    					<i className=""></i>
	    				</NavLink>
	    			</li>
	    			<li>
                		<NavLink to="" className="nav-link" activeClassName="active">
                			<i className=""></i>
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="" className="nav-link" activeClassName="active">
                			<i className=""></i>
                		</NavLink>
            		</li>
            		<li>
                		<NavLink to="" className="nav-link" activeClassName="active">
                			<i className=""></i>
                		</NavLink>
            		</li>
	    		</ul>
			</nav>
		);
	}
}
