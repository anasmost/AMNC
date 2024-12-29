export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  created: Date;
}

declare const notesData: Note[];
export default notesData;
