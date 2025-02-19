export type FileDataType = {
  id: number;
  label: string;
  isFolder: false;
  items: [];
};

export type FolderDataType = {
  id: number;
  label: string;
  isFolder: true;
  items: DataType[];
};

export type DataType = FolderDataType | FileDataType;

export type DataFolder = DataType[];

export interface RecursiveProps {
  marginLeft: number;
  data: DataFolder;
  isFolderOpen: Record<number, boolean>;
  toggle: (num: number) => void;
}
