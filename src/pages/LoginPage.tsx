import React from 'react';
import {ApiAuthDto} from '../services/dto/ApiAuthDto'
import AuthenticationService from '../services/AuthenticationService';
class LoginPage extends React.Component{

    state = {
        login: "",
        password:"",
        apiKey:"",
        authFailed:false,
    }
    
    handleLogin =() =>{
        const dto: ApiAuthDto = {Password: this.state.password, UserName:this.state.login};
        const authService = new AuthenticationService();
        authService.LoginUser(dto)
        .then(response=>{
            if(response === "" || response === undefined){
                this.setState({
                    authFailed:true
                })
            }
            else{ //logged in
            localStorage.setItem('apiKey', response);
            this.setState({
                apiKey: response
            });
        }
        });
        
    }

    handleLogout = () =>{
        this.setState({
            apiKey:""
        });
        localStorage.removeItem('apiKey');
    }

    handleFieldChanged = (e : any) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    render(){
        const apiKey = localStorage.getItem('apiKey');
        const loggedFailedInfo = this.state.authFailed && <p>Nie udało się zalogować</p>;

        if(apiKey !== undefined && apiKey !==null){
            return(
                <>
                <button onClick={this.handleLogout}>Log out</button>
                </>
            )
        }
        
        if(this.state.apiKey === "" || this.state.apiKey === undefined || apiKey ===null)
        return (
            <>
            {loggedFailedInfo}
            Login: <input type="text" id="login" name="login" value={this.state.login} onChange={this.handleFieldChanged}></input>
            <br/>
            Password: <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleFieldChanged}></input>
            <br/>
            <button onClick={this.handleLogin}>Log in</button>
            </>
        )
    }
}

export default LoginPage;