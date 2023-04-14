// components/PartsList.tsx


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
  return (
    <ul>
      {parts.map((pedalPart) => (
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
  );
}
