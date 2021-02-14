import './App.css';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import VatDetails from './VatDetails';
import * as ReactBootstrap from 'react-bootstrap';
import Header from './Header';

function App() {
  
  const [vat, setVat] = useState("");
  const [vatDetails, setVatDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [valid, setValid] = useState(true);
  const [error, setError] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  })


 const handleSubmit = async (e) => {
  e.preventDefault();

   setVatDetails({});
   setShow(false);
   setError("");
   setValid(true);
   setLoading(false);
  
  // for validation - check if the vat number is alphanumeric with length 11
  if(!vat.match(/^[a-zA-Z0-9]{11}$/)){
    setValid(false);
    setError("* VAT Number must be alphanumeric and of 11 characters");
  } 

  // if the input is valid code below will execute.
  else {
    setShow(true);
    try{
      await axios.get(`https://vat.erply.com/numbers?vatNumber=${vat}`)
      .then(response => {
        if(response.data.Valid){
          setVatDetails(response.data);
        }
        else {
          setError("* The entered VAT Number is not valid");
          setValid(false);
          setShow(false);
        }
      })
      setLoading(true);
    }catch(error){
      console.log("error is ",error);
      setValid(false);
      setShow(false);
      setError("* We are not able to complete your request, Try again later");
    }
  }
  }

  return (
    <>
    <Header/>
      <div className="app">
      <h2>Check VAT Number</h2>
      <form onSubmit={handleSubmit} className="app__form">
      <div className="app__formContent">
      <input ref={inputRef} type="text" placeholder="Enter Vat Number" onChange={e => setVat(e.target.value)}/>
      <button className="btn btn-primary">Submit</button>
      </div>
      {valid ? null : <p style={{color: "red"}}>{error}</p>}
      </form>
      {show ? loading ? 
        <VatDetails details={vatDetails}/> 
      : <ReactBootstrap.Spinner animation="border" />
      : null}
      </div>
    </>
  );
}

export default App;
