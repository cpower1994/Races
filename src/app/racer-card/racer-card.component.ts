import { Component, OnInit } from '@angular/core';
import {RaceService} from '../../race.service';
import {Racer} from '../../racer';
import {Race} from '../../race';

@Component({
  selector: 'app-racer-card',
  templateUrl: './racer-card.component.html',
  styleUrls: ['./racer-card.component.css']
})
export class RacerCardComponent implements OnInit {
  racers: Racer[];
  races: Race[];

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.getRacers();
  }
  ngAfterContentInit() {
    this.getWins();
  }

  getRacers(): void {
    this.raceService.getRacers()
      .subscribe(racers => {
        this.racers = racers;
        // tslint:disable-next-line:prefer-for-of
        for (let r = 0; r < this.racers.length; r++) {
          this.racers[r].wins = 0;
          this.racers[r].racesWon = [];
        }
      });
  }

  getWins(): void {
    this.raceService.getWins()
      .subscribe(races => {
        console.log(this.racers);
        this.races = races;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < races.length; i++) {
          // tslint:disable-next-line:prefer-for-of
          for (let r = 0; r < this.racers.length; r++) {
            if (this.races[i].racer.id === this.racers[r].id) {
              this.racers[r].wins++;
              this.racers[r].racesWon.push(this.races[i].raceId);
            }
          }
        }
      });
  }
}
