import BarChartComponent from "@/features/home/components/dashboardCharts/BarChartComponent";
import PieChartComponent from "@/features/home/components/dashboardCharts/PieChartComponent";

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <BarChartComponent />
      <PieChartComponent />
    </div>
  );
};

export default DashboardCharts;
