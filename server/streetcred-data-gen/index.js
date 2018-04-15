var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://street-cred.firebaseio.com"
});

var db = admin.firestore();

var nowDate = new Date();

var tripData =[
  {
    user: 'MWyao2dI4NcYpDvFLXWr',
    mode: 'walk',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: nowDate
  },
  {
    user: 'MWyao2dI4NcYpDvFLXWr',
    mode: 'bike',
    start_location: new admin.firestore.GeoPoint(33.900123, -115.419944),
    end_location: new admin.firestore.GeoPoint(31.9008624, -119.3944007),
    timestamp: nowDate
  },
  {
    user: 'MWyao2dI4NcYpDvFLXWr',
    mode: 'car',
    start_location: new admin.firestore.GeoPoint(30.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.1008624, -118.2244007),
    timestamp: nowDate
  },
  {
    user: 'MWyao2dI4NcYpDvFLXWr',
    mode: 'walk',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: nowDate
  },
  {
    user: 'yCRWADDoKrArQ3yH2Ms8',
    mode: 'walk',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: nowDate
  },
  {
    user: 'yCRWADDoKrArQ3yH2Ms8',
    mode: 'bike',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: new Date(nowDate.getTime() + 2 * 24 * 60 * 60 * 1000)  
  },
  {
    user: 'yCRWADDoKrArQ3yH2Ms8',
    mode: 'carpool',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: nowDate
  },
  {
    user: 'yCRWADDoKrArQ3yH2Ms8',
    mode: 'walk',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: new Date(nowDate.getTime() + 1 * 24 * 60 * 60 * 1000),
  },
  {
    user: 'yCRWADDoKrArQ3yH2Ms8',
    mode: 'bike',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: nowDate
  },
  {
    user: 'yCRWADDoKrArQ3yH2Ms8',
    mode: 'bike',
    start_location: new admin.firestore.GeoPoint(33.900533, -118.419944),
    end_location: new admin.firestore.GeoPoint(33.9008624, -118.3944007),
    timestamp: nowDate
  },
]


var challenge = {
  start_date: nowDate,  
  end_date: new Date(nowDate.getTime() + 30 * 24 * 60 * 60 * 1000),
  mode_required: 'walk',
  trip_count_minimum: 8,
  reward_description: 'This is a monthly challenge. If you walk at least twice per week for the next month, you win a sweet new hoverboard.',
  stats: {
    trips_taken: 0
  }
}

var weekly_challenge = {
  start_date: nowDate,  
  end_date: new Date(nowDate.getTime() + 30 * 24 * 60 * 60 * 1000),
  mode_required: 'bike',
  trip_count_minimum: 2,
  trip_frequency: 'weekly',
  reward_description: 'This is a monthly challenge. If you walk at least twice per week for the next month, you win a sweet new hoverboard.',
  stats: {
    trips_taken: 0
  }
}

var a_challenge = {
  rules: {
    start_date: new Date('April 1, 2018'),  
    end_date: new Date('April 30, 2018'),
    mode_required: 'walk',
    trip_count_minimum: 3,
    trip_frequency: 'weekly'    
  },
  challenge_title: 'April is for the Birds!',
  challenge_description: 'This is a weekly challenge to get you biking to work! Bike to work 3 days per week for the month of April to enter the drawing.',
  reward_description: 'Our grand prize this month is a one month subscription to Bird Scooters.',
  confirmation_code: 'dvHacks18',
  stats: {
    trips_taken: 0,
    points: 0
  }
}


tripData.forEach((trip) => {
  var userId = trip.user
  delete trip.user
  var setDoc = db.collection('users').doc(userId).collection('trips').add(trip)
  console.log(setDoc)
});


// var newChallengeDoc = db.collection('challenges').add(a_challenge);
// console.log(newChallengeDoc);