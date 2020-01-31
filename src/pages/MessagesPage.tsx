import React from 'react';
import { Redirect } from 'react-router';

class MessagesPage extends React.Component{
state={

}
render(){
    
    const apiKey = localStorage.getItem('apiKey');
  
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