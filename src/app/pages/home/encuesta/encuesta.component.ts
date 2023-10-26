import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseStorage } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss'],
})
export class EncuestaComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private toast: ToastrService,
    private firestore: FirestoreService
  ) {
    this.userForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      apellido: new FormControl('', [
        Validators.pattern('^[a-zA-Z ]*$'),
        Validators.required,
      ]),
      edad: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        Validators.min(18),
        Validators.max(99),
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
        Validators.maxLength(10),
      ]),
      sexo: new FormControl('', Validators.required),
      opinion: new FormControl('', Validators.required),
      casualidad: new FormControl(false),
      publicidad: new FormControl(false),
      recomendado: new FormControl(false),
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.toast.show('Encuesta enviada!!', 'Encuesta');
      this.firestore.setData(this.userForm.value, 'encuesta');
      this.userForm.reset();
    }
  }
}
