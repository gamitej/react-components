import { DataFolder } from "./type";

export const data: DataFolder = [
  {
    id: 1,
    label: "Home",
    isFolder: true,
    items: [{ id: 2, label: "file.txt", isFolder: false, items: [] }],
  },
  {
    id: 3,
    label: "Pages",
    isFolder: true,
    items: [],
  },
  {
    id: 3,
    label: "index.tsx",
    isFolder: false,
    items: [],
  },
  {
    id: 4,
    isFolder: true,
    label: "Components",
    items: [
      { id: 5, label: "index.tsx", isFolder: false, items: [] },
      {
        id: 6,
        label: "Input",
        isFolder: true,
        items: [{ id: 7, label: "text.txt", isFolder: false, items: [] }],
      },
      { id: 8, label: "dropdown.tsx", isFolder: false, items: [] },
    ],
  },
];
