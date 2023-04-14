// pages/parts.tsx

import { GetServerSideProps } from 'next';
import { PrismaClient, Part } from '@prisma/client';

const prisma = new PrismaClient();

type PartsPageProps = {
  parts: Part[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const parts = await prisma.part.findMany({
    orderBy: [
      {
        type: 'asc',
      },
      {
        value: 'asc',
      },
    ],
  });

  return {
    props: {
      parts: JSON.parse(JSON.stringify(parts)),
    },
  };
};

const PartsPage: React.FC<PartsPageProps> = ({ parts }) => {
  return (
    <div className="container py-6 mx-auto">
      <h1 className="mb-6 text-3xl">Parts</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Type</th>
            <th>Value</th>
            <th>Order</th>
            <th>Ordered</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id}>
              <td className="px-4 py-2 border">{part.type}</td>
              <td className="px-4 py-2 border">{part.value}</td>
              <td className="px-4 py-2 border">{part.order}</td>
              <td className="px-4 py-2 border">{part.ordered ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartsPage;
