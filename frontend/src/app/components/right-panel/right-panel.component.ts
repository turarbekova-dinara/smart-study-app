import { Component , OnDestroy , NgZone , ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent implements OnDestroy{
  isExpanded = false;
  workMinutes = 25;
  breakMinutes = 5;

  isRunning = false;
  isBreak=false;
  secondsLeft = 25*60;
  interval:any=null;

  private audioCtx: AudioContext | null=null;
  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}
  get display(): string {
    const m=Math.floor(this.secondsLeft / 60).toString().padStart(2, '0');
    const s =(this.secondsLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  get progress(): number {
    const total = (this.isBreak ? this.breakMinutes : this.workMinutes) * 60;
    return ((total - this.secondsLeft) / total) * 100;
  }

  toggle() {
    document.body.classList.toggle('dark');
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  startStop() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
    } else {
      this.isRunning = true;
      this.interval = setInterval(() => {
        this.secondsLeft--;
        if (this.secondsLeft <= 0) {
          this.playBeep(this.isBreak ? 'work' : 'break');
          this.isBreak = !this.isBreak;
          this.secondsLeft = (this.isBreak ? this.breakMinutes : this.workMinutes) * 60;
        }
        this.cdr.detectChanges();
      }, 1000);
    }
  }
  reset() {
    clearInterval(this.interval);
    this.isRunning = false;
    this.isBreak = false;
    this.secondsLeft = this.workMinutes * 60;
  }

  onSettingsChange() {
    if (!this.isRunning) {
      this.secondsLeft = (this.isBreak ? this.breakMinutes : this.workMinutes) * 60;
    }
  }

  private playBeep(type: 'work' | 'break') {
    this.audioCtx = new AudioContext();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.frequency.value = type === 'break' ? 880 : 440;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 1.5);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 1.5);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
