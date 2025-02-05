const TaskField = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) => (
  <div className="space-x-1">
    <span className="font-medium min-w-20">{label}:</span>
    <span className="text-gray-700">{value || "-"}</span>
  </div>
);

export default TaskField;
