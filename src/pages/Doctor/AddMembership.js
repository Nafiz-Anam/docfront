import { Modal } from "react-bootstrap";
import { useState } from "react";
const AddMemberShip = () => {
    const [lgShow, setLgShow] = useState(false);
    return (
        <>
            {/* <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add Membarship
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
            </Modal> */}
            {/* <h1>
                Welcome
            </h1> */}
        </>
    )
}

export default AddMemberShip;