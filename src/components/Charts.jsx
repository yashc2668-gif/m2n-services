import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

const pieData = [
  { name: "Planning", value: 2 },
  { name: "Execution", value: 3 }
];

const barData = [
  { name: "Project A", budget: 500, spent: 450 },
  { name: "Project B", budget: 300, spent: 280 }
];

export default function Charts() {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold mb-2">Project Phases</h3>
        <PieChart width={300} height={250}>
          <Pie data={pieData} dataKey="value" outerRadius={80}>
            {pieData.map((_, i) => (
              <Cell key={i} fill={["#3b82f6", "#10b981"][i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold mb-2">Budget vs Spent</h3>
        <BarChart width={350} height={250} data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#3b82f6" />
          <Bar dataKey="spent" fill="#ef4444" />
        </BarChart>
      </div>

    </div>
  );
}
