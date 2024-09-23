import { useForm } from "../hooks/useForm";

export const Form = ({
  createTable,
}: {
  createTable: (table: { width: number; height: number }) => void;
}) => {
  const { inputs, errors, handleChangeInputs } = useForm();

  const buttonIsDisabled =
    inputs.width === 0 ||
    inputs.height === 0 ||
    errors.width.length > 0 ||
    errors.height.length > 0;

  return (
    <form className="mt-8 w-full max-w-md">
      <input
        onChange={handleChangeInputs}
        value={inputs.width}
        type="number"
        name="width"
        className="w-full rounded-lg bg-gray-200 p-2 text-center font-vazir text-xl font-bold"
        placeholder="عدد اول"
      />
      <div className="h-8">{errors.width.join(", ")}</div>
      <input
        type="number"
        onChange={handleChangeInputs}
        name="height"
        value={inputs.height}
        className="w-full rounded-lg bg-gray-200 p-2 text-center text-xl font-bold"
        placeholder="عدد دوم"
      />
      <div className="h-8">{errors.height.join(", ")}</div>
      <button
        type="button"
        disabled={buttonIsDisabled}
        onClick={() => createTable(inputs)}
        className="w-full rounded-lg bg-blue-500 p-2 text-center font-vazir text-xl font-bold disabled:bg-gray-400 disabled:text-white"
      >
        ساخت جدول
      </button>
    </form>
  );
};
