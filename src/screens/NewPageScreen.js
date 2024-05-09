import React, { useState, useEffect } from 'react';
import { AiOutlineFontSize, AiOutlineUnorderedList, AiOutlineSave, AiOutlineBgColors, AiOutlineScan, AiOutlinePicture, AiOutlineFileText, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineFileAdd, AiOutlineSmile, AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Sticker from './Stickers';
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
    const [coverImg, setCoverImg] = useState(null);
    const [desc, setDesc] = useState('');
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
    const [selectedFontSize, setSelectedFontSize] = useState('18px');
    const [isBulletListActive, setIsBulletListActive] = useState(false);
    const [pages, setPages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [showSticker, setShowSticker] = useState(false);
    const [lastRecognizedText, setLastRecognizedText] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [imageFile, setImageFile] = useState(null);


    useEffect(() => {
        const lastText = localStorage.getItem('lastRecognizedText');
        if (lastText) {
            setLastRecognizedText(lastText);
        }
    }, []);


    useEffect(() => {
        const storedPages = localStorage.getItem("contents");

        if (storedPages) {
            const parsedPages = JSON.parse(storedPages);
            setPages(parsedPages);

            if (parsedPages.length > 0) {
                const initialPage = parsedPages[currentPageIndex];
                setTitle(initialPage.title);
                setImageFile(initialPage.imageFile)
                setIngridens(initialPage.ingridens);
                setDesc(initialPage.desc)
                setImages(initialPage.images);
                setSelectedColor(initialPage.selectedColor);
                setSelectedFont(initialPage.selectedFont);
                setSelectedFontSize(initialPage.selectedFontSize);
            }
        }
    }, []);

    useEffect(() => {
        if (pages.length > 0) {
            const initialPage = pages[currentPageIndex];
            setTitle(initialPage.title);
            setImageFile(initialPage.imageFile)
            setIngridens(initialPage.ingridens);
            setDesc(initialPage.desc)
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
        setImageFile(null)
        setDesc('')
        setImages([]);
        setSelectedColor('#000000');
        setSelectedFont('Arial, Helvetica, sans-serif');
        setSelectedFontSize('18px');
    };
    const addSticker = (stickerSrc) => {
        const newSticker = { src: stickerSrc, position: { x: 0, y: 0 } };
        setImages(prevImages => [...prevImages, newSticker]);
    };
    const addNewPage = () => {
        const newPage = {
            title,
            ingridens,
            imageFile,
            desc,
            images,
            selectedColor,
            selectedFont,
            selectedFontSize,
            isBulletListActive
        };
        setPages(prevPages => [...prevPages, newPage]);

        // function test(prevPages){
        //     const array = [...prevPages, newPage];
        //     console.log(array);
        //     return array;
        // }
        // console.log("setPages....");
        // setPages(test(prevPages));

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

    const handleTextChange = (event) => {
        setLastRecognizedText(event.target.value);
    };




    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleIngridensChange = (event) => {
        let newIngridens = event.target.value;

        const lines = newIngridens.split('\n');
        const bulletLines = lines.map(line => {

            if (line.trim() && !line.trim().startsWith('\u2022')) {
                return `\u2022 ${line}`;
            }
            return line;
        });
        // Join the lines back into a single string
        setIngridens(bulletLines.join('\n'));


        // Dynamically adjust the height of the container based on the content
        const textarea = document.getElementById('ingridens-input');
        textarea.style.height = ''; // Reset height to auto
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scroll height

    };

    const handleContentChange = (event) => {
        let newContent = event.target.value;
        
        // Split the content into lines
        const lines = newContent.split('\n');
        
        // Remove bullet points from each line
        const newLines = lines.map((line) => {
            // Check if the line starts with a bullet point character
            if (line.trim() !== '' && line.startsWith('\u2022')) {
                // Remove the bullet point character
                return line.slice(2);
            }
            return line;
        });
        
        // Join the lines back together
        newContent = newLines.join('\n');
        
        // Set the updated content
        setDesc(newContent);
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


    const handleImageChangeInContainer = (event) => {

        const file = event.target.files[0];
        setSelectedFile(file);

        // You can perform additional actions here, such as uploading the file to a server
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

    const handleClick = () => {
        setShowImage(!showImage); // Toggle showImage state
    };

    const handleSave = () => {
        localStorage.setItem('lastRecognizedText', lastRecognizedText);
        alert('Text saved successfully!');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageFile(reader.result); // Update state with the new image
            };
            reader.readAsDataURL(file);
        }
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
            <h1 style={{ fontFamily: selectedFont }}>Design din bok</h1>


            <div className="icon-row-top">
                <AiOutlineArrowLeft className="icon-top" onClick={handlePreviousPage} />
                <AiOutlineSave className="icon-top" onClick={handleUpdate} />
                <AiOutlineFileAdd className="icon-top" onClick={addNewPage} />
                <AiOutlineInfoCircle className="icon-top" />
                <AiOutlineArrowRight className="icon-top" onClick={handleNextPage} />


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


                <div className='coverFoodRectangle' style={{ position: 'relative' }}>
                    {imageFile ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img src={imageFile} alt='Uploaded' className='uploadedImage' />
                            <button
                                className='changeImageButton'
                                onClick={() => document.getElementById('uploadInput').click()}
                            >
                                Endre bildet
                            </button>
                        </div>
                    ) : (
                        <div className='preCover' onClick={() => document.getElementById('uploadInput').click()}>
                            <span className='preCoverText'>Legg til forside-bildet</span>
                        </div>
                    )}
                    <input
                        type='file'
                        id='uploadInput'
                        accept='image/*'
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                </div>


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
                    style={{
                        color: selectedColor,
                        fontFamily: selectedFont,
                    }}
                />
                <h2 className='undertitle' style={{ fontFamily: selectedFont, fontWeight: 'bold' }}>Ingredienser:</h2>

                <div className='input-area-1'>

                    <textarea
                        id="ingridens-input"
                        className="ingridens-input"
                        value={ingridens}
                        onChange={handleIngridensChange}
                        placeholder="List dine ingredienser..."
                        style={{
                            color: selectedColor,
                            fontFamily: selectedFont,
                            border: 'none', // Removes the border
                            outline: 'none', // Removes the outline on focus
                            background: 'transparent', // Makes the background transparent ?

                        }}
                    />

                </div>


                <h3 className='undertitle'>Fremgangsmåte:</h3>
                    <button onClick={handleSave}>Save</button>

                    <textarea

                        className="note-textarea"

                        value={lastRecognizedText}

                        onChange={handleTextChange}

                        placeholder="Innstruksjoner..."
                        style={{
                            color: selectedColor,
                            fontFamily: selectedFont,
                            fontSize: selectedFontSize,

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

            <div className="funky"
            >

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
                <div className="last-scan-page">
                </div>


                <div className="icon-row" >

                    <AiOutlineFileText className="icon" onClick={() => setShowFontMenu(!showFontMenu)} />
                    <AiOutlineScan className="icon" />


                    <AiOutlineSmile
                        className="icon"
                        onClick={() => setShowSticker(!showSticker)}
                    />
                    {showSticker && <Sticker addSticker={addSticker} />}

                    <AiOutlinePicture className="icon" onClick={() => document.getElementById('file-input').click()} />

                    <AiOutlineBgColors className="icon" onClick={() => setShowColorMenu(!showColorMenu)} />
                </div>
            </div>
        </div>
    );
}
