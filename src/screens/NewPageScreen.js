import React, { useState, useEffect } from 'react';
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
        setDragging(true);
        const rect = event.target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        setOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (event) => {
        if (dragging) {
            setPosition({
                x: event.clientX - offset.x,
                y: event.clientY - offset.y
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    useEffect(() => {
        // Save the note whenever title or content changes
        localStorage.setItem('noteTitle', title);
        localStorage.setItem('noteContent', content);
    }, [title, content]);

    return (
        <div className="NewPage-container">
            <h1 className='title'>ScanDish</h1>
            <div className="coverPage"></div>
            <div className="input-container">
                {image && (
                    <div className="image-preview"
                         style={{ left: position.x, top: position.y }}
                         onMouseDown={handleMouseDown}
                    >
                        <img src={image} alt="Uploaded" />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload"
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
        </div>
    );
}
