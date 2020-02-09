import React from 'react';
import { Redirect } from 'react-router';
import { ApiQueryService } from '../services/ApiQueryService';

class MessagesPage extends React.Component{
state={

}

apiQueryService = new ApiQueryService();
render(){
    
    const apiKey = this.apiQueryService.GetApiKey();
  
    if(apiKey === undefined || apiKey === null || apiKey===''){
        return <Redirect to='/login'/>
    }

    return(
    <div className="Friends">
        Messages
    </div>
    )
}

}

export default MessagesPage;