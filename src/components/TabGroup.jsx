import { useState } from "react";

const TabGroup = ({ tabs }) => {
  const keys = Object.keys(tabs);
  const [active, setActive] = useState(keys[0]);

  return (
    <div>
      <div className="flex space-x-4 border-b mb-4">
        {keys.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`py-2 px-4 ${
              tab === active
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{tabs[active]}</div>
    </div>
  );
};

export default TabGroup;
