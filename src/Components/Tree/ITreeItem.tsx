interface ITreeItem {
  name: string;
  id: number;
  children: ITreeItem[];
}

export type { ITreeItem };
