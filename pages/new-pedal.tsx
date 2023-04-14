// pages/new-pedal.tsx

import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';


export default function NewPedalPage() {
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch('/api/pedals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    const newPedal = await res.json();

    if (newPedal) {
      router.push('/pedals');
    }
  };

  return (
    <div className="container py-6 mx-auto">
      <h1 className="mb-6 text-3xl">Add New Pedal</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-2">
          Name:
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-3 py-2 text-white bg-blue-500 rounded"
        >
          Add Pedal
        </button>
      </form>
    </div>
  );
}
