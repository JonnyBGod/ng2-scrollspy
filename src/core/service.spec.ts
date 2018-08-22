import { ReplaySubject } from 'rxjs';
import { ScrollSpyService } from './service';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

describe('core service', () => {
  let scrollSpyService: ScrollSpyService;

  beforeEach(() => {
    scrollSpyService = new ScrollSpyService();
  });

  it('is defined', () => {
    expect(ScrollSpyService).toBeDefined();
  });

  it('should set/get observables', () => {
    var obs: ReplaySubject<any> = new ReplaySubject(1);
    scrollSpyService.setObservable('test', obs);
    var testSubject = scrollSpyService.getObservable('test');

    expect(testSubject).toBe(obs);
  });

  it('should delete observables', () => {
    var obs: ReplaySubject<any> = new ReplaySubject(1);
    scrollSpyService.setObservable('test', obs);
    scrollSpyService.deleteObservable('test');
    var testSubject = scrollSpyService.getObservable('test');

    expect(testSubject).not.toBeDefined();
  });
});
