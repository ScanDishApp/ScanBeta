import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineFontSize, AiOutlineUnorderedList, AiOutlineSave, AiOutlineBgColors, AiOutlineScan, AiOutlinePicture, AiOutlineFileText, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineFileAdd, AiOutlineSmile, AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { Link} from 'react-router-dom';
import Sticker from './Stickers';
import { useNavigate } from 'react-router-dom';

import './ScreenStyle/Home.css';
import './ScreenStyle/NewPage.css';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
const predefinedColors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#800000', '#008000', '#008080', '#808080'];

const fontOptions = {
    Serif: 'DM Serif Display, sans-serif',
    Monospace: 'Courier New, monospace',
    Helvetica: 'Helvetica, Sans-Serif'
};

const fontSizes = ['14px', '16px', '18px', '20px', '24px', '28px', '32px'];
async function fetchData(url, method, data) {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
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
async function getPages(url) {
    return await fetchData(url, "GET");
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
    const [previousText, setPreviousText] = useState('');
    const textareaRef = useRef(null);
    const textareaRefIns = useRef(null);
    const [showFontMenu, setShowFontMenu] = useState(false);
    const [showColorMenu, setShowColorMenu] = useState(false);

    const [showScanOptions, setShowScanOptions] = useState(false);

    const [pageId, setPageId] = useState(localStorage.getItem("pageId"));


    const [showStickerMenu, setShowStickerMenu] = useState(false);


    const toggleMenu = (menuType) => {
        setShowFontMenu(menuType === 'font' ? !showFontMenu : false);
        setShowColorMenu(menuType === 'color' ? !showColorMenu : false);
        setShowStickerMenu(menuType === 'sticker' ? !showStickerMenu : false);
        setShowScanOptions(menuType === 'scan' ? !showScanOptions : false);
    };

    useEffect(() => {
        const lastText = localStorage.getItem('lastRecognizedText');
        if (lastText) {
            setLastRecognizedText(lastText);
        }
    }, []);

    useEffect(() => {
        const storedText = localStorage.getItem('previousRecognizedText');
        if (storedText) {
            setPreviousText(storedText);
        }
    }, []);

    useEffect(() => {
        const storedPageId = localStorage.getItem("pageId");
        if (storedPageId) {
            setPageId(storedPageId);
        }
    }, []);
    useEffect(() => {
        handleGetPages()
    }, []);

    useEffect(() => {
        if (pages.length > 0) {
            const initialPage = pages[currentPageIndex];
            setTitle(initialPage.title);
            setImageFile(initialPage.imageFile);
            setIngridens(initialPage.ingridens);
            setDesc(initialPage.desc);
            const parsedImages = JSON.parse(initialPage.images)
            setImages(parsedImages);
            setSelectedColor(initialPage.selectedColor);
            setSelectedFont(initialPage.selectedFont);
            setSelectedFontSize(initialPage.selectedFontSize);
            setIsBulletListActive(initialPage.isBulletListActive);
        }

    }, [pages, currentPageIndex]);

    const handleGetPages = async () => {
        let id = localStorage.getItem("bookId")
        const response = await getPages(`/page/get?bookId=${id}`);
        console.log(response);
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            let storedPages = responseData;
            setPages(storedPages[0]);
            console.log(pages);
        }
    }

    const saveCurrentPage = async () => {
        console.log(pageId);
        async function updatePage(url, data) {
            return await fetchData(url, "PUT", data);

        }

        let noteInput = document.querySelector('.note-input').value
        let noteInputIns = document.querySelector('.note-input-ins').value


        const page = {
            id: pageId,
            bookId: localStorage.getItem("bookId"),
            title: title,
            ingridens: noteInput,
            imageFile: imageFile,
            desc: noteInputIns,
            images: JSON.stringify(images),
            selectedColor: selectedColor,
            selectedFont: selectedFont
        };

        console.log(page);
        const response = await updatePage(`/page/${pageId}`, page);
        const responseData = await response.json();
        console.log(responseData);
        await addNewPage()

    };


    

    const addNewPage = async () => {
        console.log(pageId + "inside new page");
        const newPage = {
            bookId: localStorage.getItem("bookId"),
            title: '',
            ingridens: '',
            imageFile: null,
            desc: '',
            images: '[]',
            selectedColor: '#000000',
            selectedFont: 'DM Serif Display, serif'

        };
        const responsePage = await fetchData("/page/", "POST", newPage);
        const responsePageData = await responsePage.json();
        const responsePageDataParse = JSON.parse(responsePageData)
        console.log(responsePageDataParse);
        localStorage.setItem("pageId", responsePageDataParse.id)
        setPageId(responsePageDataParse.id)
        console.log(pageId + "inside new page");
        resetPageState();
        localStorage.removeItem("lastRecognizedText")
        localStorage.removeItem("previousRecognizedText")

        if (textareaRef.current) {

            textareaRef.current.resetTextArea(); 
          }
          if (textareaRefIns.current) {
            textareaRefIns.current.resetTextArea(); 
          }
          resetPageState();


    };



    const resetPageState = () => {

        let noteInput = document.querySelector('.textarea')
        if(noteInput){
        noteInput.innerHTML = "";
        }
        setTitle('');
        setImageFile(null)
        setDesc('')
        setImages([]);
        setSelectedColor('#000000');
        setSelectedFont('DM Serif Display, sans-serif');
        setSelectedFontSize('18px');

    };
    const addSticker = (stickerSrc) => {
        const newSticker = { src: stickerSrc, position: { x: 0, y: 0 } };
        setImages(prevImages => [...prevImages, newSticker]);
    };
  
    const handlePreviousPage = async () => {
        if (currentPageIndex > 0) {
            await handleUpdate(); // Save the current page before flipping
            setCurrentPageIndex(prevIndex => {
                const newIndex = prevIndex - 1;
                const newPageId = pages[newIndex].id;
                setPageId(newPageId);
                loadPageData(newIndex); // Load the new page's data
                return newIndex;
            });
            handleGetPages();
            localStorage.removeItem("lastRecognizedText");
            localStorage.removeItem("previousRecognizedText");
        }
    };
    
    const handleNextPage = async () => {
        if (currentPageIndex < pages.length - 1) {
            await handleUpdate(); // Save the current page before flipping
            setCurrentPageIndex(prevIndex => {
                const newIndex = prevIndex + 1;
                const newPageId = pages[newIndex].id;
                setPageId(newPageId);
                loadPageData(newIndex); // Load the new page's data
                return newIndex;
            });
            handleGetPages();
            localStorage.removeItem("lastRecognizedText");
            localStorage.removeItem("previousRecognizedText");
        }
    };

    
    const loadPageData = (pageIndex) => {
        const page = pages[pageIndex];
        setTitle(page.title);
        setImageFile(page.imageFile);
        setIngridens(page.ingridens);
        setDesc(page.desc);
        const parsedImages = JSON.parse(page.images);
        setImages(parsedImages);
        setSelectedColor(page.selectedColor);
        setSelectedFont(page.selectedFont);
        setSelectedFontSize(page.selectedFontSize);
        setIsBulletListActive(page.isBulletListActive);
    };
    

    const handleTextChange = (event) => {
        setLastRecognizedText(event.target.value);
    };

    const handleChangeIngridients = (event) => {
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
        setIngridens(bulletLines.join('\n'));
        const textarea = document.getElementById('ingridens-input');
        textarea.style.height = '';
        textarea.style.height = `${textarea.scrollHeight}px`;

    };

    const navigate = useNavigate();
    const handleInfoClick = () => {
        navigate('/InfoCarousel');
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
                        setImages(prevImages => [...prevImages, ...imageArray]);
                    }
                };
                reader.readAsDataURL(files[i]);
            }
        }
    };


    const handleImageChangeInContainer = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleMouseDown = (event, index) => {
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

    const handleDeleteImage = (index) => {
        if (Array.isArray(images)) {
            const updatedImages = [...images];
            updatedImages.splice(index, 1); // Remove the image at the specified index
            setImages(updatedImages); // Update the state with the new array of images
        }
    };


    const handleFontSizeChange = (fontSize) => {
        setSelectedFontSize(fontSize);
        document.querySelector('.note-textarea').style.fontSize = fontSize;
        setShowFontSizeMenu(false);
    };

    const handleClick = () => {
        setShowImage(!showImage);
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




    const toggleDeletemode = (index) => {
        setDeleteImageIndex(deleteImageIndex === index ? null : index); // Toggle edit mode for the clicked sticker
    };


    const handleUpdate = async () => {
        async function updatePage(url, data) {
            return await fetchData(url, "PUT", data);

        }

        const page = {
            id: pageId,
            bookId: localStorage.getItem("bookId"),
            title: title,
            ingridens: ingridens,
            imageFile: imageFile,
            desc: desc,
            images: JSON.stringify(images),
            selectedColor: selectedColor,
            selectedFont: selectedFont
        };
        console.log(page);
        console.log(pageId);
        const response = await updatePage(`/page/${pageId}`, page);
        console.log(pageId);
        const responseData = await response.json();
        console.log(responseData);
        localStorage.removeItem("lastRecognizedText")
        localStorage.removeItem("previousRecognizedText")

    }
  

    return (

        <div className="NewPage-container">
            <h1 style={{ fontFamily: 'DM Serif Display, sans-serif' }}>Design din bok</h1>


            <div className="icon-row-top">
                <AiOutlineArrowLeft className="icon-top" onClick={handlePreviousPage} />
                <AiOutlineSave className="icon-top" onClick={handleUpdate} />
                <AiOutlineFileAdd className="icon-top" onClick={saveCurrentPage} />
                <AiOutlineInfoCircle className="icon-top" onClick={handleInfoClick} />
                <AiOutlineArrowRight className="icon-top" onClick={handleNextPage} />
     
            </div>


            <div className="coverPage"></div>
            <div className="input-container">
            {images.map((image, index) => (
                <div
                    key={index}
                    className="image-preview"
                    style={{
                        position: 'absolute',
                        top: image.position.y, // Adjust according to your needs
                        left: image.position.x, // Adjust according to your needs
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
                    <div className="selected-image" onClick={() => toggleDeletemode(index)}>
                        <img src={image.src} alt={`Uploaded ${index}`} />
                    </div>
                    {deleteImageIndex === index && (
                        <AiOutlineDelete 
                        className="delete-icon-edit"
                        onClick={() => handleDeleteImage(index)}
                        />  
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
                            <span className='preCoverText' style={{ fontFamily: selectedFont, fontWeight: 'bold' }}>Legg til forside-bildet</span>
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
                    style={{
                        display: 'none'
                    }}
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
                <h2 className='undertitle' style={{ fontFamily: selectedFont, fontWeight: 'bold', color: selectedColor }} >Ingredienser:</h2>
                <Ingredients ref={textareaRef}
                    selectedColor={selectedColor}
                    style={{ fontFamily: selectedFont, fontWeight: 'bold', color: selectedColor }}

                />

                <h2 className='undertitle' style={{ fontFamily: selectedFont, fontWeight: 'bold', color: selectedColor }} >Fremgangsmåte:</h2>
                <Instructions ref={textareaRefIns}
                    selectedColor={selectedColor}
                    style={{ fontFamily: selectedFont, fontWeight: 'bold', color: selectedColor }}
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

                {showStickerMenu && (
                    <div className="sticker-menu">
                        {/* Render the Sticker component */}
                        <Sticker addSticker={addSticker} />
                    </div>
                )}


                {showScanOptions && (
                    <div className='ScanOptions'>
                        <Link to='/scan' className='option'>
                            Ingredienser
                        </Link>        <AiOutlineScan style={{ fontSize: '30px', color: '#fff' }} />
                        <Link to='/scanmod' className='option'>
                            Fremgangsmåte      </Link>
                    </div>
                )}


                <div className="icon-row-menu" >

                    <AiOutlineFileText className="icon" onClick={() => toggleMenu('font')} />
                    <AiOutlineScan className="icon" onClick={() => toggleMenu('scan')} />
                    <AiOutlineSmile className="icon" onClick={() => toggleMenu('sticker')} />
                    <AiOutlinePicture className="icon" onClick={() => document.getElementById('file-input').click()} />
                    <AiOutlineBgColors className="icon" onClick={() => toggleMenu('color')} />
                </div>
            </div>
        </div>

    );

}