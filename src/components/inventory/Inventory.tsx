import React, { useContext } from "react";
import Navbar from "./Navbar";
import { IItem, initialItem } from "../../models/IItem";
import "./inventory.css";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DetailsModal from "../modals/DetailsModal";
import { createPortal } from "react-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AddEditModal from "../modals/AddEditModal";
import { ItemsContext } from "../../contexts/ItemsContext";
import { ActionType } from "../../actions/actions";

const Inventory = () => {
  const context = useContext(ItemsContext);

  const [itemDetails, setItemDetails] = React.useState(initialItem);
  const [filter, setFilter] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(context?.items);

  function addNewItem() {
    setShowAddModal(true);
  }

  function editItem(item: IItem) {
    setShowEditModal(true);
    setItemDetails(item);
  }

  function deleteItem(id: string) {
    context?.dispatch({ type: ActionType.DELETE_ITEM, payload: { id: id } });
  }

  function viewItemDetails(item: IItem) {
    setShowModalDetails(true);
    setItemDetails(item);
  }

  function filterItems(event: any) {
    setFilter(event.target.value);
  }

  React.useEffect(() => {
    setFilteredItems(
      context?.items.filter((item) =>
        item.title.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [context?.items, filter]);

  const mapItems: any = (item: IItem) => (
    <tr id={item.id} key={item.id}>
      <td>{item.title}</td>
      <td>{item.quantity}</td>
      <td>{item.id}</td>
      <td>
        <IconButton aria-label="edit" onClick={() => editItem(item)}>
          <ModeEditIcon />
        </IconButton>
      </td>
      <td>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => deleteItem(item.id)}
        >
          <DeleteIcon />
        </IconButton>
      </td>
      <td>
        <IconButton aria-label="details" onClick={() => viewItemDetails(item)}>
          <ReadMoreIcon />
        </IconButton>
      </td>
    </tr>
  );

  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showModalDetails, setShowModalDetails] = React.useState(false);

  return (
    <div>
      <Navbar />
      <div className="d-flex action justify-content-between">
        <form>
          <div>
            <input
              type="text"
              value={filter}
              onChange={(event) => filterItems(event)}
              placeholder="Filter by title"
              className="form-control"
            />
          </div>
        </form>
        <button type="button" className="btn" onClick={addNewItem}>
          Add new item
        </button>
      </div>

      {showAddModal &&
        createPortal(
          <AddEditModal
            showModal={showAddModal}
            onClose={() => setShowAddModal(false)}
            editFlag={false}
          />,
          document.body
        )}

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Quantity</th>
            <th scope="col">Item ID</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {filter ? filteredItems?.map(mapItems) : context?.items.map(mapItems)}
          {showModalDetails &&
            createPortal(
              <DetailsModal
                showModal={showModalDetails}
                onClose={() => setShowModalDetails(false)}
                item={itemDetails}
              />,
              document.body
            )}
          {showEditModal &&
            createPortal(
              <AddEditModal
                showModal={showEditModal}
                onClose={() => setShowEditModal(false)}
                item={itemDetails}
                editFlag={true}
              />,
              document.body
            )}
        </tbody>
      </table>
      {!context?.items.length && (
        <p className="no-data-label">
          No data to display, please add new items!
        </p>
      )}
    </div>
  );
};

export default Inventory;
