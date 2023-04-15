// pages/Pedals.tsx

import { Pedal } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';


type PedalsPageProps = {
  pedals: Pedal[];
};

export default function PedalsPage({ pedals }: PedalsPageProps) {
  return (
    <div className="container py-6 mx-auto">
      <h1 className="mb-6 text-3xl">Pedals</h1>
      <Link href="/new-pedal">
        <div className="px-3 py-2 text-white bg-blue-500 rounded">
          Add New Pedal
        </div>
      </Link>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/3 px-4 py-2">Name</th>
            <th className="w-1/3 px-4 py-2">PCB URL</th>
            <th className="w-1/3 px-4 py-2">Build Doc URL</th>
          </tr>
        </thead>
        <tbody>
          {pedals.map((pedal) => (
            <tr key={pedal.id}>
              <td className="px-4 py-2 border">
                <Link href={`/pedals/${pedal.id}`}>
                  <span>{pedal.name}</span>
                </Link>
              </td>
              <td className="px-4 py-2 border">
                <Link href={pedal.pcbUrl || ''} target="_blank" rel="noopener noreferrer">{pedal.pcbUrl ? 'PCB' : ''}</Link>
              </td>
              <td className="px-4 py-2 border">
                <Link href={pedal.buildDocUrl || ''} target="_blank" rel="noopener noreferrer">{pedal.buildDocUrl ? 'Build' : ''}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pedals`);
  const pedals = await res.json();
  return {
    props: { pedals },
  };
};
