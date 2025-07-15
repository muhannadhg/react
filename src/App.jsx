import { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: '', title: '', price: 0 });

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:3000/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const Sub = async () => {
    const exs = products.find(p => p.id === form.id);

    const pData = {
      id: form.id,
      title: form.title,
      price: form.price,
    };

    if (exs) {
      const res = await fetch(`http://localhost:3000/products/${form.id}`, {
        method: 'PUT',
        body: `{
          "id": "${pData.id}",
          "title": "${pData.title}",
          "price": ${pData.price}
        }`
      });
    } else {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
        body: `{
          "id": "${pData.id}",
          "title": "${pData.title}",
          "price": ${pData.price}
        }`
      });
    }

    setForm({ id: '', title: '', price: 0 });
  };

  const Delete = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });
  };

  return (
    <div>

      <input
        type="text"
        placeholder="ID"
        value={form.id}
        onChange={(e) => setForm({ ...form, id: e.target.value })}
      /><br />
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      /><br />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      /><br />
      <button onClick={Sub}>
        {products.find(p => p.id === form.id) ? 'تعديل' : 'إضافة'}
      </button>


      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.id} - {product.title} ({product.price})
            <button onClick={() => Delete(product.id)}>
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
