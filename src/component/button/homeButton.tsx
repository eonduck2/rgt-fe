import locator from "@/module/browser/locator";
import { forwardSlash } from "@/static/shared/symbol/symbol.static";
import { Home } from "lucide-react";

export default () => {
  return (
    <button
      onClick={() => {
        locator(forwardSlash);
      }}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
    >
      <Home className="w-6 h-6 text-gray-600" />
    </button>
  );
};

