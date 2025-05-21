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
      await createAgenda(); 
      const data = await getContacts();
      dispatch({ type: "set_contacts", payload: data });
    } catch (error) {
      console.error("Error al cargar contactos", error);
    }
  }

  fetchContacts();
}, [dispatch]);

  return (
    <div className="text-center mt-5 ">
			<h1>Lista de morosos
				
			</h1>
		<div className= "d-flex justify-content-center">
			
		<div className="d-flex flex-column align-items-center">
  {store.contacts.map(contact => (
    <ContactCard key={contact.id} contact={contact} />
  ))}
</div>

		</div>
		</div>
  );
};


