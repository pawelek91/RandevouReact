import React from 'react';
import { Redirect } from 'react-router';
import DictionaryService from '../services/DictionaryService';
import SearchQueryDto from '../services/dto/SearchQueryDto';
import DictionaryItemDto from '../services/dto/DictionaryItemDto';

class SearchPage extends React.Component{

state={
    queryDto: new SearchQueryDto(),
    interests : new Array<DictionaryItemDto>(),
    eyesColors: new Array<DictionaryItemDto>(),
    hairColors: new Array<DictionaryItemDto>(),
}

dictionaryService = new DictionaryService();

onFieldChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const name=e.target.name;
    const type=e.target.type;

    if(type === "checkbox"){
        this.setState({
            queryDto: {
                ...this.state.queryDto,
            [name]:checked
        }})
    }
    else if(type==="text"){
        
        this.setState({
            
            queryDto: {
                ...this.state.queryDto,
                [name]:value
            }
            
        })
    }
}

componentDidMount(){
     this.dictionaryService.GetAllInterest().then(result=>{
        this.setState({
            intrests:result,
        });
    });
    
    this.dictionaryService.GetAllEyesColors().then(result=>{
        this.setState({
            eyesColors:result
        })
    });
    
    this.dictionaryService.GetAllHairColors().then(result=>{
        this.setState({
            hairColors:result
        })
    })
}
render(){
    console.log(this.state.queryDto);
    const finderStyle={
        display: 'inline-grid',
    }

    const apiKey = localStorage.getItem('apiKey');
  
    if(apiKey === undefined || apiKey === null || apiKey===''){
        return <Redirect to='/login'/>
    }

   
    
    const query = this.state.queryDto;
    
    let eyesColorsFields ;
    if(this.state.eyesColors.length >0){
        eyesColorsFields = this.state.eyesColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }

    let hairColorsFields ;
    if(this.state.eyesColors.length >0){
        hairColorsFields = this.state.hairColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }


    
    console.log("render");
    return(
        
    <div className="Friends">
         <div style={finderStyle}>

            <label htmlFor="userName">Nazwa użytkownika</label>
            <input type="text" id="name" name="name" value={query.name || ""} onChange={this.onFieldChange} />

            <label htmlFor="region">Województwo</label>
            <input type="text" id="region" name="region" value={query.region || ""} onChange={this.onFieldChange} />

            <label htmlFor="city">Miasto</label>
            <input type="text" id="city" name="city" value={query.city || ""} onChange={this.onFieldChange}  />

            <label htmlFor="ageFrom">Wiek od</label>
            <input type="text" id="agefrom" name="agefrom" value={query.agefrom || ""} onChange={this.onFieldChange}  />

            <label htmlFor="ageTo">Wiek do</label>
            <input type="text" id="ageto" name="ageto" value={query.ageto || ""} onChange={this.onFieldChange}  />

            <label htmlFor="widthFrom">Wzrost od</label>
            <input type="text" id="widthfrom" name="widthfrom" value={query.widthfrom || ""} onChange={this.onFieldChange}  />

            <label htmlFor="widthTo">Wzrost do</label>
            <input type="text" id="widthto" name="widthto"value={query.widthto || ""} onChange={this.onFieldChange}  />


            <label htmlFor="heigthFrom">Waga od</label>
            <input type="text" id="heigthFrom" name="heigthFrom" value={query.heightfrom || ""} onChange={this.onFieldChange}  />

            <label htmlFor="heigthTo">Waga do</label>
            <input type="text" id="heigthTo" name="heigthTo" value={query.heightto || ""} onChange={this.onFieldChange}  />

            <label htmlFor="gender">Płeć</label>
            <select id="gender" name="gender">
            <option value="m">Mężczyzna</option>
            <option value="f">Kobieta</option>
            </select>

            <label htmlFor="tattos">Tatuaże</label>
            <input type="checkbox" id="tatoos" name="tatoos" checked={query.tatoos || false} onChange={this.onFieldChange}  />


             <label htmlFor="eyesColor">Kolor oczu</label>
            <select id="eyesColor" name="eyesColor">
            {eyesColorsFields}
            </select>


            <label htmlFor="hairColor">Kolor włosów</label>
            <select  id="hairHolor" name="hairColor">
            {hairColorsFields}
            </select>

{/*
            <label htmlFor="interest">Zainteresowania</label>
            <ul>
                <li>
                    <label>
                    <input name="selected" type="checkbox">
                    {{interestDictionary[i].displayName}}
                </li>
            </ul> */}

            <button type="submit">Wyszukaj</button>
        </div>
    </div>
    )
}

}

export default SearchPage;