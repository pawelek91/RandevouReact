import React from 'react';
import {ApiAuthDto} from '../services/dto/ApiAuthDto'
import AuthenticationService from '../services/AuthenticationService';
import { ApiQueryService } from '../services/ApiQueryService';
import {connect} from 'react-redux';

interface ILoginProps{
    dispatch:any
}
class LoginPage extends React.Component<ILoginProps>{
    constructor(props){
        super(props);

        const {dispatch} = this.props;
    }

    apiQueryService = new ApiQueryService();
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
            localStorage.setItem('RANDEVOU_APIKEY', response);
            console.log('login:');
            console.log(response);
            this.setState({
                apiKey: response
            });

            authService.GetIdentity(response).then(result=>{
                console.log("identity");
                console.log(result);
                localStorage.setItem('RANDEVOU_IDENTITY',result.toString());

                this.props.dispatch({type:'LOGIN_SUCCESSFUL',
            data:{
                loggedIn : true,
                identity: result.toString(),
                apiKey: response,
            }})
            })
        }
        });
        
    }

    handleLogout = () =>{
        this.setState({
            apiKey:""
        });
        ApiQueryService.ClearLoginInfos();
        this.props.dispatch({type:'LOGOUT'});
    }

    handleFieldChanged = (e : any) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }


    render(){
        const apiKey = this.apiQueryService.GetApiKey();
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

export default connect((state,props)=>{
    return{
        loginProps: state.loginInfo
    }
})(LoginPage) ;