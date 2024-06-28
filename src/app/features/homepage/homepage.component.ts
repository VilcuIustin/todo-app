import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateNotesComponent } from './modals/create-notes/create-notes.component';
import { NotesService } from '../../core/services/notes/notes.service';
import { Note } from '../../core/models/notes';
import { CapitalizePipe } from '../../core/pipes/capitalize.pipe';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CapitalizePipe],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  notes: Note[] = [];

  constructor(private dialog: MatDialog, private _notesService: NotesService) {}

  ngOnInit() {
    this.getNotes();
  }

  addNote() {
    this.dialog
      .open(CreateNotesComponent, {
        panelClass: ['md:w-3/5', 'w-full', 'lg:w-2/5'],
        maxWidth: '100wh',
      })
      .afterClosed()
      .subscribe((result: { needUpdate: boolean }) => {
        if (result.needUpdate) {
          this.getNotes();
        }
      });
  }

  deleteNote(id: number) {
    this._notesService.deleteNotes(id).subscribe({
      next: () => {
        this.getNotes();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  modify(note: Note) {
    this.dialog
      .open(CreateNotesComponent, {
        panelClass: ['md:w-3/5', 'w-full', 'lg:w-2/5'],
        maxWidth: '100wh',
        data: note,
      })
      .afterClosed()
      .subscribe((result: { needUpdate: boolean }) => {
        if (result.needUpdate) {
          this.getNotes();
        }
      });
  }

  getNotes() {
    this._notesService.getNotes().subscribe({
      next: (response: Note[]) => {
        this.notes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
