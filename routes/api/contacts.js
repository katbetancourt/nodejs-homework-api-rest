const express = require("express");
const router = express.Router();
const updateStatusContact = require("../../controllers/contactsController");

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");
const { validateContact } = require("../../validators/contactValidator");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getById(req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateContact, async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.id);
    if (result.deletedCount === 1) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateContact, async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.id, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});



router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  // Verifica si se proporcionó el campo "favorite" en el body
  if (typeof favorite === "undefined") {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    // Actualiza el estado del contacto en la base de datos
    const updatedContact = await updateStatusContact(contactId, favorite);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;








