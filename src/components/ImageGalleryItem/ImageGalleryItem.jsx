const ImageGalleryItem = ({ hit, onHitClick }) => {
        
    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={hit.webformatURL} alt={hit.tag} onClick={onHitClick(hit)}/>
        </li>
    )
}

export default ImageGalleryItem