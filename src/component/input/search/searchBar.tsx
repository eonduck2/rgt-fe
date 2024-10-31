import TSearchBarProps from "@/types/component/input/search/searchBarProps.type";
import { Search } from "lucide-react";

const SearchBar = ({ value, setter }: TSearchBarProps) => {
  return (
    <div className="relative flex-1 max-w-md mx-4">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="메뉴 검색..."
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
      />
    </div>
  );
};

export default SearchBar;

