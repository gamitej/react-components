const Pill = ({
  text,
  onClick,
}: {
  text: string;
  onClick: (val: string) => void;
}) => {
  return (
    <div
      onClick={() => onClick(text)}
      className="rounded-md px-2 py-1 bg-gray-700 text-white cursor-pointer"
    >
      {text}
      <span className="ml-2 text-2xl">&times;</span>
    </div>
  );
};

export default Pill;
