const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const csv = require("csv-parser");
const dotenv = require("dotenv");
const Property = require("./models/Property");

dotenv.config();

const csvPath = path.join(__dirname, "data", "properties.csv");

const importProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado correctamente");

    const properties = [];

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        properties.push({
          ...row,
          price: Number(row.price),
          bedrooms: Number(row.bedrooms),
          bathrooms: Number(row.bathrooms),
          area: Number(row.area),
          images: [],
        });
      })
      .on("end", async () => {
        try {
          await Property.insertMany(properties);
          console.log(`${properties.length} viviendas importadas correctamente.`);
        } catch (error) {
          console.error("Error al guardar las viviendas:", error.message);
        } finally {
          await mongoose.disconnect();
        }
      })
      .on("error", async (error) => {
        console.error("Error al leer el CSV:", error.message);
        await mongoose.disconnect();
      });
  } catch (error) {
    console.error("Error de conexión:", error.message);
    await mongoose.disconnect();
  }
};

importProperties();