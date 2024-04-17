import React from 'react';
import './ScreenStyle/BookDesign.css'; // Import your CSS file for styling
import { AiOutlineFontSize, AiOutlineFontColors, AiOutlineScan, AiOutlinePicture, AiOutlineDelete, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineForm, AiOutlineFileAdd, AiOutlineSmile, AiOutlineFileText, AiOutlineBold } from 'react-icons/ai';
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
    async function updateBook(url, data) {
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

      <button className="save-button" onClick={handleUpdate}>Lagre</button>
      <button className="add-page-button"><AiOutlineFileAdd /></button>

      <div className="bookdesign-content">
        <canvas id="myCanvas" width="350" height="400" style={{ backgroundColor: 'white' }}></canvas>

      </div>
      <div className="navigate-button-container">
        <button className="back-button"><AiOutlineArrowLeft /></button>
        <button className="next-button"><AiOutlineArrowRight /></button>

      </div>
      <div className="design-button-container">
      <div className="scrollable-buttons">
          <button className="scan-button"><AiOutlineScan /></button>
          <button className="text-button"><AiOutlineFileText /></button>
          <button className="font-button"><AiOutlineBold /></button>
          <button className="font-size-button"><AiOutlineFontSize /></button>
          <button className="font-color-button"><AiOutlineFontColors /></button>
          <button className="picture-button"><AiOutlinePicture /></button>
          <button className="symbol-button"><AiOutlineSmile /></button>
          <button className="remove-button"><AiOutlineDelete /></button>
        </div>
      </div>
    </div>
  );
}


export default BookDesign;
