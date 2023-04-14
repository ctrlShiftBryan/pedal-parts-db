// components/BulkAddPartsForm.tsx

import { useState } from 'react';

type BulkAddPartsFormProps = {
  router: any,
  id: string | string[] | undefined
};

export default function BulkAddPartsForm({ router, id }: BulkAddPartsFormProps) {
  const [bulkFormData, setBulkFormData] = useState({
    type: "",
    parts: "",
  });


  const handleBulkFormChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setBulkFormData({
      ...bulkFormData,
      [name]: value,
    });
  };

  const handleBulkFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { type, parts } = bulkFormData;
    const partLines = parts.split("\n");

    const processLine = async (line: string) => {
      const [part, value] = line.split(" ");

      const res = await fetch(`/api/pedals/${id}/parts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: 1,
          part,
          type,
          value,
          order: 0,
          ordered: false,
          polarized: false
        }),
      });

      const newPedalPart = await res.json();
      return newPedalPart;
    };

    // Process each part sequentially
    for (const line of partLines) {
      await processLine(line);
    }

    // Clear the textarea by resetting the parts property in the state object
    setBulkFormData({
      ...bulkFormData,
      parts: "",
    });

    router.replace(router.asPath);
  };


  return (
    <form onSubmit={handleBulkFormSubmit}>
      <div className="mb-4">
        <label htmlFor="bulkType" className="block mb-2">
          Type:
        </label>
        <select
          id="bulkType"
          name="type"
          value={bulkFormData.type}
          onChange={handleBulkFormChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select a type</option>
          <option value="Resistor">Resistor</option>
          <option value="Capacitor">Capacitor</option>
          <option value="Diode">Diode</option>
          <option value="Integrated Circuit">Integrated Circuit</option>
          <option value="Potentiometers">Potentiometers</option>
          <option value="Other">Other</option>

        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="bulkParts" className="block mb-2">
          Parts:
        </label>
        <textarea
          id="bulkParts"
          name="parts"
          value={bulkFormData.parts}
          onChange={handleBulkFormChange}
          className="w-full h-48 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <button type="submit" className="px-3 py-2 text-white bg-blue-500 rounded">
          Add Parts
        </button>
      </div>
    </form>
  );
}
