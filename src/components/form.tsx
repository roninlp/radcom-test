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
    <form className="mt-8 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <div className="mb-6">
        <label
          htmlFor="width"
          className="mb-2 block font-vazir text-sm font-bold text-gray-700"
        >
          عدد اول
        </label>
        <input
          id="width"
          onChange={handleChangeInputs}
          value={inputs.width}
          type="number"
          name="width"
          className="w-full rounded-lg border border-gray-300 p-3 text-center font-vazir text-lg transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="عدد اول را وارد کنید"
        />
        {errors.width.length > 0 && (
          <p className="mt-2 h-6 font-vazir text-xs italic text-red-500">
            {errors.width.join(", ")}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="height"
          className="mb-2 block font-vazir text-sm font-bold text-gray-700"
        >
          عدد دوم
        </label>
        <input
          id="height"
          type="number"
          onChange={handleChangeInputs}
          name="height"
          value={inputs.height}
          className="w-full rounded-lg border border-gray-300 p-3 text-center font-vazir text-lg transition duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="عدد دوم را وارد کنید"
        />
        {errors.height.length > 0 && (
          <p className="mt-2 h-6 font-vazir text-xs italic text-red-500">
            {errors.height.join(", ")}
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={buttonIsDisabled}
        onClick={() => createTable(inputs)}
        className="w-full rounded-lg bg-blue-500 p-3 text-center font-vazir text-lg font-bold text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        ساخت جدول
      </button>
    </form>
  );
};
