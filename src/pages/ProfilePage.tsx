import React from 'react';
import { Redirect } from 'react-router';

class ProfilePage extends React.Component{

render(){
    
    const apiKey = localStorage.getItem('apiKey');
  
    if(apiKey === undefined || apiKey === null || apiKey===''){
        return <Redirect to='/login'/>
    }

    return(
        
    <div className="Friends">
        My profile
    </div>
    )
}

}

export default ProfilePage;