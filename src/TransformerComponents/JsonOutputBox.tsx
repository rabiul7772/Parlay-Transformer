import { Textarea, Button, addToast } from '@heroui/react';

function CopyIcon() {
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
        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
      />
    </svg>
  );
}

interface JsonOutputBoxProps {
  jsonOutput: string;
}

export default function JsonOutputBox({ jsonOutput }: JsonOutputBoxProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      addToast({
        title: 'Copied',
        description: 'JSON copied to clipboard',
        color: 'success',
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        color: 'danger',
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Transformed Output
        </h2>
        <div className="flex gap-3">
          <Button
            color="secondary"
            variant="flat"
            size="sm"
            startContent={<CopyIcon />}
            className="text-gray-600 hover:text-gray-800"
            onPress={handleCopy}
          >
            Copy
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Textarea
          value={jsonOutput}
          readOnly
          placeholder="Transformed JSON will appear here..."
          minRows={25}
          classNames={{
            base: 'border border-gray-200 rounded-md bg-gray-50',
            input: 'resize-none text-sm font-mono bg-gray-50',
          }}
        />
        <p className="mt-3 text-sm text-gray-600">
          Contains transformed objects with modified properties
        </p>
      </div>
    </div>
  );
}
