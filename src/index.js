import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const myElement = <div style ={{color: "blue"}}>I Love JSX!<div>hahah!!</div></div>  //JSX
const myElement1 = React.createElement('h1', {}, 'I do not use JSX!');
const myElement2 = <div>React is {5 + 5} times better with JSX</div>;

let temp_number = 10;
let temp_text = "nono";
if(temp_number > 10){
  temp_text = "over 10";
} else {
  temp_text = "not over 10";
}
const myElement3 = <div>{temp_number} === this number?:{temp_text}</div>;
const myElement4 = <div>{temp_number} === {(temp_number > 10) ? " o 10": "n o 10"}</div>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  {myElement}
  {myElement1}
  {myElement2}
  {myElement3}
  </>
)
  /*<React.StrictMode>
    <App />
  </React.StrictMode>
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
