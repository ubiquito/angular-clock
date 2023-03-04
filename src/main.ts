import 'zone.js/dist/zone';

import { interval, of, map } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  styles: ['h1 {color:blue}'],
  template: `
  <style>
  #clock_container {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 150px;
    height: 150px;
    border-radius: 43%;
    border: 2px solid black;
  }  
  #seconds-css {
    color:red;
    height: 50%;
    width: 0px;
    box-sizing: border-box;
    border: 1px dashed gray;
    top: 0%;
    left: 50%;
    position: absolute;
    transform-origin: bottom;
    /* of-course, would be 60s */
    animation: secondsMotion 60s infinite linear;
  }
  @keyframes secondsMotion {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
  #hundredths-ng {
    height: 10%;
    width: 0px;
    box-sizing: border-box;
    border: 1px solid green;
    top: 75%;
    left: 70%;
    position: absolute;
    transform-origin: bottom;
  }

  #tenths-ng {
    height: 10%;
    width: 0px;
    box-sizing: border-box;
    border: 1px solid green;
    top: 75%;
    left: 50%;
    position: absolute;
    transform-origin: bottom;
  }

  #seconds2-ng {
    height: 10%;
    width: 0px;
    box-sizing: border-box;
    border: 1px solid red;
    top: 75%;
    left: 30%;
    position: absolute;
    transform-origin: bottom;
  }

  #seconds-ng {
    height: 50%;
    width: 0px;
    box-sizing: border-box;
    border: 1px solid red;
    top: 0%;
    left: 50%;
    position: absolute;
    transform-origin: bottom;
  }

  #minutes-ng {
    height: 40%;
    width: 0px;
    box-sizing: border-box;
    border: 1px solid black;
    top: 10%;
    left: 50%;
    position: absolute;
    transform-origin: bottom;
  }

  #hours-ng {
    height: 30%;
    width: 0px;
    box-sizing: border-box;
    border: 1px solid black;
    top: 20%;
    left: 50%;
    position: absolute;
    transform-origin: bottom;
  }
  
  
  </style>
  <div id="clock_container">
    <div id="seconds-css"></div>
    <div id="hours-ng" [ngStyle]="{'transform': 'rotate(' + (rot_hours$ | async) + 'deg)'}"></div>
    <div id="minutes-ng" [ngStyle]="{'transform': 'rotate(' + (rot_minutes$ | async) + 'deg)'}"></div>
    <div id="seconds-ng" [ngStyle]="{'transform': 'rotate(' + (rot_seconds$ | async) + 'deg)'}"></div>
    <div id="seconds2-ng" [ngStyle]="{'transform': 'rotate(' + (rot_seconds$ | async) + 'deg)'}"></div>
    <div id="tenths-ng" [ngStyle]="{'transform': 'rotate(' + (rot_tenths$ | async) + 'deg)'}"></div>
    <div id="hundredths-ng" [ngStyle]="{'transform': 'rotate(' + (rot_hundredths$ | async) + 'deg)'}"></div>

  </div>
  `,
})
export class App {
  name = 'Clock';
  lfo_second$ = interval(1000);
  lfo_hundredth$ = interval(10);
  lfo_tenths$ = interval(100);

  hours$ = this.lfo_second$.pipe(map(() => new Date().getHours()));
  minutes$ = this.lfo_second$.pipe(map(() => new Date().getMinutes()));
  seconds$ = this.lfo_second$.pipe(map(() => new Date().getSeconds()));
  tenths$ = this.lfo_tenths$.pipe(
    map(() => new Date().getMilliseconds() * 100)
  );

  rot_hours$ = this.hours$.pipe(map((h) => (360 / 12) * h));
  rot_minutes$ = this.minutes$.pipe(map((m) => (360 / 60) * m));
  rot_seconds$ = this.seconds$.pipe(map((s) => (360 / 60) * s));
  rot_tenths$ = this.lfo_tenths$.pipe(map((t) => (360 / 6) * t));
  rot_hundredths$ = this.lfo_hundredth$.pipe(map((t) => (360 / 6) * t));
}
bootstrapApplication(App);
