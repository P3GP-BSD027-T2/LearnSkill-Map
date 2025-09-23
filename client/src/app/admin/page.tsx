import { AdminChart } from "@/components/AdminChart";
import StatisticCard from "@/components/StatisticCard";
import { getStatistic } from "@/server-action";

const rupiah = (number: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export default async function AdminPage() {
  const statistics = await getStatistic();
  let totalSales: number = 0;
  let totalRevenue: number = 0;
  const thisMonthRevenue: number = statistics[statistics.length - 1].revenue;

  statistics.forEach((val) => {
    if (val.sales > 0) totalSales += val.sales;
    if (val.revenue > 0) totalRevenue += val.revenue;
  });

  // console.log(totalRevenue, totalSales, thisMonthRevenue);
  return (
    <>
      <div className="flex flex-col flex-1 min-h-screen py-6 px-36 gap-6">
        <div className="w-full grid grid-cols-3 gap-4">
          <StatisticCard
            title="Last Month Revenue"
            value={rupiah(thisMonthRevenue)}
          />
          <StatisticCard title="Total Sales" value={totalSales} />
          <StatisticCard title="Total Revenue" value={rupiah(totalRevenue)} />
        </div>
        <p className="mt-10 font-semibold text-xl">
          {new Date().getFullYear()} Chart Statistic
        </p>
        <AdminChart data={statistics} />
      </div>
    </>
  );
}
