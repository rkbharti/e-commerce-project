import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        /* 💡 MongoDB Atlas mein 'id' nahi '_id' hota hai. 
           Hum fallback check kar rahe hain taaki dono cases handle ho sakein.
        */
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;