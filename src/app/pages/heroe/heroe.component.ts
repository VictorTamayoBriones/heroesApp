import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroeService: HeroesService, 
               private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if( id != 'nuevo'){

      this.heroeService.getHeroe( id )
          .subscribe( (resp: HeroeModel) => {
            this.heroe = resp;
            this.heroe.id = id;
          });
    }

    console.log(id);

  }


  guardar(form: NgForm){

    if(form.invalid){
      console.log('formulario no valido');
      return;
    }

    
    Swal.fire({
      title: 'Espere',
      text: 'Guardar informacion',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;


    if( this.heroe.id ){
       peticion = this.heroeService.actualizarHeroe( this.heroe );
    }else{
       peticion = this.heroeService.crearHeroe( this.heroe );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Seactualizo correctamente',
        icon: 'success'
      });

    

    });
  }

}

/*

https://drive.google.com/file/d/1jvcmuJWLveivYFKF-3YLMNgp4ENQpHZW/view?usp=sharing

*/