import { FaFolderOpen as FolderIcon } from "react-icons/fa";
import { FaRegFileLines as FileIcon } from "react-icons/fa6";
import { data } from "./data";

const Folder = () => {
  const Recursive = ({ data = [], marginLeft = 0 }) => {
    if (data.length === 0) return null;

    return (
      <div className="flex flex-col gap-2">
        {data.map(({ id, isFolder, label, items = [] }) => {
          const Icon = isFolder ? (
            <FolderIcon className="text-gray-600 text-xl" />
          ) : (
            <FileIcon className="text-gray-500 text-xl" />
          );

          return (
            <div
              key={id}
              style={{ marginLeft: `${marginLeft}rem` }}
              className="flex flex-col gap-2"
            >
              <div className="flex gap-2 cursor-pointer hover:underline">
                <span>{Icon}</span>
                <span>{label}</span>
              </div>
              {isFolder && items?.length > 0 && (
                <Recursive data={items} marginLeft={marginLeft + 2} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * TSX
   */
  return (
    <div className="p-8">
      <Recursive data={data ?? []} marginLeft={0} />
    </div>
  );
};

export default Folder;
