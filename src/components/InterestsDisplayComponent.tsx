import { Component } from "react";
import DictionaryService from '../services/DictionaryService';
import DictionaryItemDto from "../services/dto/DictionaryItemDto";
import * as React from 'react';

interface IInterestsDisplay{
    ids:Array<Number>   
}

export default class InterestDisplayComponent extends Component<IInterestsDisplay>{

    state={
        userInterests: new Array<DictionaryItemDto>(),
        dataFilled: false,
        ids: new Array<Number>(),
    }

componentDidMount(){
    let ids = this.props.ids;
    this.setState({
        ids
    })
    this.getInterstsData();
}




    getInterstsData = () => {
 
        const userInterstsIds = this.state.ids;
        if(this.state.ids.length < 1){
            return;
        }
        const dictionaryService = new DictionaryService();
        dictionaryService.GetAllInterest().then(result=>{
         
         const userInterests = result.filter(x=> userInterstsIds.indexOf(x.id ?? 0) > -1 );
         this.setState({
             userInterests,
             dataFilled : true,
         })
         if(userInterests.length < 1){
             this.setState({
                userInterests: null
             })
         }
         
        })
    }
    render(){
        
        console.log("Display interests");
    
    if(this.state.dataFilled && this.state.userInterests !==null){
        const dictionaryItem = this.state.userInterests.map(x=>{
            return <li>{x.displayName}</li>
        })
     
    return ( 
        <ul>
            {dictionaryItem}
        </ul>
     );
    }
    else{
        this.getInterstsData();
        return (<></>)
    }
}
}

 
