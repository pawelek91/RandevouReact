import React from 'react';
import { Redirect } from 'react-router';
import DictionaryService from '../services/DictionaryService';

class SearchPage extends React.Component{
state={

}

dictionaryService = new DictionaryService();

render(){
    const finderStyle={
        display: 'inline-grid',
    }

    const apiKey = localStorage.getItem('apiKey');
  
    if(apiKey === undefined || apiKey === null || apiKey===''){
        return <Redirect to='/login'/>
    }

    const interests = this.dictionaryService.GetAllInterest();
    const eyesColors = this.dictionaryService.GetAllEyesColors();
    const hairColors = this.dictionaryService.GetAllHairColors();
    
    return(
    <div className="Friends">
         <div style={finderStyle}>

            <label htmlFor="userName">Nazwa użytkownika</label>
            <input type="text" id="userName" name="userName" />

            <label htmlFor="region">Województwo</label>
            <input type="text" id="region" name="region" />

            <label htmlFor="city">Miasto</label>
            <input type="text" id="city" name="city" />

            <label htmlFor="ageFrom">Wiek od</label>
            <input type="text" id="ageFrom" name="ageFrom" />

            <label htmlFor="ageTo">Wiek do</label>
            <input type="text" id="ageTo" name="ageTo" />

            <label htmlFor="widthFrom">Wzrost od</label>
            <input type="text" id="widthFrom" name="widthFrom" />

            <label htmlFor="widthTo">Wzrost do</label>
            <input type="text" id="widthTo" name="widthTo" />


            <label htmlFor="heigthFrom">Waga od</label>
            <input type="text" id="heigthFrom" name="heigthFrom" />

            <label htmlFor="heigthTo">Waga do</label>
            <input type="text" id="heigthTo" name="heigthTo" />

            <label htmlFor="gender">Płeć</label>
            <select id="gender" name="gender">
            <option value="m">Mężczyzna</option>
            <option value="f">Kobieta</option>
            </select>

            <label htmlFor="tattos">Tatuaże</label>
            <input type="checkbox" id="tatoos" name="tatoos" />


            {/* <label htmlFor="eyesColor">Kolor oczu</label>
            <select id="eyesColor" name="eyesColor">
            <option> {{ec?.displayName}}</option>
            </select>


            <label htmlFor="hairColor">Kolor włosów</label>
            <select  id="hairHolor" name="hairColor">
            <option > {{hc?.displayName}}</option>
            </select>

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