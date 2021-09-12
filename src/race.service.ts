
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Racer} from './racer';
import {Race} from './race';

@Injectable({providedIn: 'root'})
export class RaceService {
  private racerUrl = 'http://localhost:3000/api/';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };


  constructor(private http: HttpClient) {}

  getRacers(): Observable<Racer[]> {
    return this.http.get<Racer[]>(this.racerUrl + 'racers');
  }

  getWins(): Observable<Race[]> {
    return this.http.get<Race[]>(this.racerUrl + 'winners');
  }

  getWinnerOfRace(raceId): Observable<Race> {
    return this.http.get<Race>(this.racerUrl + 'race/' + raceId + '/winner');
  }
}
