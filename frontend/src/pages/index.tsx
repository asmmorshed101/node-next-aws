'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  email: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setItems(data.reverse());
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setName('');
        setEmail('');
        fetchItems();
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        color: 'black'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'black' }}>Add User</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                color: 'black'
              }}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '16px',
                color: 'black'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#0070f3',
                color: '#fff',
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
        </form>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          color: 'black'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f1f1' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.id}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <button
                    onClick={() => deleteItem(item.id)}
                    style={{
                      backgroundColor: '#e3342f',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
