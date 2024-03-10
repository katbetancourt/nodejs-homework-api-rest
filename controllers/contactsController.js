const fs = require("fs").promises;
const path = require("path");
const contactsFilePath = path.join(__dirname, "../data/contacts.json");
const Contact = require("../models/contacts");


async function listContacts() {
  const contactsData = await fs.readFile(contactsFilePath, "utf8");
  return JSON.parse(contactsData);
}

async function getById(id) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === id);
}

async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = { id: Date.now().toString(), ...contact };
  contacts.push(newContact);
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(
    contactsFilePath,
    JSON.stringify(updatedContacts, null, 2)
  );
  return { deletedCount: contacts.length - updatedContacts.length };
}

async function updateContact(id, newData) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...newData };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } else {
    return null;
  }
}




async function updateStatusContact(contactId, favorite) {
  try {
    // Encuentra el contacto por ID y actualiza el campo "favorite"
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return updatedContact;
  } catch (error) {
    console.error(error);
    throw error;
  }
}




module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};

