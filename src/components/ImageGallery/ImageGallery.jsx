import { nanoid } from 'nanoid'

import ImageGalleryItem from "components/ImageGalleryItem"

const ImageGallery = ({ hits, showModal, onHitClick }) => {
    return (
        <ul className="ImageGallery">
            {hits.length > 0 && hits.map(({ id, webformatURL, tags }) => (
                <ImageGalleryItem key={id + nanoid()} smallImg={webformatURL} desc={tags} showModal={showModal} onHitClick={onHitClick} />
            ))}  
        </ul>
    )
}

export default ImageGallery