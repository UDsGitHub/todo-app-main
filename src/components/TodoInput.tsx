import { FormEvent, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const TodoInput = ({ value, onChange, onSubmit }: Props) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <form
      onSubmit={onSubmit}
      className={`${
        isDarkMode ? "bg-[#25273c]" : "bg-white"
      } bg-[#25273c] h-12 px-5 md:px-6 flex items-center gap-6 rounded-md mb-6`}
    >
      <div
        className={`size-[22px] rounded-full border-[1px] ${
          isDarkMode ? "border-[#393a4c]" : "border-[#d2d3db]"
        }`}
      ></div>
      <div className="flex-1">
        <input
          className="bg-transparent caret-[#3a7bfd] outline-none w-full"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </form>
  );
};

export default TodoInput;
