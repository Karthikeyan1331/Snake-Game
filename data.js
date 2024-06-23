function updatedata(data){
    $.ajax({
        url: "https://snake-game-20e8.onrender.com",  // URL of your JSON file on the server
        type: "POST",              // Change to the appropriate method for your server (e.g., "POST" or "PUT")
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            message.html("Saved file successfully")
        },
        error: function (xhr, status, error) {
            console.error("Error updating JSON file:", status, error);
        }
    });
}
function onEnterName(name) {
    $.getJSON("./leaderboard.json", function (data) {
        if (!data[name]) {
            data[name] = {}
            data[name]['score'] = 0
            updatedata(data)
        }
    })
}
function leaderboardUpdate(score){
    let name = localStorage.getItem("nicknameSnake")
    $.getJSON("./leaderboard.json", function (data) {
        let info = data[name]["score"]
        if(info<score){
            data[name]["score"]=score
            updatedata(data)
        }
    })
}
