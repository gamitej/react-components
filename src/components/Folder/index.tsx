import { useState } from "react";
import { IoMdArrowDropright as ArrowIcon } from "react-icons/io";
import { FaFolderOpen as FolderIcon } from "react-icons/fa";
import { FaRegFileLines as FileIcon } from "react-icons/fa6";
import { data } from "./data";
import { DataFolder, RecursiveProps } from "./type";

const Recursive = ({
  toggle,
  submit,
  data = [],
  isFolderOpen,
  marginLeft = 0,
}: RecursiveProps) => {
  const [name, setName] = useState("");
  const [add, setAdd] = useState({ enabled: false, isFolder: false });

  if (!data.length) return null;

  const onSubmit = (parentId: number) => {
    if (name.trim().length > 0) {
      submit(name, parentId, add.isFolder);
    }
    setAdd({ enabled: false, isFolder: false });
    setName("");
  };

  const handleAddFolderEvent = (
    id: number,
    isOpen: boolean,
    isFolder: boolean
  ) => {
    setAdd({ enabled: true, isFolder });
    if (!isOpen) toggle(id);
  };

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
            <div className="flex gap-2 items-center">
              <div
                onClick={() => isFolder && toggle(id)}
                className="flex gap-2 cursor-pointer items-center hover:underline"
              >
                <span>{Icon}</span>
                <span>{label}</span>
              </div>
              {items.length > 0 && (
                <span>
                  <ArrowIcon
                    aria-expanded={isOpen}
                    className="text-gray-600 -ml-2 text-xl mt-[1px] aria-expanded:rotate-90"
                  />
                </span>
              )}
              {isFolder && (
                <div className="flex justify-center items-center gap-1">
                  <button
                    onClick={() => handleAddFolderEvent(id, isOpen, true)}
                    className="text-sm px-2 py-1 shadow rounded-md bg-gray-200 hover:bg-gray-300"
                  >
                    Folder &#x2b;
                  </button>
                  <button
                    onClick={() => handleAddFolderEvent(id, isOpen, false)}
                    className="text-sm px-2 py-1 shadow rounded-md bg-gray-200 hover:bg-gray-300"
                  >
                    File &#43;
                  </button>
                </div>
              )}
            </div>
            {isOpen && isFolder && (
              <div className="relative flex flex-col gap-2 mt-2 border-l border-gray-600 ml-2">
                {add.enabled && (
                  <input
                    autoFocus
                    value={name}
                    className="w-[10rem] px-1"
                    onBlur={() => onSubmit(id)}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginLeft: `${marginLeft + 1.4}rem` }}
                  />
                )}
                <Recursive
                  data={items}
                  submit={submit}
                  toggle={toggle}
                  isFolderOpen={isFolderOpen}
                  marginLeft={marginLeft + 1}
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
  const [folderNo, setFolderNo] = useState(20);
  const [folderData, setFolderData] = useState<DataFolder>(() => data);
  const [isFolderOpen, setIsFolderOpen] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setIsFolderOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddFolderOrFile = (
    name: string,
    parentId: number,
    isFolder: boolean
  ) => {
    setFolderData((prevData) => {
      const addItem = (folders: DataFolder): DataFolder => {
        return folders.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              items: [
                {
                  id: folderNo + 1,
                  label: name,
                  isFolder,
                  items: isFolder ? [] : [],
                },
                ...item.items,
              ],
            };
          } else if (item.isFolder) {
            return { ...item, items: addItem(item.items) };
          }
          return item;
        });
      };

      return addItem(prevData);
    });
    setFolderNo((no) => no + 1);
  };

  return (
    <div className="p-8">
      <Recursive
        marginLeft={0}
        toggle={toggle}
        data={folderData}
        isFolderOpen={isFolderOpen}
        submit={handleAddFolderOrFile}
      />
    </div>
  );
};

export default Folder;
