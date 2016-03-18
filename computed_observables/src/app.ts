import { Component } from 'angular2/core';
import { Code } from './code/code';
import * as Rx from 'rxjs/Rx';

@Component({
  selector: 'app',
  template: `
    <code-tabs></code-tabs>
    <md-toolbar>
      <div class="md-toolbar-tools">
        <div layout-margin layout layout-align="center">
          <h1>Output</h1>
        </div>
      </div>
    </md-toolbar>
    <div class="rendered" flex layout>
      <pre>{{conference | json}}</pre>
    </div>
  `,
  directives: [Code]
})

export class App {
  constructor() {
    const Observable = Rx.Observable;

    // Start: Take these data structures
    const events = [
      {id: 1, name: 'ngConf', speakers: [1, 2], sponsors: [1, 2] },
      {id: 2, name: 'Angular Connect', speakers: [1, 2, 3], sponsors: [3, 4] },
    ];
    
    const users = [
      {id: 1, name: 'Lukas'},
      {id: 2, name: 'Jules'},
      {id: 3, name: 'Jon'}
    ];
    
    const sponsors = [
      {id: 1, name: 'Firebase'},
      {id: 2, name: 'Ionic'},
      {id: 3, name: 'Auth0'},
      {id: 4, name: 'BackAnd'}
    ];
    
    const events$ = Observable.of(events);
    const users$ = Observable.of(users);
    const sponsors$ = Observable.of(sponsors);
    
    const conference$ = Observable.combineLatest(
        events$,
        users$,
        sponsors$,
        (events, users, sponsors)=> {
          return events.map(event => {
            var speakers = users.filter(user => event.speakers.indexOf(user.id) > -1);
            var eventSponsors = sponsors.filter(sponsor => event.sponsors.indexOf(sponsor.id) > -1);
            return Object.assign({}, event, {speakers: speakers, sponsors: eventSponsors});
          });
        })
        .subscribe(
            x=> {this.conference = x},
            err=> console.log(err),
            ()=> console.log('complete')
        );
    
    // Finish: Create an observable that returns THIS structure
    /*
    [
      {id: 1, name: 'ngConf', speakers: [
        {id: 1, name: 'Lukas'},
        {id: 2, name: 'Jules'}
      ], sponsors: [
        {id: 1, name: 'Firebase'},
        {id: 2, name: 'Ionic'}
      ]},
      {id: 2, name: 'Angular Connect', speakers: [
        {id: 1, name: 'Lukas'},
        {id: 2, name: 'Jules'},
        {id: 3, name: 'Jon'}
      ], sponsors: [
        {id: 3, name: 'Auth0'},
        {id: 4, name: 'BackAnd'}
      ]},
    ]
    */
  }
}