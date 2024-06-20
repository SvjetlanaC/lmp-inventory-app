import React, { useContext, useEffect } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { ActionType } from "../../actions/actions";
import { initialItem } from "../../models/IItem";
import { nanoid } from "nanoid";

const AddEditModal = (props: any) => {
  const context = useContext(ItemsContext);

  const [newItem, setNewItem] = React.useState(initialItem);

  function editItem(event: any): void {
    event.preventDefault();
    context?.dispatch({ type: ActionType.EDIT_ITEM, payload: newItem });
    props.onClose();
  }

  function addItem(event: any): void {
    event.preventDefault();
    context?.dispatch({
      type: ActionType.ADD_ITEM,
      payload: {
        id: nanoid(),
        title: newItem.title,
        description: newItem.description,
        quantity: newItem.quantity,
      },
    });
    props.onClose();
  }

  function handleForm(event: any) {
    const { name, value } = event.target;
    setNewItem((prevState) => ({ ...prevState, [name]: value }));
  }

  useEffect(() => {
    props.editFlag && setNewItem(props.item);
  }, [props.editFlag, props.item]);

  return (
    <div>
      <div
        className="modal"
        style={{ display: props.showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {props.editFlag ? (
                <h5 className="modal-title">Edit item</h5>
              ) : (
                <h5 className="modal-title">Add item</h5>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={props.onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(event) =>
                  props.editFlag ? editItem(event) : addItem(event)
                }
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="title">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter Title"
                    value={newItem.title}
                    className="form-control"
                    onChange={(event) => handleForm(event)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Enter Description"
                    value={newItem.description}
                    className="form-control"
                    onChange={(event) => handleForm(event)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    placeholder="Enter Quantity"
                    className="form-control"
                    value={newItem.quantity}
                    onChange={(event) => handleForm(event)}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
