import React from 'react';
import LoginGithub from 'react-login-github';
import axios from 'axios'
import { useHistory } from "react-router-dom"


const clientID = process.env.REACT_APP_CLIENT_ID;

    
function Login() {
    let history = useHistory();

    const onSuccess = response => {
        console.log(response.code)
        console.log('I am successful')
        if (response.code) {
            axios.post('https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth', {
                code: response.code
          })
                .then(function (response) {
                    localStorage.setItem('access_token', response.data.data.access_token);
                    history.push("/home")
            console.log(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });  
        }
        
    };
    const onFailure = response => console.error(response);


    return(
        <div className="outer">
            <div className="middle">
                <div className="inner">
                    <LoginGithub className="btn btn-login px-4 py-2" buttonText="Login to Github" clientId={clientID}
                    onSuccess={onSuccess}
                    onFailure={onFailure}/>
                </div>
            </div>
        </div>
    )
}


export default Login;