export default function ProjectTable() {
  return (
    <div className="bg-white p-4 shadow rounded overflow-x-auto">
      <h3 className="font-bold mb-3">Projects</h3>
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Budget</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Residential Building</td>
            <td className="p-2">₹50,00,000</td>
            <td className="p-2 text-green-600">On Track</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
