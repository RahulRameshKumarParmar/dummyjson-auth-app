import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, [skip]);

  return (
    <div>
      <h2>Products</h2>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card p-2">
              <h5>{p.title}</h5>
              <p>{p.price} $</p>
              <Link to={`/products/${p.id}`} className="btn btn-sm btn-outline-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-secondary"
          disabled={skip === 0}
          onClick={() => setSkip(skip - 10)}
        >
          Prev
        </button>
        <button className="btn btn-secondary" onClick={() => setSkip(skip + 10)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
