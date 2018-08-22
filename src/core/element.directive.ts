import { Directive, Injectable, Input, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ScrollSpyService } from './service';

@Injectable()
@Directive({
  selector: '[scrollSpyElement]',
  host: {
    '(scroll)': 'onScroll($event)'
  }
})
export class ScrollSpyElementDirective implements OnInit, OnDestroy {
  @Input('scrollSpyElement') public scrollSpyId: string;

  private scrollStream$: ReplaySubject<any> = new ReplaySubject(1);

  constructor(
    private scrollSpy: ScrollSpyService
  ) {}

  ngOnInit() {
    if (!this.scrollSpyId) {
      return console.warn('ScrollSpy: Missing id.');
    }

    if (!!this.scrollSpy.getObservable(this.scrollSpyId)) {
      console.warn('ScrollSpy: duplicate id "' + this.scrollSpyId + '". Instance will be skipped!');
    } else {
      this.scrollSpy.setObservable(this.scrollSpyId, this.scrollStream$);
    }
  }

  ngOnDestroy() {
    this.scrollSpy.deleteObservable(this.scrollSpyId);
  }

  onScroll($event: any) {
    this.scrollStream$.next($event);
  }
}
