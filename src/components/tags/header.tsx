import React, { Component, useState } from 'react';
import logo from '../../asset/github-logo.png';
import { useHistory } from 'react-router-dom';

const Header = () => {

    let history = useHistory();    
    const [searchTerm, setSearch] = useState('');

    const onChange = (e) => {
        setSearch(e.currentTarget.value);
        console.log(searchTerm)
    };

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            console.log(searchTerm)
            history.push("/results/" + searchTerm)
        }
    }

    return (
        <div className="row shadow-sm bg-white rounded">
            <div className="col-md-4">
            <img src={logo} alt="github logo" width="180" height="100"  />
            </div>
            <div className="col-md-4 mt-2">
                <div className="form-group has-search mt-4">
                    <span className="form-control-feedback" id="header-search">
                        <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path fill='#5c5c5c' d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z" />
                        </svg>
                    </span>
                    <input type="text" className="form-control border-end-0 border rounded-pill p-3" onChange={onChange} onKeyDown={onSearch}/>
                </div>
            </div>
            <div className="col-md-4">
            <div className="float-right mt-4">
                <div id="user-image" >

                </div>
                <ul className="list-group w-25 position-absolute" id="logout">
                <li className="list-group-item text-danger">Logout</li>
            </ul>
            </div>
            </div>
        </div>
        
    )
}


export default Header;