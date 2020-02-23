import * as React from 'react'; 
import DictionaryService from '../services/DictionaryService';
import DictionaryItemDto from '../services/dto/DictionaryItemDto';

interface IDictionaryFieldReadComponent{
    itemName,
    itemId,
}



export class DictionaryFieldReadComponent extends React.Component<IDictionaryFieldReadComponent>{

    state = {
        dictionaryItems : new Array<DictionaryItemDto>()
    }

    dictionaryService = new DictionaryService();
    componentDidMount(){
        
        this.dictionaryService.GetAllHairColors().then(result=>{
            this.setState({
                dictionaryItems : this.state.dictionaryItems.concat(result)
            })
        })

        this.dictionaryService.GetAllEyesColors().then(result=>{
            this.setState({
                dictionaryItems : this.state.dictionaryItems.concat(result)
            })

        })
    }

    render(){
        const item = this.state.dictionaryItems.find(x=> x.id === this.props.itemId);
        let displayResult=''
        if(item!==undefined){
            displayResult= `${this.props.itemName}: ${item.displayName}`;
        }
        return (
                <>
                    {displayResult}
                </>
            )
        
    }
}