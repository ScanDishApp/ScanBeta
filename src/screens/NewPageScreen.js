import React, { useState, useEffect } from 'react';
import { AiOutlineFontSize, AiOutlineUnorderedList, AiOutlineSave, AiOutlineBgColors, AiOutlineScan, AiOutlinePicture, AiOutlineFileText, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineFileAdd, AiOutlineSmile, AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import EmojiPicker from './Stickers';
import './ScreenStyle/Home.css';
import './ScreenStyle/NewPage.css';

const predefinedColors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#808080'];

const fontOptions = {
    Default: 'DM Serif Display, sans-serif',
    Monospace: 'Courier New, monospace',
    Serif: 'Times New Roman, serif'
};

const fontSizes = ['14px', '16px', '18px', '20px', '24px', '28px', '32px'];
async function updateBook(url, data) {
    const header = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(url, header);
    return response;
}

export default function NewPage() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [title, setTitle] = useState('');
    const [ingridens, setIngridens] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [showColorMenu, setShowColorMenu] = useState(false);
    const [showFontMenu, setShowFontMenu] = useState(false);
    const [showFontSizeMenu, setShowFontSizeMenu] = useState(false);
    const [selectedFont, setSelectedFont] = useState('DM Serif Display, sans-serif');
    const [deleteImageIndex, setDeleteImageIndex] = useState(null);
    const [selectedFontSize, setSelectedFontSize] = useState('16px');
    const [isBulletListActive, setIsBulletListActive] = useState(false);
    const [pages, setPages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedSticker, setSelectedSticker] = useState([]);
    const [emojis, setEmojis] = useState([]);
    const [selectedStickerPosition, setSelectedStickerPosition] = useState({ x: 0, y: 0 });


    useEffect(() => {
        const storedPages = localStorage.getItem("contents");

        if (storedPages) {
            const parsedPages = JSON.parse(storedPages);
            setPages(parsedPages);

            if (parsedPages.length > 0) {
                const initialPage = parsedPages[currentPageIndex];
                setTitle(initialPage.title);
                setIngridens(initialPage.ingridens);
                setContent(initialPage.content);
                setImages(initialPage.images);
                setSelectedColor(initialPage.selectedColor);
                setSelectedFont(initialPage.selectedFont);
                setSelectedFontSize(initialPage.selectedFontSize);
                setIsBulletListActive(initialPage.isBulletListActive);
            }
        }
    }, []);

    useEffect(() => {
        if (pages.length > 0) {
            const initialPage = pages[currentPageIndex];
            setTitle(initialPage.title);
            setIngridens(initialPage.ingridens);
            setContent(initialPage.content);
            setImages(initialPage.images);
            setSelectedColor(initialPage.selectedColor);
            setSelectedFont(initialPage.selectedFont);
            setSelectedFontSize(initialPage.selectedFontSize);
            setIsBulletListActive(initialPage.isBulletListActive);
        }
    }, [pages, currentPageIndex]);

    useEffect(() => {
        resetPageState();
    }, [pages]);

    const resetPageState = () => {
        setTitle('');
        setIngridens('');
        setContent('');
        setImages([]);
        setSelectedColor('#000000');
        setSelectedFont('DM Serif Display, sans-serif');
        setSelectedFontSize('16px');
        setIsBulletListActive(false);
    };

    const addNewPage = () => {
        const newPage = {
            title,
            ingridens,
            content,
            images,
            selectedColor,
            selectedFont,
            selectedFontSize,
            isBulletListActive
        };
        setPages(prevPages => [...prevPages, newPage]);

        const newIndex = pages.length;
        setCurrentPageIndex(newIndex);
        resetPageState();
        console.log(newPage);
        console.log(pages);
    };

    const handlePreviousPage = () => {
        setCurrentPageIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNextPage = () => {
        setCurrentPageIndex(prevIndex => Math.min(prevIndex + 1, pages.length - 1));
    };


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleIngridensChange = (event) => {
        setIngridens(event.target.value);
    };

    const handleContentChange = (event) => {
        let newContent = event.target.value;
        if (isBulletListActive) {
            const lines = newContent.split('\n');
            const newLines = lines.map((line, index) => {

                if (line.trim() !== '' && !line.startsWith('\u2022')) {
                    return `\u2022 ${line}`;
                }
                return line;
            });
            newContent = newLines.join('\n');
        }
        setContent(newContent);
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
    const handleStickerSelect = (selectedSticker) => {
        
        setSelectedSticker(selectedSticker);
        setShowEmojiPicker(false); // Hide the EmojiPicker after selecting a sticker
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

    const handleStickerMouseDown = (event) => {
        event.preventDefault();
        const clientX = event.clientX || (event.touches && event.touches[0].clientX);
        const clientY = event.clientY || (event.touches && event.touches[0].clientY);
        setSelectedStickerPosition({ x: clientX, y: clientY });
    };

    const handleStickerMouseMove = (event) => {
        event.preventDefault();
        if (selectedSticker !== null) {
            const clientX = event.clientX || (event.touches && event.touches[0].clientX);
            const clientY = event.clientY || (event.touches && event.touches[0].clientY);
            setSelectedStickerPosition({ x: clientX, y: clientY });
        }
    };
    const handleStickerMouseUp = () => {
        if (selectedSticker !== null) {
            const updatedImages = [...images];
            updatedImages.push({ src: selectedSticker.src, position: selectedStickerPosition });
            setImages(updatedImages);
            setSelectedSticker(null); 
        }
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

    const handleFontChange = (font) => {
        setSelectedFont(font);
        setShowFontMenu(false);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setShowColorMenu(false);
    };

    const handleFontSizeChange = (fontSize) => {
        setSelectedFontSize(fontSize);
        document.querySelector('.note-textarea').style.fontSize = fontSize;
        setShowFontSizeMenu(false);
    };


    const handleUpdate = async () => {

        const id = localStorage.getItem("bookId")
        const userId = localStorage.getItem("userId");
        const book = {
            id: id,
            userId: userId,
            contents: JSON.stringify(pages)
        };
        console.log(JSON.stringify(pages) + "dette er pages");

        const response = await updateBook(`https://scanbeta.onrender.com/book/${id}`, book);
        // const response = await updateBook(`http://localhost:8080/book/${id}`, book);
        console.log(response);
        const responseData = await response.json();
        console.log("Response:", responseData);
    };

    return (

        <div className="NewPage-container">
            <h1>Design din bok</h1>

            <div className="icon-row">
                <AiOutlineArrowLeft className="icon" onClick={handlePreviousPage} />
                <AiOutlineArrowRight className="icon" onClick={handleNextPage} />
                <AiOutlineSave className="icon" onClick={handleUpdate} />
                <AiOutlineFileAdd className="icon" onClick={addNewPage} />
                <AiOutlineInfoCircle className="icon" />
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
                <input
                    type="text"
                    className="ingridens-input"
                    value={ingridens}
                    onChange={handleIngridensChange}
                    placeholder="Ingridens.."
                />
                <textarea
                    className="note-textarea"
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Skriv..."
                    style={{
                        color: selectedColor,
                        fontFamily: selectedFont,
                        fontSize: selectedFontSize,
                        listStyleType: isBulletListActive ? 'disc' : 'none'
                    }}
                />

            </div>

            <div className="funky">
                <div className="menu-placement">
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
                    {showFontSizeMenu && (
                        <div className="font-size-menu">
                            {fontSizes.map((size, index) => (
                                <button
                                    key={index}
                                    className="font-size-option"
                                    onClick={() => handleFontSizeChange(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="funky" onMouseMove={handleStickerMouseMove}
                        onMouseUp={handleStickerMouseUp}
                        onTouchMove={handleStickerMouseMove}
                        onTouchEnd={handleStickerMouseUp}>
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
                {showEmojiPicker && (
                    <EmojiPicker onSelect={handleStickerSelect} />

                )}
                <div className="icon-row" >
                    <AiOutlineFileText className="icon" onClick={() => setShowFontMenu(!showFontMenu)} />
                    <AiOutlineScan className="icon" />
                    <AiOutlinePicture className="icon" onClick={() => document.getElementById('file-input').click()} />
                    <AiOutlineSmile className="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}  />
                    <AiOutlineBgColors className="icon" onClick={() => setShowColorMenu(!showColorMenu)} />
                </div>
            </div>
        </div>
    );
}
