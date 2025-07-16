import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const flogin = () => {
    const foundUser = users.find(
      (u) => u.username === form.username && u.password === form.password
    );
  
    if (foundUser) {
      navigate(`/products/${foundUser.username}`);
    } else {
      alert('معلومات الدخول غير صحيحة');
    }
  };
  

  return (
    <div>
      <h3>تسجيل دخول</h3>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      /><br />
      <button onClick={flogin}>دخول</button>
      <p>
      ما عندك حساب؟ <Link to="/register">سجل من هنا</Link>
    </p>
    </div>
  );
}

export default Login;