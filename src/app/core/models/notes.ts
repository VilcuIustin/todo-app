export interface BaseResponse {
  created: boolean;
}

export interface Note {
  id: number;
  title: string | null;
  description: string;
}

export interface CreateNoteResponse extends BaseResponse {}
