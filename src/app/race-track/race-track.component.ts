import { Component, OnInit } from '@angular/core';
import { Color } from 'ng2-charts';
import {SseService} from '../sse.service';
import {RaceService} from '../../race.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-race-track',
  templateUrl: './race-track.component.html',
  styleUrls: ['./race-track.component.css']
})
export class RaceTrackComponent implements OnInit {
  sseRaceId = '???';
  jsonData = {
    raceId: '',
    racerPosition: []
  };
  winner = '???';
  racesCompleted = 0;
  public tempLineChartColors: Color[] = [
    {
      backgroundColor: '#4B0082',
      borderColor: '#4B0082',
      pointBackgroundColor: '#4B0082',
      pointBorderColor: '#FFFFFF',
    },
    {
      backgroundColor: '#FFC0CB',
      borderColor: '#FFC0CB',
      pointBackgroundColor: '#FFC0CB',
      pointBorderColor: '#FFFFFF'
    },
    {
      backgroundColor: '#FFA500',
      borderColor: '#FFA500',
      pointBackgroundColor: '#FFA500',
      pointBorderColor: '#FFFFFF'
    },
    {
      backgroundColor: '#A020F0',
      borderColor: '#A020F0',
      pointBackgroundColor: '#A020F0',
      pointBorderColor: '#FFFFFF'
    },
    {
      backgroundColor: '#FFFF00',
      borderColor: '#FFFF00',
      pointBackgroundColor: '#FFFF00',
      pointBorderColor: '#FFFFFF'
    },
    {
      backgroundColor: '#0000FF',
      borderColor: '#0000FF',
      pointBackgroundColor: '#0000FF',
      pointBorderColor: '#FFFFFF'
    },
    {
      backgroundColor: '#00FF00',
      borderColor: '#00FF00',
      pointBackgroundColor: '#00FF00',
      pointBorderColor: '#FFFFFF'
    },
    {
      backgroundColor: '#000000',
      borderColor: '#000000',
      pointBackgroundColor: '#000000',
      pointBorderColor: '#FFFFFF'
    },
    {
      backgroundColor: '#FFFFFF',
      borderColor: '#000000',
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#000000'
    },
    {
      backgroundColor: '#FF0000',
      borderColor: '#FF0000',
      pointBackgroundColor: '#FF0000',
      pointBorderColor: '#FFFFFF'
    }
  ];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartOptions = {
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }],
      yAxes: [{
        ticks: {
          stepSize: 10,
          stepValue: 10,
          max: 10
        }
      }]
    }
  };
  public lineChartData = [];
  public lineChartColors: Color[] = [];

  constructor(private sseService: SseService, private raceService: RaceService) { }

  ngOnInit() {}

  startRace(numberOfRaces: NgForm) {
    if (numberOfRaces.value.numberOfRacesValue < 1) {
      numberOfRaces.value.numberOfRacesValue = 1;
    }
    for (let n = 0; n < 1; n++) {
      this.sseService.getServerSentEvent('http://localhost:3000/api/race/start')
        .subscribe(data => {
          this.jsonData = JSON.parse(data.data);
          this.sseRaceId = this.jsonData.raceId;
          if (this.lineChartData.length === 1) {
            this.lineChartData.splice(0, 1, {data: [{x: 0, y: 0}], label: 'Racer ' + 0, fill: false});
            this.lineChartColors.push(this.tempLineChartColors[0]);
            for (let j = 1; j < this.jsonData.racerPosition.length; j++) {
              this.lineChartData.push({data: [{x: 0, y: j}], label: 'Racer ' + j, fill: false});
              this.lineChartColors.push(this.tempLineChartColors[j]);
            }
          }
          for (let i = 0; i < this.jsonData.racerPosition.length; i++) {
            this.lineChartData[i].data.push({x: this.jsonData.racerPosition[i].position, y: i});
            if (this.jsonData.racerPosition[i].position > 99) {
              this.raceService.getWinnerOfRace(this.jsonData.raceId).subscribe(winner => {this.winner = winner.racer.name; });
              this.racesCompleted++;
              if (numberOfRaces.value.numberOfRacesValue > this.racesCompleted) {
                this.startRace(numberOfRaces);
              } else {
                this.racesCompleted = 0;
              }
            }
          }
        });
    }
  }
}
