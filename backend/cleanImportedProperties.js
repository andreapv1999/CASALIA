const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Property = require("./models/Property");

dotenv.config();

const cleanImportedProperties = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await Property.deleteMany({
      title: { $regex: / numero \d+$/i }
    });

    console.log(`${result.deletedCount} viviendas duplicadas eliminadas.`);

  } catch (error) {
    console.error("Error al limpiar viviendas:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

cleanImportedProperties();