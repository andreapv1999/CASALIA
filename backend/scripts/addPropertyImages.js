
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const Property = require("../models/Property");

// Fotografías de viviendas e interiores
const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
];

const addImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    console.log("Comprobando fotografías...");

    const validImages = [];

    for (const url of images) {
      try {
        const response = await fetch(url, { method: "HEAD" });
        const contentType = response.headers.get("content-type") || "";

        if (response.ok && contentType.includes("image")) {
          validImages.push(url);
          console.log("Imagen válida:", url.split("?")[0]);
        } else {
          console.log("Imagen descartada:", url.split("?")[0]);
        }
      } catch (error) {
        console.log("No se pudo comprobar:", url.split("?")[0]);
      }
    }

    if (validImages.length === 0) {
      throw new Error("No se ha encontrado ninguna imagen válida. No se han modificado las propiedades.");
    }

    console.log(`Fotografías válidas: ${validImages.length}`);

    const properties = await Property.find().sort({ _id: 1 });

    console.log(`Propiedades encontradas: ${properties.length}`);
    console.log("Actualizando fotografías...");

    for (let i = 0; i < properties.length; i++) {
      const selectedImage = validImages[i % validImages.length];

      properties[i].images = [selectedImage];
      await properties[i].save();

      console.log(`Actualizada ${i + 1}/${properties.length}`);
    }

    console.log("¡Todas las propiedades han sido actualizadas!");

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    console.log("Conexión cerrada");
  }
};

addImages();
