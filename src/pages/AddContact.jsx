import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContact, updateContact, getContacts } from "../components/contacts";
import useGlobalReducer from "../hooks/useGlobalReducer";

const initialForm = {
  full_name: "",
  email: "",
  phone: "",
  address: ""
};

const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (id) {
      const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
      if (contactToEdit) {
        setForm({
          full_name: contactToEdit.full_name,
          email: contactToEdit.email,
          phone: contactToEdit.phone,
          address: contactToEdit.address
        });
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const updated = await updateContact({ ...form, id: parseInt(id) });
        dispatch({ type: "update_contact", payload: updated });
      } else {
        const newContact = await createContact(form);
        dispatch({ type: "add_contact", payload: newContact });
      }
      navigate("/"); // Volver al listado
    } catch (error) {
      console.error("Error al guardar el contacto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Contacto" : "Nuevo Contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre Completo</label>
          <input type="text" className="form-control" name="full_name" value={form.full_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">{id ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default AddContact;
