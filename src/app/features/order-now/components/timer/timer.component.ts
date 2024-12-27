import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit, OnDestroy {
  @Output() disableCancelBtn: EventEmitter<boolean> = new EventEmitter();
  @Input() cancellationTime: any;
  private subscription!: Subscription;
  public dateNow = new Date();
  public dDay = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;

  constructor() {}
  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    // console.log(this.timeDifference);
    if (this.timeDifference > 0) {
      this.allocateTimeUnits(this.timeDifference);
    } else {
      this.subscription.unsubscribe();
      this.disableCancelBtn.emit(true);
    }
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  ngOnInit() {
    this.dDay = new Date(this.cancellationTime);
    if (this.cancellationTime) {
      this.subscription = interval(1000).subscribe((x) => {
        this.getTimeDifference();
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
