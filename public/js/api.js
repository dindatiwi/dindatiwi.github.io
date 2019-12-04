let base_url = "https://api.football-data.org/v2/competitions/2015/matches";
var teamz = "https://api.football-data.org/v2/competitions/2015/teams";
let teamS


function fetchWithToken(url){
  return fetch(url, {
    method: 'GET', 
    headers: {
      'X-Auth-Token': 'f91050acb41f4bf4be57b4b2b9664505'
    }
  });
}

function status(response){
    if (response.status !==200){
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response){
    return response.json();
}

function error(error){
    console.log("Error : " + error);
}

function getArticles(){
    if('caches' in window){
        caches.match(base_url).then(function(response){
            if(response){
                response.json().then(function(data){
                    var articlesHTML = "";
                    data.matches.forEach(function(article){
                        articlesHTML +=`
                               <tr>
                               <td>${article.homeTeam.name}</td>
                               <td>${article.awayTeam.name}</td>
                               <td>${article.score.winner}</td>
                               <td>${article.score.fullTime.homeTeam}</td>
                               <td>${article.score.fullTime.awayTeam}</td>
                               <td>${article.season.currentMatchday}</td>
                             </tr>
                `;
                    });
                    document.getElementById("articles").innerHTML = articlesHTML;
                });
            }
        });
    }
    fetchWithToken(base_url)
    .then(status)
    .then(json)
    .then(function(data){
      var str = JSON.stringify(data).replace(/http:/g, 'https:');
      data = JSON.parse(str);
      teamS = data;
        var articlesHTML = "";
                    data.matches.forEach(function(article){
                        articlesHTML +=`
                        <tr>
                        <td>${article.homeTeam.name}</td>
                        <td>${article.awayTeam.name}</td>
                        <td>${article.score.winner}</td>
                        <td>${article.score.fullTime.homeTeam}</td>
                        <td>${article.score.fullTime.awayTeam}</td>
                        <td>${article.season.currentMatchday}</td>
                      </tr>

                `;
                    });
                    document.getElementById("articles").innerHTML = articlesHTML;

    })
    .catch(error);
}

function getTeams(){
    if('caches' in window){
        caches.match(teamz).then(function(response){
            if(response){
                response.json().then(function(data){
                    var teamsHTML = "";
                    data.teams.forEach(function(team){
                               teamsHTML +=`
                               <div class="card">
                                 <div class="card-image center-align">
                                 <img width="50" height="50" src="${team.crestUrl}">
                                 </div>
                               <div class="card-content">
                                 <span class="card-title truncate center-align">${team.name}</span>
                                 <p class="center">${team.area.name} | ${team.founded} | ${team.venue}</p>
                               </div>
                               <div class="card-action right-align">
            <a class="waves-effect waves-light btn blue" onClick="insertTeam(${team.id})"><i class="large material-icons">favorite_border</i></a>
            </div>
                             </div>
                `;
                    });
                    document.getElementById("teamS").innerHTML = teamsHTML;
                });
            }
        });
    }
    fetchWithToken(teamz)
    .then(status)
    .then(json)
    .then(function(data){
        var str = JSON.stringify(data).replace(/http:/g, 'https:');
        data = JSON.parse(str);
        teamS = data;
        var teamsHTML = "";
                    data.teams.forEach(function(team){
                        teamsHTML +=`
                        <div class="card">
                          <div class="card-image center-align">
                          <img width="50" height="50" src="${team.crestUrl}">
                          </div>
                        <div class="card-content">
                          <span class="card-title truncate center-align">${team.name}</span>
                          <p class="center">${team.area.name} | ${team.founded} | ${team.venue}</p>
                        </div>
                        <div class="card-action center-align">
     <a class="waves-effect waves-light btn blue" onClick="insertTeam(${team.id})"><i class="large material-icons">favorite_border</i></a>
     </div>
                      </div>

                `;
                    });
                    document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

function getSaved(){
    getFavTeams()
    .then(function(data){
        var teamshtml='';
        data.forEach(function(team){
          teamshtml +=`
          <div class="card">
            <div class="card-image center-align">
            <img width="50" height="50" src="${team.crestUrl}">
            </div>
          <div class="card-content">
            <span class="card-title truncate center-align">${team.name}</span>
            <p class="center">${team.area.name} | ${team.founded} | ${team.venue}</p>
          </div>
          <div class="card-action center-align">
<a class="waves-effect waves-light btn blue" onclick="deleteListener(${team.id})"&saved=true><i class="large material-icons">delete</i></a>
</div>
        </div>
      `;
      });
      if(data.length == 0) teamshtml += '<h3 class="center-align">No favorite team added yet</h3>'
      document.getElementById("saved").innerHTML = teamshtml;               
      })
      .catch(error);
}