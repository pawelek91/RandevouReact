import React from 'react';

const UserProfileComponent = (props) => {
    const {userBasicDto, userDetailsDto, eyesColors, hairColors, interests,onFieldChange, onDictionaryFieldChange} = props;

    
    let eyesColorsFields;
    
    
    
    if(eyesColors.length >0){
        eyesColorsFields = eyesColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }

    let hairColorsFields ;
    if(hairColors.length >0){
        hairColorsFields = hairColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }

    let interestsIds;
    if(interests.length >0){
        interestsIds = interests.map(item=>
            (
                <label key={item.name}>
                    <input type="checkbox" key={item.name} name={item.id+''} onChange={onDictionaryFieldChange}  /> 
                    {item.displayName}
                </label>
            )
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
            <input type="text" id="age" name="basic_birthDate" value={userBasicDto.birthDate} onChange={onFieldChange}  />

            <label htmlFor="width">Wzrost</label>
            <input type="text" id="width" name="width"value={userDetailsDto.Width} onChange={onFieldChange}  />


            <label htmlFor="heigthFrom">Waga</label>
            <input type="text" id="heigth" name="heigth" value={userDetailsDto.height} onChange={onFieldChange}  />

            <label htmlFor="gender">Płeć</label>
            <select id="gender" name="gender" onChange={onFieldChange}>
            <option value="m">Mężczyzna</option>
            <option value="f">Kobieta</option>
            </select>

            <label htmlFor="tattos">Tatuaże</label>
            <input type="text" id="tatoos" name="tatoos" checked={userDetailsDto.tatoos} onChange={onFieldChange}  />

            <label htmlFor="eyesColor">Kolor oczu</label>
            <select id="eyesColor" name="eyesColor"  onChange={onDictionaryFieldChange}>
            {eyesColorsFields}
            </select>


            <label htmlFor="hairColor">Kolor włosów</label>
            <select  id="hairHolor" name="hairColor" onChange={onDictionaryFieldChange}>
            {hairColorsFields}
            </select>


            <p>Zainteresowania</p>
            {interestsIds}
            <button type="submit" >Zapisz</button>
        </div>
    );
}
 
export default UserProfileComponent;