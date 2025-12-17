export default function StatCard({ title, value, color }) {
  return (
    <div className={`p-4 rounded shadow bg-${color}-500 text-white`}>
      <p className="text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
