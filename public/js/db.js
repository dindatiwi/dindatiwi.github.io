var dbPromise = idb.open('footballdb', 1, function(upgradeDb){
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        upgradeDb.createObjectStore("teams", { keyPath: "id", autoIncrement: true });
    }
    console.log('indexedDb added')
  });
  
  function saveTeam(team) {
    dbPromise
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams")
        console.log(team);
        store.put(team)        
        return tx.complete;
      })
      .then(function() {
        M.toast({ html: `${team.name} saved success!` })
        console.log("Favorite Team Saved");
      });
  }

  function deleteTeam(teamID) {
    dbPromise
    .then(function(db) {
      var tx = db.transaction("teams", 'readwrite');
      var store = tx.objectStore("teams");
      store.delete(teamID);
      return tx.complete;
    }).then(function()  {
      M.toast({ html: 'Team has been deleted!' });
      getSaved();
    })
  }
  
    function getFavTeams() {
        return new Promise(function (resolve, reject) {
            dbPromise
                .then(function (db) {
                    var tx = db.transaction("teams", "readonly");
                    var store = tx.objectStore("teams");
                    return store.getAll();
                })
                .then(function (data) {
                    resolve(data);
                });
        });
      }
  
  var insertTeam = teamID => {
    var team = teamS.teams.filter(el => el.id == teamID)[0]
    saveTeam(team);
    console.log(teamID + " add to favorite")
  }
  
  var deleteListener = teamID => {
      deleteTeam(teamID);
      console.log(teamID + "has been deleted")
  }