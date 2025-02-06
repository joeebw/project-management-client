export const tagPriorityColor: Record<string, string> = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    todo: "bg-gray-100 text-gray-800",
    completed: "bg-green-100 text-green-800",
    "in progress": "bg-blue-100 text-blue-800",
    "under review": "bg-yellow-100 text-yellow-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};
