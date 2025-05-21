import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts, createAgenda } from "../components/contacts";
import ContactCard from "../components/ContactCard";



export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
  async function fetchContacts() {
    try {
     // await createAgenda(); 
      const data = await getContacts();
      dispatch({ type: "set_contacts", payload: data });
    } catch (error) {
      console.error("Error al cargar contactos", error);
    }
  }

  fetchContacts();
}, [dispatch]);


  return (
 <div className="card mt-4 p-3" style={{ width: "70rem" }}>
  <div className="card-header text-center">
    <h2>Contactos</h2>
  </div>
  <div className="card-body">
    <div className="row">
      {store.contacts.map(contact => (
        <div key={contact.id} className="col-md-6 mb-3">
          <ContactCard contact={contact} />
        </div>
      ))}
    </div>
  </div>
</div>

  );
};


