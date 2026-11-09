const fs = require("fs");
const path = require("path");

const tipos = ["piso", "casa", "chalet", "atico", "local"];
const operaciones = ["venta", "alquiler"];
const zonas = [
  "Sevilla Centro",
  "Sevilla Nervion",
  "Sevilla Triana",
  "Sevilla Los Remedios",
  "Sevilla Macarena",
  "Dos Hermanas",
  "Alcala de Guadaira",
  "Mairena del Aljarafe",
  "Tomares",
  "Montequinto"
];

const filas = [
  "title,description,price,type,operation,location,bedrooms,bathrooms,area,status"
];

for (let i = 1; i <= 120; i++) {
  const tipo = tipos[(i - 1) % tipos.length];
  const operacion = operaciones[i % 2];
  const zona = zonas[(i - 1) % zonas.length];
  const precio = operacion === "venta"
    ? 90000 + (i * 2750)
    : 550 + (i * 12);

  filas.push([
    `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} numero ${i}`,
    `Vivienda numero ${i} con excelentes caracteristicas y buena ubicacion`,
    precio,
    tipo,
    operacion,
    zona,
    tipo === "local" ? 0 : 1 + (i % 4),
    1 + (i % 3),
    50 + (i * 3),
    "disponible"
  ].join(","));
}

const ruta = path.join(__dirname, "data", "properties.csv");

fs.writeFileSync(ruta, filas.join("\n"), "utf8");

console.log("Archivo CSV generado con 120 viviendas correctamente.");