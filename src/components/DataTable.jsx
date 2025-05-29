const DataTable = ({ data = [], columns = [] }) => {
  if (!data.length) return <p className="text-gray-500">No data available.</p>;

  return (
    <div className="overflow-x-auto shadow rounded-lg border border-gray-200 mb-6">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.replace(/([A-Z])/g, " $1").trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
                >
                  {typeof item[col] === "object" && item[col] !== null
                    ? JSON.stringify(item[col])
                    : item[col] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
