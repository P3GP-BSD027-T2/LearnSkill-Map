type StatisticCardProps = {
  title: string;
  value: number | string;
};

export default function StatisticCard({ title, value }: StatisticCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center">
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <h2 className="text-sm font-medium text-gray-500 mt-2">{title}</h2>
    </div>
  );
}
