import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContact, updateContact, getContacts } from "../components/contacts";
import useGlobalReducer from "../hooks/useGlobalReducer";

const initialForm = {
  name: "",
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
          name: contactToEdit.name,
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

  const newContact = {
    ...form,
    agenda_slug: "JoanDo"
  };

  try {
    if (id) {
      // EDITAR
      await updateContact({ ...newContact, id: parseInt(id) });
      dispatch({ type: "update_contact", payload: { ...newContact, id: parseInt(id) } });
    } else {
      // CREAR
      const result = await createContact(newContact);
      dispatch({ type: "add_contact", payload: result });
    }
    navigate("/");
  } catch (error) {
    console.error("Error al guardar el contacto:", error);
  }
};

  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Contacto" : "Nuevo Contacto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre </label>
          <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
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
