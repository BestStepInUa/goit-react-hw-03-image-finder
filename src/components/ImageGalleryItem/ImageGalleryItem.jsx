const ImageGalleryItem = ({ smallImg, desc, onHitClick }) => {
    
    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={smallImg} alt={desc} onClick={onHitClick}/>
        </li>
    )
}

export default ImageGalleryItem