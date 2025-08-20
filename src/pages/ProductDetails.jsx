import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <div className="card p-3">
          <h2>{product.title}</h2>
          <p><b>Price:</b> {product.price} $</p>
          <p><b>Description:</b> {product.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
