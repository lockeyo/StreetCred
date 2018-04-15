const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

var db = admin.firestore();


var pointsMap = {
    "carpool": 5,
    "public_transit": 5,
    "alt": 8,
    "walk": 10,
    "bike": 15    
}

exports.userChallengeCreated = functions.firestore.document('users/{userId}/challenges/{challengeId}')
    .onCreate((newChallengeSnap, context) => {
        const newChallenge = newChallengeSnap.data()
        // need to set up empty stats
        var stats = { 
            trips_taken: 0,
            points: 0            
        };

        // need to create goal segments
        var parentChallengeRef = newChallenge.parent_challenge;
        parentChallengeRef.get()
        .then((parentChallengeSnap) => {
            var parentChallengeData = parentChallengeSnap.data();
            var mode_required = parentChallengeData.rules.mode_required;
            var start_date = parentChallengeData.rules.start_date;
            var end_date = parentChallengeData.rules.end_date;

            var challenge_frequency = parentChallengeData.rules.trip_frequency;
            var trip_count_minimum = parentChallengeData.rules.trip_count_minimum;
            var segment_count;        

            if(challenge_frequency === 'weekly') {
                segment_count = calculateWeeksBetween(start_date, end_date);                
            } else if (challenge_frequency === 'monthly') {
                segment_count = calculateMonthsBetween(start_date, end_date);                
            }

            var segments = {};
            var segment_start_date = start_date;
            var segment_end_date;
            for(var i = 0; i < segment_count; i++ ) {
                if (challenge_frequency === 'weekly') {
                    segment_end_date = new Date(segment_start_date.getTime() + 7 * 24 * 60 * 60 * 1000);
                }
                
                segments[i] = {
                    complete: false,
                    trips_taken: 0,
                    trip_minimum: trip_count_minimum,
                    start_date: segment_start_date,
                    end_date: segment_end_date,
                    points_earned: 0                
                }

                // move the starting point forward
                segment_start_date = new Date(segment_end_date.getTime() + 1 * 24 * 60 * 60 * 1000);
            }

            return newChallengeSnap.ref.set({goal_segments: segments, stats: stats}, { merge: true });
        })
        .catch((err) => console.log(err));

        return true;
    });

exports.newTripTrigger = functions.firestore.document('users/{userId}/trips/{tripId}')
    .onCreate((snap, context) => {
        const newTrip = snap.data();
        var docRef = snap.ref;    

        var userId = context.params.userId;
        var tripId = context.params.tripId;
        
        // determine the qualifying challenges
        userChallenges = db.collection('users').doc(userId).collection('challenges').get()
        .then((snapshot) => {
            var applicableChallenges = [];
            snapshot.forEach(doc => {                
                var userChallengeSnap = doc;                                
                var userChallengeData = userChallengeSnap.data();
                var parentChallengeRef = userChallengeData.parent_challenge;
                parentChallengeRef.get()
                .then((parentChallengeSnap) => {
                    var parentChallengeData = parentChallengeSnap.data();
                    if (validTrip(newTrip, parentChallengeData)) {
                        updateChallengeTripCount(parentChallengeSnap, parentChallengeData.stats.trips_taken + 1);
                        updateUserChallenge(newTrip, userChallengeSnap, userChallengeData);                
                    }
                    return;
                }).catch((err) => console.log(err));
            });
            return;
        })        
        .catch((err) => {
            console.log(err);
        });                

        return snap.ref.set({ date_created: admin.firestore.FieldValue.serverTimestamp() }, {merge: true});                
     });


function updateUserChallenge(trip, challengeSnap, challengeData) {
    var segments = challengeData.goal_segments;
    var tripDate = trip.timestamp;
    var tripMode = trip.mode;
    var segmentFound = false;
    
    // find the right segment
    for (var key in segments) {
        var seg = segments[key];
        if (tripDate >= seg.start_date && tripDate <= seg.end_date) {
            segmentFound = true;
            var segmentKey = key;
            break;
        }
    }    

    if (segmentFound) {    
        var tripCount = challengeData.stats.trips_taken + 1;        
        var overallPoints = challengeData.stats.points + pointsMap[tripMode];
                            
        var currentSegment = segments[key];        
        var trip_minimum = currentSegment.trip_minimum;
        currentSegment.trips_taken += 1;
        currentSegment.points_earned += pointsMap[tripMode]
        
        if (currentSegment.trips_taken >= trip_minimum) {
            currentSegment.complete = true;
        }
        
        // DO SOMETHING WHEN THE SEGMENT IS COMPLETE
        // send a push notification ?
        
        segments[key] = currentSegment;

        return  challengeSnap.ref.update({ 
            goal_segments: segments,
            stats: {
                trips_taken: tripCount,
                points: overallPoints
            }                        
        }, {merge: true});
    } else {
        return false;
    }
}

function updateChallengeTripCount(challengeSnap, count) {
    challengeSnap.ref.update({ stats: { trips_taken: count }}, {merge: true});
}


function validTrip(trip, challenge) {        
    if (trip.timestamp >= challenge.rules.start_date && trip.timestamp <= challenge.rules.end_date && trip.mode === challenge.rules.mode_required) {
        // TODO: start and end locations are within valid radii
        return true;
    } else {
        return false;
    }    
}

function calculateWeeksBetween(date1, date2) {    
    var one_week = 1000 * 60 * 60 * 24 * 7;    
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = Math.abs(date1_ms - date2_ms);
    
    return Math.floor(difference_ms / one_week);
}

function calculateMonthsBetween(date1, date2) {
    // set to a standard 31 days for now
    var one_month = 1000 * 60 * 60 * 24 * 31;    
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = Math.abs(date1_ms - date2_ms);
    
    return Math.floor(difference_ms / one_month);
}

