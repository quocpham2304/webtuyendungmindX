import { Button } from "antd";
import React, { useState } from "react";


function Modal(params) {
    const [modal, setModal] = useState(false);

    const toggleMdodal = () => {
        setModal(!modal)
    }
    return (
        <>
            <button
                onClick={toggleMdodal}
                className="btn-modal">
            </button>
            {modal && (
                <div onClick={toggleMdodal}
                    className="modal">
                    <div className="overlay">
                        <div className="modal-content">
                            <h2>Hello world</h2>
                            <p>vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv</p>
                            <button
                                className="close-modal"
                                onClick={toggleMdodal}>
                                close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;