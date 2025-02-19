export type DataType = {
  id: number;
  label: string;
  isFolder: boolean;
  items: DataType[] | [];
};

export type DataFolder = DataType[];

export interface RecursiveProps {
  data: DataFolder;
  marginLeft: number;
  toggle: (num: number) => void;
  isFolderOpen: Record<number, boolean>;
  submit: (name: string, parentId: number, isFolder: boolean) => void;
}
