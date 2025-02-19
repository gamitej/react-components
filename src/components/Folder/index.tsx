import { useState } from "react";
import { FaFolderOpen as FolderIcon } from "react-icons/fa";
import { FaRegFileLines as FileIcon } from "react-icons/fa6";
import { data } from "./data";

const Recursive = ({ data = [], marginLeft = 0, toggle, isFolderOpen }) => {
  if (!data.length) return null;

  return (
    <div className="flex flex-col gap-2">
      {data.map(({ id, isFolder, label, items = [] }) => {
        const isOpen = isFolderOpen[id] || false;
        const Icon = isFolder ? (
          <FolderIcon className="text-gray-600 text-xl" />
        ) : (
          <FileIcon className="text-gray-500 text-xl" />
        );

        return (
          <div key={id} style={{ marginLeft: `${marginLeft}rem` }}>
            <div
              onClick={() => isFolder && toggle(id)}
              className="flex gap-2 cursor-pointer hover:underline"
            >
              <span>{Icon}</span>
              <span>{label}</span>
            </div>
            {isOpen && isFolder && items.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <Recursive
                  data={items}
                  toggle={toggle}
                  isFolderOpen={isFolderOpen}
                  marginLeft={marginLeft + 1.5}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Folder = () => {
  const [isFolderOpen, setIsFolderOpen] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setIsFolderOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-8">
      <Recursive
        data={data}
        marginLeft={0}
        toggle={toggle}
        isFolderOpen={isFolderOpen}
      />
    </div>
  );
};

export default Folder;
