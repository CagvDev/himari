function getRandomImage(images) {
  try {
    if (images.wedgies.length > 0) {
      return images.wedgies[Math.floor(Math.random() * images.wedgies.length)];
    } else {
      throw new Error("El array de imágenes está vacío.");
    }
  } catch (error) {
    console.error("Error al seleccionar la imagen:", error);
    return null;
  }
}

module.exports = { getRandomImage };
