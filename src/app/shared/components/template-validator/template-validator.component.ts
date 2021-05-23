import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-template-validator',
  templateUrl: './template-validator.component.html',
  styleUrls: ['./template-validator.component.scss']
})
export class TemplateValidatorComponent implements OnInit {
  @Input() input;
  @Input() validate;
  @Input() value;
  @Input() maxlength;
  @Input() paddingTop;

  constructor() { }

  ngOnInit(): void {
  }

}
