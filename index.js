var calendars = [];//require('./json/chinmay.json');
// const testFolder = './json/';
// const fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
// try{
//     let calendar = require(`./json/${file}`);
//     // console.log(calendar);
//     calendars.push(calendar);
// }catch(e){console.log(e);}
//   });
// })
Recruiters = {
  panelists: [
    {
      email: 'ganesh.natarajan@exotel.in',
      hiringManager: true
    },{
      email: 'chinmay@exotel.in',
      hiringManager: false
    },{
      email: 'govind@exotel.in',
      hiringManager: false
    },{
      email: 'vishnu@exotel.in',
      hiringManager: false
    }

  ]
};
var arraySort = require('array-sort');
const CONFIRMED_STATUS = "confirmed";
const ACCEPTED_STATUS = "accepted";
const PRIVATE_VISIBILITY = "private";

calendar1 = require('./json/chinmay.json');
calendar2 = require('./json/vishnu.json');
calendar3 = require('./json/ganesh.natarajan.json');
calendar4 = require('./json/govind.json');

calendars.push(calendar1);
calendars.push(calendar2);
calendars.push(calendar3);
calendars.push(calendar4);
// console.log(calendars);
let acceptedEvents = calendars.map((calendar)=>{
  return calendar.items
         .filter(item=>item.status === CONFIRMED_STATUS)
          .map(item=>{
                if(item.visibility === PRIVATE_VISIBILITY){
                  return {...item, email:calendar.summary};
                }
                else if(item.attendees && item.attendees.length){
                  return item.attendees
                              .filter(attendee=>attendee.email === calendar.summary)[0]
                                .responseStatus === ACCEPTED_STATUS ? {...item, email:calendar.summary} : null;
                  }
                  else{
                    return {...item, email:calendar.summary};
                  }
  });
}).map(account=>account.filter(calendar=>calendar!=null));
var events = acceptedEvents.map(calendars=>{
  return calendars.map(event=>{
      return {email : event.email,summary:event.summary, startTime : event.start.dateTime, endTime : event.end.dateTime}
  })
});
// console.log();
var mergedEvents = [].concat.apply([], events);
console.log(arraySort(mergedEvents,'startTime'));
// console.log(JSON.stringify(acceptedEvents,'',' ',''));