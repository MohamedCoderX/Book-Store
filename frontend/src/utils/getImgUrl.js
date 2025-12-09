function getImgUrl(image) {
    if (!image) {
      return null;
    }
  
 
    if (image.startsWith("http") || image.startsWith("https")) {
      return image;
    }
  
   
    const basePath = "http://localhost:3001";
    if (image.includes("/uploads")) {
      return `${basePath}${image}`;
    }
  

    try {
      return new URL(`../assets/books/${image}`, import.meta.url).href;
    } catch {
      return image;
    }
  }
  
  export { getImgUrl };
  