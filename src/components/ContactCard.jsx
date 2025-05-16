import { Link } from "react-router-dom";
import { deleteContact } from "../components/contacts";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ContactCard = ({ contact }) => {
  const { dispatch } = useGlobalReducer();

  const handleDelete = async () => {
    if (window.confirm("¿Seguro que quieres eliminar este contacto?")) {
      await deleteContact(contact.id);
      dispatch({ type: "delete_contact", payload: contact.id });
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5>{contact.full_name}</h5>
        <p>{contact.email}<br />{contact.phone}<br />{contact.address}</p>
        <Link to={`/edit/${contact.id}`} className="btn btn-warning me-2">Editar</Link>
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
      </div>
    </div>
  );
};

export default ContactCard;
