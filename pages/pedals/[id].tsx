// pages/pedals/[id].tsx

import { Pedal } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddPartForm from '../../components/AddPartForm';
import BulkAddPartsForm from '../../components/BulkAddPartsForm';
import PartsList from '../../components/PartsList';
import PedalForm from '../../components/PedalForm';
import Link from 'next/link';

type EditPedalPageProps = {
  pedal: PedalDto;
};

type PedalDto = Pedal & {
  PedalPart: {
    id: number;
    polarized: boolean;
    partNum: string;
    part: {
      type: string;
      part: string;
      value: string;
    };
  }[];
};

export default function EditPedalPage({ pedal: initialPedal }: EditPedalPageProps) {
  const router = useRouter();
  const { id } = router.query;

  const [showDelete, setShowDelete] = useState(false);

  const handleTogglePolarized = async (pedalPartId: number, currentValue: boolean) => {
    // Send a PUT request to update the polarized value of the pedal part
    await fetch(`/api/pedals/${id}/parts/${pedalPartId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ polarized: !currentValue }),
    });

    // Refresh the page
    router.replace(router.asPath);
  };

  const handlePartDelete = async (pedalPartId: number) => {
    const res = await fetch(`/api/pedals/${id}/parts/${pedalPartId}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      router.replace(router.asPath);
    }
  };

  return (
    <div className="container flex flex-row py-6 mx-auto">
      <div>
        <Link href="/pedals">Home</Link>
        <h1 className="mb-6 text-3xl">Edit Pedal</h1>
        <PedalForm initialPedal={initialPedal} id={id} router={router} />
        <div className="mt-6">
          <h2 className="mb-4 text-2xl">Parts List</h2>
          <button
            onClick={() => setShowDelete(!showDelete)}
            className="ml-auto text-red-500"
          >
            {showDelete ? 'Hide Delete' : 'Show Delete'}
          </button>
          <PartsList
            parts={initialPedal.PedalPart}
            showDelete={showDelete}
            onTogglePolarized={handleTogglePolarized}
            onDelete={handlePartDelete}
          />
        </div>

      </div>
      <div>

        <div className="mt-6">
          <h2 className="mb-4 text-2xl">Add Parts in Bulk</h2>
          <BulkAddPartsForm router={router} id={id} />
        </div>
        <div className="mt-6">
          <h2 className="mb-4 text-2xl">Add New Part</h2>
          <AddPartForm router={router} id={id} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/pedals/${params?.id}`);
  const pedal = await res.json();
  return {
    props: { pedal },
  };
};
