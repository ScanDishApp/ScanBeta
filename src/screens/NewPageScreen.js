import React, { useState, useEffect } from 'react';
import { AiOutlineFontSize, AiOutlineFontColors, AiOutlineScan, AiOutlinePicture, AiOutlineFileText, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineBold, AiOutlineFileAdd, AiOutlineSmile, AiOutlineDelete } from 'react-icons/ai';

import './ScreenStyle/Home.css';
import './ScreenStyle/NewPage.css';

export default function NewPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
        setDragging(true);
        const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
        const clientY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
        const rect = event.target.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;
        setOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (event) => {
        event.preventDefault();
        if (dragging) {
            const clientX = event.type.includes('touch') ? event.touches[0].clientX : event.clientX;
            const clientY = event.type.includes('touch') ? event.touches[0].clientY : event.clientY;
            setPosition({
                x: clientX - offset.x,
                y: clientY - offset.y
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchmove', handleMouseMove);
        document.addEventListener('touchend', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleMouseMove);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, [dragging]);

    useEffect(() => {
        localStorage.setItem('noteTitle', title);
        localStorage.setItem('noteContent', content);
    }, [title, content]);

    return (
        <div className="NewPage-container">
            <h1>Design din bok</h1>
    
            <div className="navigate-button-container">
                <button className="back-button"><AiOutlineArrowLeft /></button>
                <button className="next-button"><AiOutlineArrowRight /></button>
                <button className="save-button">Lagre</button>
                <button className="add-page-button"><AiOutlineFileAdd /></button>
            </div>
    
            <div className="coverPage"></div>
    
            
            <div className="input-container">
                {image && (
                    <div className="image-preview"
                        style={{ left: position.x, top: position.y }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                    >
                        <img src={image} alt="Uploaded" />
                    </div>
                )}
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload"
                    style={{ display: 'none' }} // Hide the file input
                />
                <input
                    type="text"
                    className="note-title-input"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="titel"
                />
                <textarea
                    className="note-textarea"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Write your note here..."
                />
               
    
            </div>
            <div className="design-button-container">
                <button className="scan-button"><AiOutlineScan /></button>
                <button className="text-button"><AiOutlineFileText /></button>
                <button className="font-button"><AiOutlineBold /></button>
                <button className="font-size-button"><AiOutlineFontSize /></button>
                <button className="font-color-button"><AiOutlineFontColors /></button>
                <button className="picture-button" onClick={() => document.getElementById('file-input').click()}><AiOutlinePicture /></button>
                <button className="symbol-button"><AiOutlineSmile /></button>
                <button className="remove-button"><AiOutlineDelete /></button>
            </div>
            
        </div >
    );
    
}    
