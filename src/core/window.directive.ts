import { Directive, Injectable, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ScrollSpyService } from './service';

@Injectable()
@Directive({
  selector: '[scrollSpy]',
  host: {
    '(window:scroll)': 'onScroll($event)'
  }
})
export class ScrollSpyDirective implements OnInit {
  private scrollStream$: ReplaySubject<any> = new ReplaySubject(1);

  constructor(
    private scrollSpy: ScrollSpyService
  ) {}

  ngOnInit() {
    if (!!this.scrollSpy.getObservable('window')) {
      console.warn('ScrollSpy: duplicate id "window". Instance will be skipped!');
    } else {
      this.scrollSpy.setObservable('window', this.scrollStream$);
    }
  }

  onScroll($event: any) {
    this.scrollStream$.next($event);
  }
}
