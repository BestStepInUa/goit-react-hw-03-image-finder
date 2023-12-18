const ImageGalleryItem = ({ smallImg, largeImg, desc }) => {
    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={smallImg} alt={desc} data-large-img={largeImg} />
        </li>
    )
}

export default ImageGalleryItem