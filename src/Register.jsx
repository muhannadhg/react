import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const fReg = async () => {
    await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: form.username,
        password: form.password
      })
    });
    navigate('/');
  };

  return (
    <div>
      <h3>تسجيل</h3>
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
      <button onClick={fReg}>تسجيل</button>

      <p>
       عندك حساب؟ <Link to="/">تسجيل الدخول</Link>
    </p>

    </div>
  );
}

export default Register;