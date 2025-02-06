import DashboardCharts from "@/features/home/components/dashboardCharts/DashboardCharts";
import MyTasksTable from "@/features/home/components/MyTasksTable";

const Home = () => {
  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold">Project Management Dashboard</h3>

      <div className="mt-5">
        <DashboardCharts />
      </div>

      <MyTasksTable />
    </div>
  );
};

export default Home;
