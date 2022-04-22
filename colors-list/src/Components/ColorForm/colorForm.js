import React, {useState, useEffect } from 'react';
import HexToRGB from './hexToRgb';

const ColorForm = () => {
  const [color, setColor] = useState('');
  const [counter, setCounter] = useState(1);
  const [list, setList] = useState(["#FF0000", "#00FF00", "#0000FF"]);
  const [option, setOption] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState({1: false, 2: true, 3: false, 4: true});
  const [displayRules, setDisplayRules] = useState("");
  const [displayColors, setDisplayColors] = useState([]);
  const [validation, setValidation] = useState("");

  
  const updateList = () => {
    const arr=[1,2,3,4,5,6,7,8,9,10]
    arr.forEach((el) => {
    let localStorageData = window.localStorage.getItem(el);
    if (localStorageData !== null) {
      setList([ ...list, localStorageData.toLocaleUpperCase()]);
    } else {console.log("no data in local storage")}
    })
  };

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  const checkboxChange = (e) => {
    let key = Number(e.target.id);
    let index = key-1;
    setCheckboxStatus({
      key: !checkboxStatus[index]
    });
  };

  //data validation
  const checkValidation = () => {
    let errors = validation;
    let checkColor = color.toString().toUpperCase();
    // console.log("checkColor", checkColor);
    const validCharacters = 'a,b,c,d,e,f,A,B,C,D,E,F,0,1,2,3,4,5,6,7,8,9';
  
    if (checkColor.length < 1) {
      errors = "";
    } else if (checkColor[0] != "#") {
      errors = "HEX color starts always from '#' sign!";
    } else if (checkColor[0] == "#") {
      const checkCharacters = checkColor.slice(1).split('');
      checkCharacters.forEach((el) => {
        if (validCharacters.indexOf(el) == -1) {
          errors = "Use only letters a-f or/and numbers 0-9."
        } else {
          errors = "";
        };
      })
    };

    setValidation(errors);
  };

  useEffect(() => {
    checkValidation();
  }, [color]
  );

  const handleSubmit =(e) => {
    e.preventDefault();
    if (validation == "") {
      window.localStorage.setItem(counter, color);
      alert("Color added to list sucessfully.");
      setColor("");
      setCounter(counter+1);
      setList([ ...list, color.toLocaleUpperCase()]);
      updateList();
      }

  };

  return (
    <div>
      <form className="color-form" onSubmit={handleSubmit}>
        <div className="color-form-box">
          <h2 className="form-title">hex colors base</h2>
          <label className="color-label">Add a new color:</label>
          <input className="color-input" type="string" value={color} onChange={handleChange} required minLength="3" maxLength="7" pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" />
          <span className="validation-line">{validation}</span>
          <input className="submit-btn" type="submit" value="Add new color" />
        </div>

        <div className="display-colors-box">
          <h4 className="display-title">Display colors:</h4>
            <div className="checkbox-container">
              <div className="checkbox-data">
                <input type="checkbox" value="red" id="1" checked={checkboxStatus.red} onChange={checkboxChange}></input>
                <label for="1" className="color-label">Red {">"} 50%</label>
              </div>
              <div className="checkbox-data">
                <input type="checkbox" value="green" id="2" checked={checkboxStatus.green} onChange={checkboxChange}></input>
                <label for="1" className="color-label">Green {">"} 50%</label>
              </div>
              <div className="checkbox-data">
                <input type="checkbox" value="blue" id="3" checked={checkboxStatus.blue} onChange={checkboxChange}></input>
                <label for="1" className="color-label">Blue {">"} 50%</label>
              </div>
              <div className="checkbox-data">
                <input type="checkbox" value="saturation" id="4" checked={checkboxStatus.saturation} onChange={checkboxChange}></input>
                <label for="1" className="color-label">Saturation {">"} 50%</label>
              </div>
            </div>
            
   
          <div className='colorsBoxes'>
            {list.map((item, index) => {
            // return <div key={index} className="rectangle" style={{backgroundColor:item}}><span className="rectangleText">{item}</span></div>})}
            return <div className="rectangle-container"><div key={index} className="rectangle" style={{backgroundColor:item}}></div><div><span className="rectangleText">{item}</span></div></div>})}
          </div>
        </div>
      </form>
    </div>
  )
}

export default ColorForm;
