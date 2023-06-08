// keeps track of frame
// keeps track of a certain duration for you to help signal changes

// define "progress" as Math.min((now - start) / end, 1)
// This returns a linear value from 0 to 1

// for easing, use Math.pow(--progress, multiplier) + 1
// Multiplier can be any integer
// This will return a value between 0 and 1, but as "progress" moves linearly in time, the result
// here will follow curve according to the multiplier
// This value then can be used to calculate a start and end state

export class AnimationTimer {
  start: number;
  end: number;
  duration: number;
  constructor(duration = 2000) {
    this.duration = duration;
    this.start = performance.now();
    this.end = this.start + duration;
  }
  private getProgress() {
    return Math.min((performance.now() - this.start) / this.end, 1);
  }
  getAnimationValue(finishState: number) {
    const progress = this.getProgress();
    const easing = Math.pow(progress - 1, 5) + 1;
    if (this.isFinished()) {
      this.reset();
    }
    return easing * finishState;
  }
  isFinished() {
    return this.getProgress() === 1;
  }
  reset() {
    this.start = performance.now();
    this.end = this.start + this.duration;
  }
}
