import { Component } from "react";

export default class Modal extends Component {
    handleEscClick = evt => {
        if (evt.code === 'Escape') {
            this.props.hideModal()
        }
    }

    // handleOverlayClick = evt => {
    //     console.log(evt.currentTarget);
    // }

    componentDidMount() {
		document.addEventListener('keydown', this.handleEscClick)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleEscClick)
    }
    
    render() {
        

        const { hit } = this.props;
        console.log(this.props);
        
        return (
            <div className="Overlay" onClick={this.handleOverlayClick}>
                <div className="Modal">
                    <img src={hit.largeImageURL} alt={hit.tag} />
                </div>
            </div>
        )
    }

}