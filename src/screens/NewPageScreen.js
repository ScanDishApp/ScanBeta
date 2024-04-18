import React, { useState, useEffect } from 'react';
import { AiOutlineFontSize, AiOutlineFontColors, AiOutlineBgColors, AiOutlineScan, AiOutlinePicture, AiOutlineFileText, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineBold, AiOutlineFileAdd, AiOutlineSmile, AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './ScreenStyle/Home.css';
import './ScreenStyle/NewPage.css';

const predefinedColors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#808080'];

const fontOptions = {
    Default: 'DM Serif Display, sans-serif',
    Monospace: 'Courier New, monospace',
    Serif: 'Times New Roman, serif'
};

export default function NewPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [showColorMenu, setShowColorMenu] = useState(false);
    const [showFontMenu, setShowFontMenu] = useState(false);
    const [selectedFont, setSelectedFont] = useState('DM Serif Display, sans-serif');
    const [deleteImageIndex, setDeleteImageIndex] = useState(null);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files) {
            const imageArray = [];
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = () => {
                    imageArray.push({ src: reader.result, position: { x: 0, y: 0 } });
                    if (imageArray.length === files.length) {
                        setImages([...images, ...imageArray]);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };

    const handleMouseDown = (event, index) => {
        event.preventDefault();
        setDragging(true);
        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);
        const rect = event.target.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const offsetY = clientY - rect.top;
        setOffset({ x: offsetX, y: offsetY });

        const updatedImages = [...images];
        updatedImages[index].offset = { x: offsetX, y: offsetY };
        updatedImages[index].zIndex = 9999;
        setImages(updatedImages);
    };

    const handleMouseMove = (event, index) => {
        event.preventDefault();
        if (dragging) {
            const clientX = event.clientX || (event.touches && event.touches[0].clientX);
            const clientY = event.clientY || (event.touches && event.touches[0].clientY);

            const updatedImages = [...images];
            updatedImages[index].position = {
                x: clientX - updatedImages[index].offset.x,
                y: clientY - updatedImages[index].offset.y
            };
            setImages(updatedImages);
        }
    };

    const handleTouchForceChange = (event, index) => {
        const force = event.touches[0].force;
        const updatedImages = [...images];
        updatedImages[index].position = {
            x: event.touches[0].clientX - updatedImages[index].offset.x * force,
            y: event.touches[0].clientY - updatedImages[index].offset.y * force
        };
        setImages(updatedImages);
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    const handleDeleteConfirm = (index) => {
        setDeleteImageIndex(null);
        handleRemoveImage(index);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        if (images.length > 0) {
            const updatedImages = [...images];
            updatedImages.forEach((image) => {
                image.position = { x: 0, y: 0 };
            });
            setImages(updatedImages);
        }
    };

    useEffect(() => {
        localStorage.setItem('noteTitle', title);
        localStorage.setItem('noteContent', content);
    }, [title, content]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setShowColorMenu(false);
    };

    const handleFontChange = (font) => {
        setSelectedFont(font);
        setShowFontMenu(false);
    };

    const handleTouchStartDelete = (index) => {
        setDeleteImageIndex(index);
    };

    return (
        <div className="NewPage-container">
            <h1>Design din bok</h1>

            <div className="navigate-button-container">
                <button className="back-button"><AiOutlineArrowLeft /></button>
                <button className="next-button"><AiOutlineArrowRight /></button>
                <button className="save-button">Lagre</button>
                <button className="add-page-button"><AiOutlineFileAdd /></button>
                <button className="info-button"><AiOutlineInfoCircle /></button>
            </div>

            <div className="coverPage"></div>

            <div className="input-container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="image-preview"
                        style={{
                            left: image.position.x,
                            top: image.position.y,
                            zIndex: image.zIndex || 1
                        }}
                        onMouseDown={(event) => handleMouseDown(event, index)}
                        onTouchStart={(event) => handleMouseDown(event, index)}
                        onTouchForceChange={(event) => handleTouchForceChange(event, index)}
                        onMouseMove={(event) => handleMouseMove(event, index)}
                        onTouchMove={(event) => handleMouseMove(event, index)}
                        onMouseUp={handleMouseUp}
                        onTouchEnd={handleMouseUp}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <img src={image.src} alt={`Uploaded ${index}`} />
                        {deleteImageIndex === index && (
                            <div className="delete-overlay">
                                <button onClick={() => handleDeleteConfirm(index)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-upload"
                    style={{ display: 'none' }}
                    multiple
                />
                <input
                    type="text"
                    className="note-title-input"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Tittel"
                />
                <textarea
                    className="note-textarea"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Skriv..."
                    style={{ color: selectedColor, fontFamily: selectedFont }}
                />
            </div>

            {/* Font popup menu */}
            {showFontMenu && (
                <div className="font-menu">
                    {Object.entries(fontOptions).map(([key, value]) => (
                        <button
                            key={key}
                            className="font-option"
                            onClick={() => handleFontChange(value)}
                            style={{ fontFamily: value }}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            )}

            {/* Color menu */}
            <div className="funky">
                <div className="menu-placement">
                    {showColorMenu && (
                        <div className="colorMenu">
                            {predefinedColors.map((color, index) => (
                                <button
                                    key={index}
                                    className="color-button"
                                    style={{ backgroundColor: color }}
                                    onClick={() => handleColorChange(color)}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="icon-row">
                    <AiOutlineFontSize className="icon" onClick={() => setShowFontMenu(!showFontMenu)} />
                    <AiOutlineFontColors className="icon" />
                    <AiOutlineScan className="icon" />
                    <AiOutlinePicture className="icon" onClick={() => document.getElementById('file-input').click()} />
                    <AiOutlineFileText className="icon" />
                    <AiOutlineSmile className="icon" />
                    <AiOutlineBgColors className="icon" onClick={() => setShowColorMenu(!showColorMenu)} />
                </div>
            </div>
        </div>
    );
}
