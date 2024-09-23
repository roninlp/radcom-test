import { useState } from "react";
import { TableGenerator } from "./components/table-generator";
import { Form } from "./components/form";

function App() {
  const [dimensions, setDimensions] = useState({ width: 5, height: 5 });
  const [showTable, setShowTable] = useState(false);

  const handleGenerateTable = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    setDimensions({ width, height });
    setShowTable(true);
  };

  return (
    <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-center p-4">
      <h1>۲۳۴رادکام313</h1>
      <Form createTable={handleGenerateTable} />
      {showTable && (
        <TableGenerator width={dimensions.width} height={dimensions.height} />
      )}
    </div>
  );
}

export default App;
