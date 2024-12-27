import { filterType } from "./TodoListFooter";

type Props = {
  filter: filterType;
  changeFilter: (filter: filterType) => void;
};

const FilterOptions = ({ filter, changeFilter }: Props) => {
  return (
    <div className="flex gap-4">
      <button
        className={`duration-300 hover:text-[#cacde8] ${
          filter === "*" && "text-[#57ddff]"
        }`}
        onClick={() => changeFilter("*")}
      >
        All
      </button>
      <button
        className={`duration-300 hover:text-[#cacde8] ${
          filter === "active" && "text-[#57ddff]"
        }`}
        onClick={() => changeFilter("active")}
      >
        Active
      </button>
      <button
        className={`duration-300 hover:text-[#cacde8] ${
          filter === "completed" && "text-[#57ddff]"
        }`}
        onClick={() => changeFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterOptions;
