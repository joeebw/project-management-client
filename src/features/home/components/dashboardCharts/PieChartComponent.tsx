import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChartLegend from "@/features/home/components/dashboardCharts/ChartLegend";
import { ChartData } from "@/features/home/ts/charts.types";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const pieData = [
  { name: "Completed", value: 75 },
  { name: "Remaining", value: 25 },
];

const COLORS = ["#007bf4", "#f0f0f0"];

const PieChartComponent = () => {
  const { data: pieData, loading } = useFetch<ChartData[]>("/task/total-tasks");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Project Status</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : !pieData ? (
          <div className="text-center">No data available</div>
        ) : (
          <div className="flex flex-col items-center w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius="90%"
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            {/* Leyenda */}
            <div className="flex gap-4 mt-4">
              <ChartLegend color="#007bf4" label="Completed" />
              <ChartLegend color="#f0f0f0" label="Remaining" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
