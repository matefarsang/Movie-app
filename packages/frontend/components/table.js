import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getMovies } from "./use-cases /movie.use-case";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";
import { useMemo, useState } from "react";
import Bug from "./bug";

export default function Table() {
  const ageLimitOptions = [
    { label: "All", value: "" },
    { label: "NoL", value: "NL" },
    { label: 12, value: "12" },
    { label: 16, value: "16" },
    { label: 18, value: "18" },
  ];

  const [selectedOption, setSelectedOption] = useState(
    ageLimitOptions[0].value
  );

  const updateSelectedOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["movies", selectedOption],
    () => getMovies(selectedOption)
  );

  const dynamicTable = useMemo(
    () => (
      <>{data ? data.map((obj, index) => <Tr {...obj} key={index} />) : ""}</>
    ),
    [data, isLoading, refetch]
  );

  if (isLoading) return <div>Movies is Loading...!</div>;
  if (isError) return <Bug message={`Got Error ${error}`}></Bug>;

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-16 py-2">
            <span className="text-gray-200">Title</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Description</span>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Age Limit</span>
            <select
              className="ml-2.5 bg-gray-800 text-gray-200 form-select form-select-lg"
              value={selectedOption}
              onChange={(event) => updateSelectedOption(event)}
            >
              {ageLimitOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </th>
          <th className="px-16 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>

      <tbody className="bg-gray-2000">{dynamicTable}</tbody>
    </table>
  );
}

function Tr({ _id, title, description, ageLimit }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2">
        <span className="text-center ml-2 font-semibold">
          {title || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2">
        <span>{description || "Unknown"}</span>
      </td>
      <td className="px-16 py-2">
        <span
          className={
            ageLimit == 18
              ? "border-4 border-red-600 px-1 py-1 focus:outline-none rounded-full font-bold"
              : ageLimit == 16
              ? "border-4 border-yellow-500 px-1 py-1 focus:outline-none rounded-full font-semibold"
              : ageLimit == 12
              ? "border-4 border-yellow-200 px-1 py-1 focus:outline-none rounded-full font-medium"
              : "bg-green-400 border-2 border-black text-green-400 px-1 py-1 focus:outline-none rounded-full font-semibold"
          }
        >
          {ageLimit || "Unknown"}
        </span>
      </td>
      <td className="px-16 py-2 flex justify-around gap-5">
        <button onClick={onUpdate} className="cursor">
          <BiEdit size={27} color={"rgb(34,197,94"}></BiEdit>
        </button>
        <button onClick={onDelete} className="cursor">
          <BiTrashAlt size={27} color={"rgb(244,63,94"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
