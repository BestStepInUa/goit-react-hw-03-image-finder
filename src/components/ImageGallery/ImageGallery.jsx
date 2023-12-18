import ImageGalleryItem from "components/ImageGalleryItem"

const ImageGallery = ({ hits }) => {
    return (
        <ul className="ImageGallery">
            {hits.length > 0 && hits.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem key={id} smallImg={webformatURL} largeImg={largeImageURL} desc={tags} />
            ))}  
        </ul>
    )
}

export default ImageGallery