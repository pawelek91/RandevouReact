import React from 'react';

const UserProfileComponent = (props) => {
    const {userBasicDto, userDetailsDto, onFieldChange, eyesColors, hairColors, interests} = props;

    
    let eyesColorsFields ;
    if(this.state.eyesColors.length >0){
        eyesColorsFields = this.state.eyesColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }

    let hairColorsFields ;
    if(this.hairColors.length >0){
        hairColorsFields = this.hairColors.map(item=>
            (
                <option key={item.id} value={item.id}> {item.displayName} </option>
            )  
        );
    }

    let interestsIds;
    if(this.interests.length >0){
        interestsIds = this.interests.map(item=>
            (
                <label key={item.name}>
                    <input type="checkbox" key={item.name} name={item.id+''} onChange={this.onDictionaryFieldChange}  /> 
                    {item.displayName}
                </label>
            )
        )
    }

    return (  
        <>
           <label htmlFor="userName">Nazwa wyświetlana użytkownika</label>
            <input type="text" id="name" name="name" value={userBasicDto.displayName} onChange={onFieldChange} />

            <label htmlFor="region">Województwo</label>
            <input type="text" id="region" name="region" value={userDetailsDto.region} onChange={onFieldChange} />

            <label htmlFor="city">Miasto</label>
            <input type="text" id="city" name="city" value={userDetailsDto.city} onChange={onFieldChange}  />


            <label htmlFor="age">Data urodzenia</label>
            <input type="text" id="age" name="ageto" value={userBasicDto.birthDate} onChange={onFieldChange}  />

            <label htmlFor="width">Wzrost</label>
            <input type="text" id="width" name="width"value={userDetailsDto.Width} onChange={onFieldChange}  />


            <label htmlFor="heigthFrom">Waga</label>
            <input type="text" id="heigthFrom" name="heigthFrom" value={userDetailsDto.height} onChange={onFieldChange}  />

            <label htmlFor="gender">Płeć</label>
            <select id="gender" name="gender" onChange={onFieldChange}>
            <option value="m">Mężczyzna</option>
            <option value="f">Kobieta</option>
            </select>

            <label htmlFor="tattos">Tatuaże</label>
            <input type="text" id="tatoos" name="tatoos" checked={userDetailsDto.tatoos} onChange={onFieldChange}  />

            <label htmlFor="eyesColor">Kolor oczu</label>
            <select id="eyesColor" name="eyesColor"  onChange={this.onDictionaryFieldChange}>
            {eyesColorsFields}
            </select>


            <label htmlFor="hairColor">Kolor włosów</label>
            <select  id="hairHolor" name="hairColor" onChange={this.onDictionaryFieldChange}>
            {hairColorsFields}
            </select>


            <p>Zainteresowania</p>
            {interestsIds}
            <button type="submit" onClick={this.searchUsers}>Wyszukaj</button>
        </>
    );
}
 
export default UserProfileComponent;