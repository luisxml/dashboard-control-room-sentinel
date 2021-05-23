import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
  }
}
