import { FormEvent, useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleOnChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="email" placeholder="email" onChange={handleOnChange} />
        <input type="password" name="password" placeholder="password" onChange={handleOnChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
