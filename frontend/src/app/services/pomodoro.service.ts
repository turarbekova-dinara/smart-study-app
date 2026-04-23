import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PomodoroService {

  workMinutes$ = new BehaviorSubject<number>(25);
  breakMinutes$ = new BehaviorSubject<number>(5);
  secondsLeft$ = new BehaviorSubject<number>(25 * 60);
  isRunning$ = new BehaviorSubject<boolean>(false);
  isBreak$ = new BehaviorSubject<boolean>(false);
  progress$ = new BehaviorSubject<number>(0);

  private interval: any = null;
  private audioCtx: AudioContext | null = null;

  constructor(private ngZone: NgZone) {}

  get display(): string {
    const sec = this.secondsLeft$.value;
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  startStop() {
    if (this.isRunning$.value) {
      clearInterval(this.interval);
      this.isRunning$.next(false);
    } else {
      this.isRunning$.next(true);
      this.ngZone.runOutsideAngular(() => {
        this.interval = setInterval(() => {
          this.ngZone.run(() => {
            const sec = this.secondsLeft$.value - 1;
            if (sec <= 0) {
              this.playBeep();
              const nextIsBreak = !this.isBreak$.value;
              this.isBreak$.next(nextIsBreak);
              const next = (nextIsBreak ? this.breakMinutes$.value : this.workMinutes$.value) * 60;
              this.secondsLeft$.next(next);
              this.progress$.next(0);
            } else {
              this.secondsLeft$.next(sec);
              const total = (this.isBreak$.value ? this.breakMinutes$.value : this.workMinutes$.value) * 60;
              this.progress$.next(((total - sec) / total) * 100);
            }
          });
        }, 1000);
      });
    }
  }

  reset() {
    clearInterval(this.interval);
    this.isRunning$.next(false);
    this.isBreak$.next(false);
    this.secondsLeft$.next(this.workMinutes$.value * 60);
    this.progress$.next(0);
  }

  nextSession() {
    clearInterval(this.interval);
    this.isRunning$.next(false);
    const next = !this.isBreak$.value;
    this.isBreak$.next(next);
    this.secondsLeft$.next((next ? this.breakMinutes$.value : this.workMinutes$.value) * 60);
    this.progress$.next(0);
  }

  setWork(min: number) {
    this.workMinutes$.next(min);
    if (!this.isRunning$.value && !this.isBreak$.value) {
      this.secondsLeft$.next(min * 60);
      this.progress$.next(0);
    }
  }

  setBreak(min: number) {
    this.breakMinutes$.next(min);
  }

  private playBeep() {
    this.audioCtx = new AudioContext();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.frequency.value = this.isBreak$.value ? 440 : 880;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.5);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.5);
  }
}
