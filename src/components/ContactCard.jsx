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
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          {/* Aquí la foto */}
          <img
            src="https://imgs.search.brave.com/gUCbyUYFr7zOzYC535vxIENqrMw_WpM3JnYzUNQZSPI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU1/MzUwNzMyL2VzL2Zv/dG8vcmV0cmF0by1k/ZS1ob21icmUtbmVy/ZC1ncmFzYS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9d1lT/b1l6VzZ1SmEzd1E1/YnVDa29YRmJwSjVW/aWg3VEdRdlQ2aDJi/YU9Ocz0"
            alt={contact.name}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5>{contact.name}</h5>
            <p>{contact.email}<br />{contact.phone}<br />{contact.address}</p>
            <Link to={`/edit/${contact.id}`} className="btn btn-warning me-2">Editar</Link>
            <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ContactCard;
