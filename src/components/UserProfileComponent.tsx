import React from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import DictionaryItemDto from '../services/dto/DictionaryItemDto';
import { UserDetailsDto, UserDto } from '../services/dto/UsersDto';



const generateDictionaryFields = (name: string, choosenId:number, dictionary:DictionaryItemDto[], onchange)=>{
    let fields;
    
    let selectFieldItem = (<></>);
       

        fields = dictionary.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
        const choosenItem = dictionary.find(x=>x.id == choosenId);
   
        if(choosenItem !== undefined){
        selectFieldItem = (
            <>
             <select id={name} name={name} value={choosenItem?.id}  onChange={onchange}>
            {fields}
            </select>
            </>
        )
        }
        else{
            selectFieldItem = ( <select id={name} name={name}  onChange={onchange}> {fields}</select>)
        }

        return selectFieldItem;
}

const generateGenderField = (gender:string, onChange) => {

    const genders = [
        {
            key:"m",text:"male"
        },
        {
            key:"f",text:"female"
        }
    ]
    let optionFields = genders.map(x=>{
        return(
            <option key={x.key} value={x.key}>{x.text}</option>
        );
    })
        
    let  select = (<select/>)
    switch(gender.toLocaleLowerCase()){
        case "male":case "m" :
            select = (<select id="gender" name="gender" value="m" onChange={onChange}>{optionFields}</select>);
            break;
        case "female": case "f":
            select = (<select id="gender" name="gender" value="f" onChange={onChange}>{optionFields}</select>);
            break;
        default:
            select = (<select id="gender" name="gender" onChange={onChange}>{optionFields}</select>);
            break;
    }
    return select;
}

const UserProfileComponent = (props) => {
    const {userFullDto,eyesColors, hairColors, interests,onFieldChange, onDictionaryFieldChange,onDateFieldChange, onSave} = props;
    const userBasicDto = userFullDto.basic as UserDto;
    const userDetailsDto = userFullDto.details as UserDetailsDto

    let eyesColorsFields;
    if(eyesColors.length >0){
        eyesColorsFields = eyesColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }
    let hairColorFields;
    if(hairColors.length >0){
        hairColorFields = hairColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }
    let selectFieldEyesColor = userDetailsDto.eyesColor !== undefined ?
    generateDictionaryFields("eyesColor",userDetailsDto.eyesColor,eyesColors, onDictionaryFieldChange)
      : (<select id="eyesColor" name="eyesColor"  onChange={onDictionaryFieldChange}> {eyesColorsFields}</select>)

    let selectFieldHairColor = userDetailsDto.hairColor !== undefined?
    generateDictionaryFields("hairColor",userDetailsDto.hairColor,hairColors, onDictionaryFieldChange)
      : (<select id="hairColor" name="hairColor"  onChange={onDictionaryFieldChange}> {hairColorFields}</select>)
  
      let selectGenderField = generateGenderField(userBasicDto.gender ?? '', onDictionaryFieldChange);

    let interestsFields;

    const interestsDictItems = interests as DictionaryItemDto[];
    if(interestsDictItems.length >0){
        interestsFields = interestsDictItems.map(item=>{
            let isChecked = item.boolValue  || userDetailsDto.interests?.find(x=>x === item.id) !== undefined;

            return (
                <label key={item.name}>
                    <input type="checkbox" key={item.name} name={item.id+''} checked={isChecked} onChange={onDictionaryFieldChange}  /> 
                    {item.displayName}
                </label>
            )
        }
        )
    }

    const profileStyle={
        display: 'inline-grid',
        width:'35%',
        margin:'10px',
 
    }

    return (  
        <div style={profileStyle}>
           <label htmlFor="userName">Nazwa wyświetlana użytkownika</label>
            <input type="text" id="name" name="basic_name" value={userBasicDto.displayName} onChange={onFieldChange} />

            <label htmlFor="region">Województwo</label>
            <input type="text" id="region" name="region" value={userDetailsDto.region} onChange={onFieldChange} />

            <label htmlFor="city">Miasto</label>
            <input type="text" id="city" name="city" value={userDetailsDto.city} onChange={onFieldChange}  />


            <label htmlFor="age">Data urodzenia</label>
            <DatePicker name="basic_birthdate" selected={userFullDto.birthDate} onChange={onDateFieldChange} />

            <label htmlFor="width">Wzrost</label>
            <input type="text" id="width" name="width"value={userDetailsDto.width} onChange={onFieldChange}  />


            <label htmlFor="heigthFrom">Waga</label>
            <input type="text" id="heigth" name="heigth" value={userDetailsDto.heigth} onChange={onFieldChange}  />

            <label htmlFor="gender">Płeć</label>
            {selectGenderField}
            

            <label htmlFor="tattos">Tatuaże</label>
            <input type="text" id="tatoos" name="tatoos" value={userDetailsDto.tatoos} onChange={onFieldChange}  /> 

            <label htmlFor="eyesColor">Kolor oczu</label>
            {selectFieldEyesColor}


            <label htmlFor="hairColor">Kolor włosów</label>
            {selectFieldHairColor}


            <p>Zainteresowania</p>
            {interestsFields}
            <button type="submit" onClick={onSave} >Zapisz</button>
        </div>
    );
}
 
export default UserProfileComponent;