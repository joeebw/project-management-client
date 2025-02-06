type Props = {
  color: string;
  label: string;
};

const ChartLegend = ({ color, label }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
};

export default ChartLegend;
