import { useState } from 'react';
import JsonInputBox from './JsonInputBox';
import JsonOutputBox from './JsonOutputBox';
import { Button, addToast } from '@heroui/react';
import type { TransformMode } from '../App';

// Icons
function TransformIcon() {
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
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}

function TrashIcon() {
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
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}


type Props = Readonly<{
  selectedTransformMode: TransformMode;
}>;

export default function Transformer({ selectedTransformMode }: Props) {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearAll = () => {
    setJsonInput('');
    setJsonOutput('');
    addToast({
      title: 'Cleared',
      description: 'Input and output have been cleared',
      color: 'warning',
    });
  };

  

  const isValidJson = (json: string): boolean => {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  };

  const handleTransform = async (input: string) => {
    try {
      setIsLoading(true);

      if (!isValidJson(input)) {
        addToast({
          title: 'Invalid JSON',
          description: 'Please enter valid JSON data',
          color: 'danger',
        });
        return '';
      }

      const inputData = JSON.parse(input.trim());

      let transformedOutput;

      if (selectedTransformMode === 'bajifair') {
      if (!Array.isArray(inputData)) {
        addToast({
          title: 'Invalid Input',
          description: 'Input must be an array of objects',
          color: 'danger',
        });
        return '';
      }

      // Include both original objects and their transformed versions in the same array
       transformedOutput = inputData.flatMap(obj => [
        obj,
        {
          ...obj,
          eventId:
            typeof obj.eventId === 'string' ? Number(obj.eventId) : obj.eventId,
          marketId: ` ${obj.marketId}`,
          selectionId:
            typeof obj.selectionId === 'string'
              ? Number(obj.selectionId)
              : obj.selectionId,
        },
      ]);

      } else if (selectedTransformMode === 'bdt-site') {
        // in this case, the input will be just an object, not an array
        transformedOutput = {
          apiSiteType: inputData.apiSiteType,
          eventType: inputData.eventType,
          eventId: inputData.eventId,
          marketId: inputData.marketId,
          selectionId: inputData.selectionId,
          odds: inputData.odds,
          betfairEventId: inputData.betfairEventId,
      };
      }

      const output = JSON.stringify(transformedOutput, null, 2);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(output);
      addToast({
        title: 'Success',
        description: 'JSON has been transformed and copied to clipboard',
        color: 'success',
      });

      return output;

    } catch (error) {
      console.error(error);
      addToast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
        color: 'danger',
      });
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = async (value: string) => {
    setJsonInput(value);
    const output = await handleTransform(value);
    setJsonOutput(output);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-row gap-12">
        <div className="flex-1">
          <JsonInputBox jsonInput={jsonInput} onChange={handleInputChange} />
        </div>
        <div className="flex-1">
          <JsonOutputBox jsonOutput={jsonOutput} />
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onPress={() => handleTransform(jsonInput)}
          color="success"
          isLoading={isLoading}
          size="md"
          startContent={<TransformIcon />}
        >
          Transform
        </Button>
        <Button
          onPress={clearAll}
          color="danger"
          variant="flat"
          size="md"
          startContent={<TrashIcon />}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}
