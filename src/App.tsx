import { useState } from "react";
import { TableGenerator } from "./components/table-generator";
import { Form } from "./components/form";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleReset = () => {
    setShowTable(false);
    setDimensions({ width: 5, height: 5 });
  };

  return (
    <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-3xl font-bold">رادکام</h1>
      <AnimatePresence mode="wait">
        {!showTable ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Form createTable={handleGenerateTable} />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <TableGenerator
              width={dimensions.width}
              height={dimensions.height}
            />
            <motion.button
              onClick={handleReset}
              className="mt-6 transform rounded-lg bg-red-500 px-6 py-3 font-bold text-white transition duration-200 hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ریست
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
