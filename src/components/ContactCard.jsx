const ContactCard = ({ contact }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{contact.full_name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {contact.email}<br />
          <strong>Teléfono:</strong> {contact.phone}<br />
          <strong>Dirección:</strong> {contact.address}
        </p>
       <button className="btn btn-success">Editar contacto</button>
       <button className="btn btn-success">Eliminar contacto</button>
       
        {/* Aquí luego puedes añadir botones de editar/eliminar */}
      </div>
    </div>
  );
};

export default ContactCard;
