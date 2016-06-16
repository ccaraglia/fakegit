var genParamString = function(paramObject) {
    var outputString = '?'
    for (var key in paramObject) {
        outputString += key + '=' + paramObject[key] + '&'
    }
    return outputString.substr(0,outputString.length - 1)
}


try {
    var token = GLOBAL_TOKEN
}
catch (e) {
    var token = ''
}

//token test
console.log('token>>>' + token)

//loading ccaraglia by default
var urlProf ='https://api.github.com/users/ccaraglia'
var urlRepo = 'https://api.github.com/users/ccaraglia/repos'

var params = {
    access_token: token
}

var promiseProf = $.getJSON(urlProf) //+ genParamString(params))
var promiseRepo = $.getJSON(urlRepo) //+ genParamString(params))


containerNode = document.querySelector('#container')

//prettify the date to return month day, year

var prettyDate = function(string){
var monthArray=['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
var date = new Date(string)

var string='Joined on ' + monthArray[date.getMonth()] + ',' + ' ' +(date.getDate())+ ' ' + (date.getYear()+1900)

return string
}


var createProfile=function(dataP){

// test
console.log(dataP)
/*console.log(dataP.name)
console.log(dataP.login)
console.log(dataP.blog)
console.log(dataP.location)
console.log(dataP.email)
console.log(dataP.html_url)
console.log(dataP.location)
*/

var htmlString = ''

    htmlString += '<img src="' + dataP.avatar_url + '">'
    htmlString += '<p>' + dataP.name + '</p>'
    htmlString += '<p>' + dataP.login + '</p>'
    htmlString += '<p>' + dataP.email + '</p>'
    htmlString += '<p>' + dataP.location + '</p>'
    htmlString += '<p>' + dataP.html_url + '</p>'
    htmlString += '<p>' + prettyDate(dataP.created_at) + '</p>'

    htmlString += '<div class="followersBar">'
    htmlString += '<div class="followers">'
    htmlString += '<p class="number">' + dataP.followers + '</p>' + '<p>' + 'Followers' + '</p>'
    htmlString += '</div>'
    htmlString += '<div class="following">'
    htmlString += '<p class="number">' + dataP.following + '</p>' + '<p>' + 'Following' + '</p>'
    htmlString += '</div>'
    htmlString += '</div>'


    // write it into the container
    var leftCol = document.querySelector("#leftCol")
    leftCol.innerHTML = htmlString

}



var createRepos=function(dataR){

//test to check the dataform
console.log(dataR[0])
console.log(dataR[0].name)



var timeNow = new Date()
console.log(timeNow)


//calculating the elapsed time to show uploaded XX days ago
//
var elapsedTime = function (inputMilliSeconds) {

    var seconds = Math.floor(inputMilliSeconds/1000) + " second"
    var minutes = Math.floor(inputMilliSeconds/(1000 * 60)) + " minute"
    var hours = Math.floor(inputMilliSeconds/(1000 * 60 * 60)) + " hour"
    var days = Math.floor(inputMilliSeconds/(1000 * 60 * 60 * 24)) + " day"
    var months = Math.floor(inputMilliSeconds/(1000 * 60 * 60 * 24 * 30)) + " month"
    var years = Math.floor(inputMilliSeconds/(1000 * 60 * 60 * 24 * 30 * 12)) + " year"

    var timeArray = [years, months, days, hours, minutes, seconds]

    for(var i = 0; i < timeArray.length; i++) {
        if (parseInt(timeArray[i]) !== 0) {

            if(parseInt(timeArray[i]) >= 2) {
                return "about " + timeArray[i] + "s ago"
            }
            else if (parseInt(timeArray[i]) < 2) {
                return timeArray[i] + " ago"
            }
        }

    }

}



var htmlString = ''

for (var i=0; i<dataR.length; i++){

timeThen= new Date(dataR[i].updated_at)

    htmlString += '<div class="repoList">'
    htmlString += '<ul>' + '<a href="' + dataR[i].html_url + '">' + dataR[i].name + '</a></ul>'

    htmlString += '<p>' + 'Updated ' + elapsedTime(timeNow-timeThen) + '</p>'
    htmlString += '</div>'
}
    // write it into the container
    var rightContainer = document.querySelector("#rightCol")
    rightCol.innerHTML = htmlString

}


promiseProf.then(createProfile)
promiseRepo.then(createRepos)


var getUser = function(evt) {
    console.log(evt)
    if (evt.keyCode === 13) {
        // console.log('target>>', evt.target)
        //GRAB TEXT INPUT FROM USER
        var inputNode = evt.target


        var input=inputNode.value
        //empty the add toolbar after each enter
        inputNode.value = ''


        var urlUser='https://api.github.com/users/'+input
        var urlRepoSearch = 'https://api.github.com/users/'+input+'/repos'
        //var urlUserRepo

        var User=$.getJSON(urlUser)
        var userRepo=$.getJSON(urlRepoSearch)

        User.then(createProfile)
        userRepo.then(createRepos)
    }
}


var inputNode=document.querySelector('input')
//console.log(inputNode)
inputNode.addEventListener("keypress", getUser)



