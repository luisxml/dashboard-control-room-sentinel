import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  heading = 'Inicio';
  subheading = 'Inicio.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  constructor() { }

  ngOnInit(): void {
  }

}
