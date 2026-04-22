import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Track {
  id: number;
  title: string;
  category: string;
  file: string;
  duration?: number;
}

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music.html',
  styleUrl: './music.css'
})
export class MusicComponent implements OnDestroy {

  tracks: Track[] = [
    { id: 1, title: 'Lofi Study Beat 1', category: 'Lofi', file: 'music/lofi1.mp3' },
    { id: 2, title: 'Lofi Study Beat 2', category: 'Lofi', file: 'music/lofi2.mp3' },
    { id: 3, title: 'Rain Sounds', category: 'Nature', file: 'music/rain.mp3' },
    { id: 4, title: 'Ocean Waves', category: 'Nature', file: 'music/ocean.mp3' },
    { id: 5, title: 'Forest Sounds', category: 'Nature', file: 'music/forest.mp3' },
    { id: 6, title: 'Fireplace', category: 'Ambient', file: 'music/fireplace.mp3' },
  ];

  categories = ['All', 'Lofi', 'Nature', 'Ambient'];
  selectedCategory = 'All';

  currentTrack: Track | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 0.7;

  private audio: HTMLAudioElement | null = null;

  get filteredTracks(): Track[] {
    if (this.selectedCategory === 'All') return this.tracks;
    return this.tracks.filter(t => t.category === this.selectedCategory);
  }

  get progress(): number {
    return this.duration ? (this.currentTime / this.duration) * 100 : 0;
  }

  formatTime(sec: number): string {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  playTrack(track: Track) {
    if (this.currentTrack?.id === track.id) {
      this.togglePlay();
      return;
    }

    if (this.audio) {
      this.audio.pause();
      this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
      this.audio.removeEventListener('loadedmetadata', this.onMetadata);
      this.audio.removeEventListener('ended', this.onEnded);
    }

    this.currentTrack = track;
    this.audio = new Audio(track.file);
    this.audio.volume = this.volume;

    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('loadedmetadata', this.onMetadata);
    this.audio.addEventListener('ended', this.onEnded);

    this.audio.play();
    this.isPlaying = true;
  }

  togglePlay() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play();
      this.isPlaying = true;
    }
  }

  nextTrack() {
    if (!this.currentTrack) return;
    const idx = this.filteredTracks.findIndex(t => t.id === this.currentTrack!.id);
    const next = this.filteredTracks[(idx + 1) % this.filteredTracks.length];
    this.playTrack(next);
  }

  prevTrack() {
    if (!this.currentTrack) return;
    const idx = this.filteredTracks.findIndex(t => t.id === this.currentTrack!.id);
    const prev = this.filteredTracks[(idx - 1 + this.filteredTracks.length) % this.filteredTracks.length];
    this.playTrack(prev);
  }

  onSeek(event: Event) {
    if (!this.audio) return;
    const val = +(event.target as HTMLInputElement).value;
    this.audio.currentTime = (val / 100) * this.duration;
  }

  onVolumeChange(event: Event) {
    this.volume = +(event.target as HTMLInputElement).value;
    if (this.audio) this.audio.volume = this.volume;
  }

  private onTimeUpdate = () => {
    this.currentTime = this.audio?.currentTime ?? 0;
  }

  private onMetadata = () => {
    this.duration = this.audio?.duration ?? 0;
  }

  private onEnded = () => {
    this.nextTrack();
  }

  ngOnDestroy() {
    // не останавливаем — музыка продолжает играть
  }
}
