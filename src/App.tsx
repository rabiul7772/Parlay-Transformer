import useLocalStorageState from 'use-local-storage-state';
import Transformer from './TransformerComponents/Transformer';
import { Button } from '@heroui/button';

export type TransformMode = 'bajifair' | 'bdt-site';

function App() {
  const [selectedTransformMode, setSelectedTransformMode] = useLocalStorageState<TransformMode>('selectedTransformMode',{
    defaultValue: 'bajifair',
  });

  const getButtonVariant = (mode: TransformMode) => {
    return mode === selectedTransformMode ? 'solid' : 'bordered';
  };

  const getButtonColor = (mode: TransformMode) => {
    return mode === selectedTransformMode ? 'success' : 'default';
  };
 
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-2 bg-indigo-600 rounded-lg text-center">
        <h1 className="text-xl font-semibold">JSON Transformer Tool</h1>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <Button
              color={getButtonColor('bajifair')}
              variant={getButtonVariant('bajifair')}
              onPress={() => setSelectedTransformMode('bajifair')}
            >
              Bajifair
            </Button>
            <Button
              color={getButtonColor('bdt-site')}
              variant={getButtonVariant('bdt-site')}
              onPress={() => setSelectedTransformMode('bdt-site')}
            >
              BDT Site
            </Button>
          </div>
          <Transformer selectedTransformMode={selectedTransformMode} />
        </div>
      </main>
    </div>
  );
}

export default App;
