import Transformer from './TransformerComponents/Transformer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-2 bg-indigo-600 rounded-lg text-center">
        <h1 className="text-xl font-semibold">JSON Transformer Tool</h1>
      </header>

      <main className="container mx-auto px-6 py-16">
        <Transformer />
      </main>
    </div>
  );
}

export default App;
