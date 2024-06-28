import { Component, Inject, OnInit } from '@angular/core';
import {
  FormsModule,
  MaxLengthValidator,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotesService } from '../../../../core/services/notes/notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../../../../core/models/notes';

@Component({
  selector: 'app-create-notes',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.css',
})
export class CreateNotesComponent {
  create: boolean = true;
  noteDetails: UntypedFormGroup = this._formBuilder.group({
    id: [0, []],
    title: [null, [Validators.maxLength(50)]],
    description: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _notesService: NotesService,
    @Inject(MAT_DIALOG_DATA)
    private note: Note,
    private _dialogRef: MatDialogRef<CreateNotesComponent>
  ) {
    if (this.note !== undefined && this.note !== null) {
      console.log(this.note);
      this.titleControl.setValue(this.note.title);
      this.descriptionControl.setValue(this.note.description);
      this.idControl.setValue(this.note.id);
      this.create = false;
    }
  }

  createNote() {
    if (!this.noteDetails.valid) {
      return;
    }

    if (this.create) {
      this._notesService
        .createNotes(this.titleControl.value, this.descriptionControl.value)
        .subscribe({
          next: (response) => {
            this._dialogRef.close({ needUpdate: true });
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this._notesService
        .updateNote(
          this.titleControl.value,
          this.descriptionControl.value,
          this.idControl.value
        )
        .subscribe({
          next: (response) => {
            this._dialogRef.close({ needUpdate: true });
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  closeDialog() {
    this._dialogRef.close({ needUpdate: false });
  }

  get idControl(): UntypedFormControl {
    return this.noteDetails.get('id') as UntypedFormControl;
  }

  get titleControl(): UntypedFormControl {
    return this.noteDetails.get('title') as UntypedFormControl;
  }

  get descriptionControl(): UntypedFormControl {
    return this.noteDetails.get('description') as UntypedFormControl;
  }
}
