import React from 'react';
import './ScreenStyle/BookDesign.css'; // Import your CSS file for styling
import { AiOutlineFontSize, AiOutlineFontColors, AiOutlineScan, AiOutlinePicture, AiOutlineUpCircle, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSave, AiOutlineFileAdd } from 'react-icons/ai'; 
async function fetchData(url, method, data) {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Legg til denne linjen for å tillate forespørsler fra alle domener
    };

    const options = {
        method,
        headers,
        
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response;
}

function BookDesign() {
  
    const handleUpdate = async () => {
        async function updateBook(url , data) {
            return await fetchData(url, "PUT", data);
        }
        let id = null;
        let book = null;
        const response = await updateBook(`http://localhost:8080/book/${id}`, book);
        console.log(response);
    };

    return (
      <div className="bookdesign-page">
        <h1>Design din bok</h1>
        <div className="bookdesign-content">
          <canvas id="myCanvas" width="350" height="400" style={{ backgroundColor: 'white'}}></canvas>
          <div className="design-button-container">
            <button className="font-button"><AiOutlineFontSize /></button>
            <button className="font-color-button"><AiOutlineFontColors /></button>
            <button className="scan-button"><AiOutlineScan /></button>
            <button className="picture-button"><AiOutlinePicture /></button>
            <button className="symbol-button"><AiOutlineUpCircle /></button>
          </div>
        </div>
        <div className="navigate-button-container">
        <button className="back-button"><AiOutlineArrowLeft /></button>
        <button className="next-button"><AiOutlineArrowRight /></button>
        <button className="save-button" onClick={handleUpdate}>Lagre</button>
        <button className="add-page-button"><AiOutlineFileAdd /></button>
        </div>
      </div>
    );
  }
  

export default BookDesign;
