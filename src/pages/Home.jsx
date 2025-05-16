import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts } from "../components/contacts";
import ContactCard from "../components/ContactCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    async function fetchContacts() {
      try {
        const data = await getContacts();
        dispatch({ type: "set_contacts", payload: data });
      } catch (error) {
        console.error("Error al cargar contactos", error);
      }
    }

    fetchContacts();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h1>Lista de Contactos</h1>
      <div>
        {store.contacts.map(contact => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
      <Link to="/add" className="btn btn-success mb-3">Agregar Contacto</Link>
    </div>
  );
};


