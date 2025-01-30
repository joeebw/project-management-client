const ModalHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>
);

export default ModalHeader;
