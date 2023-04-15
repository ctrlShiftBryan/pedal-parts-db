// components/PartsList.tsx

import { useState } from "react";


type PartsListProps = {
  parts: {
    id: number;
    polarized: boolean;
    partNum: string;
    part: {
      type: string;
      part: string;
      value: string;
    };
  }[]
  showDelete: boolean;
  onTogglePolarized: (pedalPartId: number, currentValue: boolean) => void;
  onDelete: (pedalPartId: number) => void;
};

export default function PartsList({
  parts,
  showDelete,
  onTogglePolarized,
  onDelete,
}: PartsListProps) {


  const [filter, setFilter] = useState('All');
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredParts = filter === 'All' ? parts : parts.filter(part => part.part.type === filter);

  return (
    <div>
      <label htmlFor="filter" className="block mb-2">Filter:</label>
      <select
        id="filter"
        name="filter"
        value={filter}
        onChange={handleFilterChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="All">All</option>
        <option value="Resistor">Resistor</option>
        <option value="Capacitor">Capacitor</option>
        <option value="Diode">Diode</option>
        <option value="Integrated Circuit">Integrated Circuit</option>
        <option value="Potentiometers">Potentiometers</option>
        <option value="Other">Other</option>
      </select>
      <ul>
        {filteredParts.map((pedalPart) => (
          <li key={pedalPart.id} className="mb-2">
            {pedalPart.partNum}: {pedalPart.part.type}: {pedalPart.part.value}
            {
              !showDelete && pedalPart.part.type === 'Capacitor' && < input
                type="checkbox"
                checked={pedalPart.polarized}
                onChange={() => onTogglePolarized(pedalPart.id, pedalPart.polarized)}
                className="mr-2"
              />
            }
            {
              showDelete && (<button
                onClick={() => onDelete(pedalPart.id)}
                className="ml-auto text-red-500"
              >
                Delete
              </button>)
            }
          </li>
        ))}
      </ul>
    </div>
  );
}
