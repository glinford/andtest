# and
ANDigital Test

#Summary
>As the purpose of the test is to build a demo for a potential client, I tried to maximize the animations and the UI layouts with some >trendings components and CSS framework (Material Design/Normalize). I believe that a non tech client is easily impressed and could >think "this is cool" if tiles and grids are liquid and nicely animated (My mother would think it's cool).

>The demo shows a simple app/page with a grid in Instagram/Pinterest style of some local venues.
>User can input a location (Where ? eg: London soho) and a type of venue (What ? eg: Donuts).
>When a user click on a tile he gets a popup with the basic information, the top 5 tips about the venue (if any) and the google map >location so he can easily locate the venue.
>To load more tiles the user has to scroll down.
>The app is responsive (min 300px) so can be used with a phone easily

#Technical Aspect:
- JS: Angular/Angular-Material/AngularGird/NG-Map
- CSS: Angular-Material/Normalize
- API used: ip-json, Foursquare

#Comments:

>I wish I had time to implement some tests cases with Karma (https://karma-runner.github.io/0.13/index.html) which is optimized for >Angular.
>I wish I had more time in general.

#Requirements: 
- Node.js
- NPM
- Bower

#Build :
```shell
npm install && bower install && npm start
```

Local website : http://localhost:8080/
