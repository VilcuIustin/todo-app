import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CreateNoteResponse, Note } from '../../models/notes';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  //baseUrl = 'http://localhost:4200';
  baseUrl = '';

  notes: Note[] = [
    {
      id: 1,
      title: 'Note 1',
      description: 'Description 1',
    },
    {
      id: 2,
      title: 'Note 2',
      description: 'Description 2',
    },
    {
      id: 3,
      title: null,
      description: 'Description 3',
    },
  ];

  constructor(private _httpClient: HttpClient) {}

  getNotes(): Observable<Note[]> {
    if (this.baseUrl === '') {
      return of(this.notes);
    }

    return this._httpClient.get<Note[]>(`${this.baseUrl}/notes`);
  }

  deleteNotes(id: number): Observable<boolean> {
    this.notes = this.notes.filter((note) => note.id !== id);
    return of(true);
  }

  updateNote(
    title: string,
    description: string,
    id: number
  ): Observable<CreateNoteResponse> {
    if (this.baseUrl === '') {
      let note = this.notes.find((n) => n.id == id);
      if (note === null) {
        return of({ created: false });
      }

      note = note!;

      note.description = description;
      note.title = title;

      return of({ created: true });
    }

    return this._httpClient.post<CreateNoteResponse>(`${this.baseUrl}/notes`, {
      title,
      description,
    });
  }

  createNotes(
    title: string,
    description: string
  ): Observable<CreateNoteResponse> {
    if (this.baseUrl === '') {
      let lastId = this.notes[this.notes.length - 1]?.id ?? 0;
      this.notes.push({ title, description, id: lastId + 1 });
      return of({ created: true });
    }

    return this._httpClient.post<CreateNoteResponse>(`${this.baseUrl}/notes`, {
      title,
      description,
    });
  }
}
