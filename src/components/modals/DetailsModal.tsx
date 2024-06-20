import React from "react";

const DetailsModal = (props: any) => {
  if (!props.showModal) return null;

  return (
    <div>
      <div
        className="modal"
        style={{ display: props.showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Item details</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.onClose}
              ></button>
            </div>
            <div className="modal-body">
              <h2>Title: {props.item.title}</h2>
              <p>
                Description: {props.item.description}
                <br />
                Quantity: {props.item.quantity}
                <br />
                Code: {props.item.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
