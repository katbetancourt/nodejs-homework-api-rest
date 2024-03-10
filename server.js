const app = require("./app");
const express = require("express");
const contactsRouter = require("./routes/api/contacts");

const port = 3001; // Cambia el número de puerto a 3001
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// app.js
const mongoose = require("mongoose");

// Conexión a la base de datos
mongoose.connect(
  "mongodb+srv://katbetancourt:4zvGaA3LDk2R3KBy@cluster0.jjhd5kp.mongodb.net/db_contacts?retryWrites=true&w=majority&appName=Cluster0 ",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión:"));
db.once("open", function () {
  console.log("Conexión a la base de datos exitosa");
});

const PORT = process.env.PORT || 3000;

// Conectarse a la base de datos

// Middleware para manejar body en formato JSON
app.use(express.json());

// Rutas de contactos
app.use("/api/contacts", contactsRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
