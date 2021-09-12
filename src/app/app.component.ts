import { Component } from '@angular/core';
import {RaceService} from '../race.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MomentumDynamics';
  winner = '';

  constructor(private raceService: RaceService) { }
  getWinnerOfRace(id: NgForm) {
    console.log(id.value);
    this.raceService.getWinnerOfRace(id.value.raceId)
      .subscribe(winner => {
        this.winner = winner.racer.name;
      });
  }
}
