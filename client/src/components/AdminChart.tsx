"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Statistic } from "@/server-action";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function AdminChart({ data }: { data: Statistic[] }) {
  // Ambil tahun dari data (anggap semua data 1 tahun sama)
  const year =
    data[0]?.period.split("-")[0] ?? new Date().getFullYear().toString();

  // Buat array 12 bulan
  const chartData = monthNames.map((monthName, index) => {
    const monthNum = (index + 1).toString().padStart(2, "0");
    const monthData = data.find(
      (item) => item.period === `${year}-${monthNum}`
    );

    return {
      month: `${monthName}`,
      sales: monthData?.sales ?? 0,
      revenue: monthData?.revenue ?? 0,
    };
  });

  const chartConfig = {
    sales: { label: "Sales", color: "hsl(var(--chart-1))" },
    revenue: { label: "Revenue", color: "hsl(var(--chart-2))" },
  } satisfies ChartConfig;

  return (
    <ChartContainer className="min-h-[400px] w-full" config={chartConfig}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        {/* XAxis semua label tampil, label miring 45° */}
        <XAxis
          dataKey="month"
          interval={0}
          tick={({ x, y, payload }) => (
            <text
              x={x}
              y={y + 10} // sedikit turun biar rapi
              textAnchor="middle"
              // transform={`rotate(-45, ${x}, ${y + 10})`}
              fontSize={12}
            >
              {payload.value}
            </text>
          )}
        />

        {/* YAxis kiri untuk revenue */}
        <YAxis yAxisId="left" tickCount={10} />
        {/* YAxis kanan untuk sales */}
        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 10]}
          tickCount={10}
        />

        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />

        {/* Revenue pakai YAxis kiri */}
        <Bar yAxisId="left" dataKey="revenue" fill="#60a5fa" radius={4} />
        {/* Sales pakai YAxis kanan */}
        <Bar
          yAxisId="right"
          dataKey="sales"
          fill="oklch(25.7% 0.09 281.288)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  );
}
