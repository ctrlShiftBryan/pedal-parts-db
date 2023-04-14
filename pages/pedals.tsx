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
      <div className="mt-6">
        {pedals.map((pedal) => (
          <div key={pedal.id} className="pb-4 mb-4 border-b border-gray-300">
            <h2 className="text-xl font-bold">
              <Link href={`/pedals/${pedal.id}`}>
                <div>{pedal.name}</div>
              </Link>
            </h2>
          </div>
        ))}
      </div>
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
