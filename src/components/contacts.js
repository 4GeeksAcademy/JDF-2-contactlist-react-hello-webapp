export async function createAgenda () {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/JoanDo`,{
    method: "POST",
    headers: {"Content-Type": "application/json" },
    });
 

    if(!response.ok) throw new Error("Error al crear la agenda")
    
}


export async function getContacts() {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/JoanDo/contacts`);
    if (!response.ok) throw new Error("Error al obtener contactos");
    
    const data = await response.json();
    return data.contacts; // <- aquí devolvemos solo el array
}
const data = await getContacts();
console.log("DATA:", data); // Aquí puedes inspeccionar la estructura real


export async function createContact(contact) {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/JoanDo/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, agenda_slug: "JoanDo" })
    });
    if (!response.ok) throw new Error("Error al crear contacto");
    return await response.json();
}

export async function updateContact(contact) {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/JoanDo/contacts/${contact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact)
    });
    if (!response.ok) throw new Error("Error al actualizar contacto");
    return await response.json();
}

export async function deleteContact(id) {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/JoanDo/contacts/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) throw new Error("Error al eliminar contacto");
}
