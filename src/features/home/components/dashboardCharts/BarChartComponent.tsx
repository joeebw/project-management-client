import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import ChartLegend from "@/features/home/components/dashboardCharts/ChartLegend";
import { ChartData } from "@/features/home/ts/charts.types";
import useFetch from "@/hooks/useFetch";
import { Loader2 } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartComponent = () => {
  const { data: barData, loading } = useFetch<ChartData[]>("/task/tasks-count");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Task Priority Distribution</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-80">
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : !barData ? (
          <div className="text-center">No data available</div>
        ) : (
          barData && (
            <div className="flex flex-col items-center w-full h-full">
              <ResponsiveContainer width="90%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              {/* Leyenda */}
              <div className="mt-4">
                <ChartLegend color="#8884d8" label="Count" />
              </div>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
