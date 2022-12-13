import { BiBrush } from "react-icons/bi";
import Success from "./success";
import Bug from "./bug";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getMovie, updateMovie, getMovies } from "./use-cases /movie.use-case";
import { ageLimitOptions } from "./addMovieForm";
import { useMemo } from "react";

export default function UpdateMovieForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["movie", formId],
    () => getMovie(formId)
  );

  const UpdateMutation = useMutation(
    async (newData) => await updateMovie(formId, newData),
    {
      onSuccess: () => {
        queryClient.prefetchQuery(["movies", getMovies({})]);
        //
      },
    }
  );

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <Bug message={`Got Error ${error}`}></Bug>;

  const { title, description, ageLimit } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = Object.assign({}, data, formData);

    await UpdateMutation.mutate(updated);
  };

  if (UpdateMutation.isLoading) return <div>Loading!</div>;

  if (UpdateMutation.isSuccess)
    return <Success message={"The Movie updated Successfully"}></Success>;

  if (UpdateMutation.isError)
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
          defaultValue={title}
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
          defaultValue={description}
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
          defaultValue={ageLimit}
          name="ageLimit"
          className="border w-full px-5 py-3 focus:outline-none rounded-md antialiased hover:subpixel-antialiased mb-px"
          onChange={setFormData}
        >
          {ageLimitOptions.map((option) => (
            <option
              hidden={option.value === null}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button className="flex justify-center text-md w-2/5 bg-yellow-400 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500">
        Update
        <span className="px-1">
          <BiBrush size={24}></BiBrush>
        </span>
      </button>
    </form>
  );
}
