// components/AddPartForm.tsx

import { useState } from 'react';

type AddPartFormProps = {
  router: any,
  id: string | string[] | undefined
};

function getValue(type: string, value: string, checked: boolean) {

  if (type === 'number' && value !== '') {
    return Number(value);
  }

  if (type === 'checkbox') {
    return checked;
  }

  return value;
}

export default function AddPartForm({ router, id }: AddPartFormProps) {
  const [partFormData, setPartFormData] = useState({
    count: 0,
    part: '',
    type: '',
    value: '',
    order: 0,
    ordered: false,
    polarized: false
  });


  const handlePartFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, } = e.target;

    setPartFormData({
      ...partFormData,
      [name]: getValue(type, value, checked)
    });
  };

  const handlePartFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await fetch(`/api/pedals/${id}/parts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(partFormData),
    });

    const newPart = await res.json();

    if (newPart) {
      router.replace(router.asPath);
    }
  };

  return (
    <form onSubmit={handlePartFormSubmit}>
      <div className="mb-4">
        <label htmlFor="part" className="block mb-2">
          Part:
        </label>
        <input
          id="part"
          name="part"
          type="text"
          value={partFormData.part}
          onChange={handlePartFormChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <label htmlFor="type" className="block mb-2">
            Type:
          </label>
          <select
            id="type"
            name="type"
            value={partFormData.type}
            onChange={handlePartFormChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a type</option>
            <option value="Resistor">Resistor</option>
            <option value="Capacitor">Capacitor</option>
            <option value="Diode">Diode</option>
            <option value="Integrated Circuit">Integrated Circuit</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="value" className="block mb-2">
          Value:
        </label>
        <input
          id="value"
          name="value"
          type="text"
          value={partFormData.value}
          onChange={handlePartFormChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {/* <div className="mb-4">
            <label htmlFor="order" className="block mb-2">
              Order:
            </label>
            <input
              id="order"
              name="order"
              type="number"
              value={partFormData.order}
              onChange={handlePartFormChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div> */}
      <div className="mb-4">
        <label htmlFor="ordered" className="flex items-center">
          <input
            id="ordered"
            name="ordered"
            type="checkbox"
            checked={partFormData.ordered}
            onChange={handlePartFormChange}
            className="mr-2"
          />
          Ordered
        </label>
      </div>

      <div className="mb-4">
        <label htmlFor="count" className="block mb-2">
          Count:
        </label>
        <input
          id="count"
          name="count"
          type="number"
          value={partFormData.count}
          onChange={handlePartFormChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="px-3 py-2 text-white bg-blue-500 rounded"
        >
          Add Part
        </button>
      </div>
    </form>
  );
}
