// components/PedalForm.tsx

import { Pedal } from '@prisma/client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

type PedalFormProps = {
  initialPedal: Pedal;
  id: string | string[] | undefined
  router: any
};

export default function PedalForm({ initialPedal, id, router }: PedalFormProps) {
  const [name, setName] = useState(initialPedal.name);
  const [pcbUrl, setPcbUrl] = useState(initialPedal.pcbUrl);
  const [buildDocUrl, setBuildDocUrl] = useState(initialPedal.buildDocUrl);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const res = await fetch(`/api/pedals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, buildDocUrl, pcbUrl }),
    });

    const updatedPedal = await res.json();

    if (updatedPedal) {
      router.push('/pedals');
    }
  };

  return (
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
      <div className="flex flex-col mb-4">
        {
          pcbUrl ? <Link target='_blank' href={pcbUrl}>PCB</Link> : <label htmlFor="pcbUrl">PCB URL</label>
        }
        <input
          id="pcbUrl"
          name="pcbUrl"
          type="url"
          placeholder="Enter the PCB URL"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          value={pcbUrl || ''}
          onChange={(e) => setPcbUrl(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        {
          buildDocUrl ? <Link target="_blank" href={buildDocUrl}>BUILD</Link> : <label htmlFor="pcbUrl">BUILD DOCK URL</label>
        }
        <input
          id="buildDocUrl"
          name="buildDocUrl"
          type="url"
          placeholder="Enter the Build Doc URL"
          className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          value={buildDocUrl || ''}
          onChange={(e) => setBuildDocUrl(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="px-3 py-2 text-white bg-blue-500 rounded"
      >
        Save Changes
      </button>
    </form>
  );
}
