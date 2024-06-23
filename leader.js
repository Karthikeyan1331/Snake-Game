function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
$(document).ready(() => {
    $.getJSON("./leaderboard.json", function (data) {
        // Convert the JSON object into an array of objects
        const players = Object.keys(data).map(key => {
            return { name: key, score: data[key].score };
        });

        // Sort the array by score (descending) and by name (ascending)
        players.sort((a, b) => {
            if (b.score === a.score) {
                return a.name.localeCompare(b.name);
            }
            return b.score - a.score;
        });
        console.log(players)
        // Get the leaderboard div
        const leaderboardBody = $("#leaderboard table");
        const highestScore = players[0].score;
        const playername = localStorage.getItem("nicknameSnake")

        leaderboardBody.empty();

        // Append the sorted data to the leaderboard table
        players.forEach((player, index) => {
            let medal = '';
            if (index === 0 || highestScore == player['score']) {
                medal = '<img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal" />';
            }

            leaderboardBody.append(`
                <tr class="${index === 0 || highestScore == player['score'] ? 'ribbon' : ''} ${player['name'] == playername ? 'you' : ''}">
                    <td class="number">${index + 1}</td>
                    <td class="name">${capitalizeFirstLetter(player.name)} ${player['name'] == playername ? '(You)' : ''}</td>
                    <td class="points">${player.score} ${medal}</td>
                </tr>
            `);
        });
    });
});
