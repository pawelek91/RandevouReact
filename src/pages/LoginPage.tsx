import React from 'react';
import {ApiAuthDto} from '../services/dto/ApiAuthDto'
import AuthenticationService from '../services/AuthenticationService';
class LoginPage extends React.Component{

    state = {
        login: "",
        password:""
    }
    
    handleLogin =() =>{
        const dto: ApiAuthDto = {Password: this.state.password, UserName:this.state.login};
        const authService = new AuthenticationService();
        authService.LoginUser(dto);
    }

    handleFieldChanged = (e : any) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    render(){
        return (
            <>
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