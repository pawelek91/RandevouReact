import React from 'react';
const FinderBasicFieldsComponent = (props) => {
    const {query, onFieldChange}=props;
    return ( 
        <>
           <label htmlFor="userName">Nazwa użytkownika</label>
            <input type="text" id="name" name="name" value={query.name || ""} onChange={onFieldChange} />

            <label htmlFor="region">Województwo</label>
            <input type="text" id="region" name="region" value={query.region || ""} onChange={onFieldChange} />

            <label htmlFor="city">Miasto</label>
            <input type="text" id="city" name="city" value={query.city || ""} onChange={onFieldChange}  />

            <label htmlFor="ageFrom">Wiek od</label>
            <input type="text" id="agefrom" name="agefrom" value={query.agefrom || ""} onChange={onFieldChange}  />

            <label htmlFor="ageTo">Wiek do</label>
            <input type="text" id="ageto" name="ageto" value={query.ageto || ""} onChange={onFieldChange}  />

            <label htmlFor="widthFrom">Wzrost od</label>
            <input type="text" id="widthfrom" name="widthfrom" value={query.widthfrom || ""} onChange={onFieldChange}  />

            <label htmlFor="widthTo">Wzrost do</label>
            <input type="text" id="widthto" name="widthto"value={query.widthto || ""} onChange={onFieldChange}  />


            <label htmlFor="heigthFrom">Waga od</label>
            <input type="text" id="heigthFrom" name="heigthFrom" value={query.heightfrom || ""} onChange={onFieldChange}  />

            <label htmlFor="heigthTo">Waga do</label>
            <input type="text" id="heigthTo" name="heigthTo" value={query.heightto || ""} onChange={onFieldChange}  />

            <label htmlFor="gender">Płeć</label>
            <select id="gender" name="gender">
            <option value="m">Mężczyzna</option>
            <option value="f">Kobieta</option>
            </select>

            <label htmlFor="tattos">Tatuaże</label>
            <input type="checkbox" id="tatoos" name="tatoos" checked={query.tatoos || false} onChange={onFieldChange}  />
        </>
     );
}
 
export default FinderBasicFieldsComponent;