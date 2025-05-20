import { Textarea, Button, addToast } from '@heroui/react';

function PasteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 0 0 2.25 2.25h.75m0-3H12m-.75 3h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}

interface JsonInputBoxProps {
  jsonInput: string;
  onChange: (value: string) => void;
}

export default function JsonInputBox({
  jsonInput,
  onChange,
}: JsonInputBoxProps) {
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      onChange(clipboardText);
    } catch (error) {
      console.error(error);
      addToast({
        title: 'Error',
        description: 'Failed to paste from clipboard',
        color: 'danger',
      });
    }
  };

  const handleTextAreaPaste = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    const clipboardText = e.clipboardData.getData('text');
    onChange(clipboardText);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Input JSON</h2>
        <Button
          color="secondary"
          variant="flat"
          size="sm"
          startContent={<PasteIcon />}
          className="text-gray-600 hover:text-gray-800"
          onPress={handlePaste}
        >
          Paste
        </Button>
      </div>

      <div className="p-4">
        <Textarea
          value={jsonInput}
          onChange={e => onChange(e.target.value)}
          onPaste={handleTextAreaPaste}
          placeholder="Enter or paste your JSON array here..."
          minRows={25}
          classNames={{
            base: 'border border-gray-200 rounded-md focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500',
            input: 'resize-none text-sm font-mono',
          }}
        />
        <p className="mt-3 text-sm text-gray-600">
          Paste an array of objects containing eventId, marketId, and
          selectionId properties
        </p>
      </div>
    </div>
  );
}
