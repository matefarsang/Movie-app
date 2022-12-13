import { BiPlus } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addMovie, getMovies } from "./use-cases /movie.use-case";

export const ageLimitOptions = [
  { label: "Please select..", value: null },
  { label: "No age limit", value: "NL" },
  { label: 12, value: "12" },
  { label: 16, value: "16" },
  { label: 18, value: "18" },
];

export default function AddMovieForm({ formData, setFormData }) {
  const queryClient = useQueryClient();

  const AddMutation = useMutation(addMovie, {
    onSuccess: () => {
      queryClient.invalidateQueries(["movies"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, ageLimit } = formData;

    const model = {
      title,
      description,
      ageLimit,
    };

    AddMutation.mutate(model);
  };

  if (AddMutation.isLoading) return <div>Loading...!</div>;

  if (AddMutation.isSuccess)
    return <Success message={"New Movie added Successfully"}></Success>;

  if (AddMutation.isError)
    return <Bug message={`Got Error: ${addMutation.error.message}`}></Bug>;

  return (
    <form className="grid lg:grid-cols-3 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <label
          className="antialiased hover:subpixel-antialiased mb-px"
          htmlFor="title"
        >
          Movie Title
        </label>
        <input
          type="text"
          onChange={setFormData}
          name="title"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Title"
        />
      </div>
      <div className="input-type">
        <label
          className="antialiased hover:subpixel-antialiased mb-px"
          htmlFor="description"
        >
          Description
        </label>
        <input
          type="text"
          onChange={setFormData}
          name="description"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Description"
        />
      </div>
      <div className="input-type">
        <label
          className="antialiased hover:subpixel-antialiased mb-px"
          htmlFor="ageLimit"
        >
          Age Limit
        </label>
        <select
          onChange={setFormData}
          name="ageLimit"
          className="border w-full px-5 py-3 focus:outline-none rounded-md antialiased hover:subpixel-antialiased mb-px"
        >
          {ageLimitOptions.map((option) => (
            <option
              selected={option.value === null}
              disabled={option.value === null}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add
        <span className="px-1">
          <BiPlus size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
}
