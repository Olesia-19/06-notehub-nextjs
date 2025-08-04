import axios from "axios";
import { Note, NewNoteData } from "./types";
const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  query: string,
  page: number
): Promise<FetchNotesResponse> => {
  const params: {
    page: number;
    perPage: number;
    search?: string;
  } = {
    page,
    perPage: 12,
  };

  if (query.trim() !== "") {
    params.search = query;
  }

  const headers = {
    Authorization: `Bearer ${myToken}`,
  };

  const res = await axios.get<FetchNotesResponse>("/notes", {
    headers,
    params,
  });
  return res.data;
};

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const headers = {
    Authorization: `Bearer ${myToken}`,
  };

  const res = await axios.post<Note>("/notes", newNoteData, { headers });
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const headers = {
    Authorization: `Bearer ${myToken}`,
  };

  const res = await axios.delete<Note>(`/notes/${noteId}`, { headers });
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const headers = {
    Authorization: `Bearer ${myToken}`,
  };

  const res = await axios.get<Note>(`/notes/${id}`, { headers });
  return res.data;
};
