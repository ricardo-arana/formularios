import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {
  forma: FormGroup;

  usuario: Object = {
    nombreCompleto: {
      nombre: 'Ricardo',
      apellido: 'Arana'
    },
    correo: 'ricardo.aranareyes@gmail.com',
    pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto : new FormGroup({
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(3)]),
        apellido: new FormControl('', [
                                      Validators.required,
                                      this.noHerrera
                                    ])
      }),
      correo: new FormControl('', [
                                  Validators.required,
                                  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      pasatiempos: new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      username: new FormControl('', Validators.required, this.existeUsuario),
      password1: new FormControl('', Validators.required),
      password2: new FormControl()
    });
    //this.forma.setValue(this.usuario);

    this.forma.controls.password2.setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    this.forma.valueChanges
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
  }

  agregarPasatiempo() {
    (this.forma.controls.pasatiempos as FormArray).push(
      new FormControl('', Validators.required)
    );

  }

  noHerrera(control: FormControl): { [s:string]:boolean } {
      if ( control.value === 'Herrera' ) {
        return {
          noherrera: true
        }
      }
  }

  noIgual(control: FormControl): { [s:string]:boolean } {
    const forma: any = this;
    if ( control.value !== forma.controls.password1.value ) {
      return {
        noiguales: true
      }
    }
  }
  existeUsuario( control: FormControl ): Promise<any>| Observable<any> {
      let promesa = new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            if ( control.value === 'strider' ) {
              resolve({ exite: true});
            } else {
              resolve ( null );
            }
          }, 3000);
        }
      );
      return promesa;
  }
}
