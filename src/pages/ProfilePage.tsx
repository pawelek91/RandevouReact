import React from 'react';
import { Redirect } from 'react-router';
import { ApiQueryService } from '../services/ApiQueryService';

class ProfilePage extends React.Component{

    service = new ApiQueryService();
render(){
    
    const apiKey = this.service.GetApiKey();
  
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