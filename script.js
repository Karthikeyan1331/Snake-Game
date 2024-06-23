function loginAddon() {
    $(".modal").hide()
    $(".btn-login").hide()
    $(".leaderboard").show()
    $(".user").show()
    $(".btn-logout").show()
    $(".user").attr("title", localStorage.getItem("nicknameSnake"))
    $(".gameboard").show()
}
function logoutAddon() {
    $(".modal").show()
    $(".btn-login").show()
    $(".leaderboard").hide()
    $(".user").hide()
    $(".gameboard").hide()
    $(".btn-logout").hide()
}

function enterFun(e) {
    let val = $("#name").val().toLowerCase()
    if (val !== '') {
        localStorage.setItem("nicknameSnake", val)
        onEnterName(val)
        loginAddon()
    }
}
$(document).ready(function () {
    $(".btn-logout").click(()=>{
        localStorage.removeItem("nicknameSnake")
        location.href="index.html"
    })
    $(".btn-login").click(() => {
        document.getElementById('id01').style.display = 'block'
    })
    $(".play").click(() => {
        window.location.href = "play.html"
    })
    $(".lead").click(() => {
        window.location.href = "leader.html"
    })
    if (!localStorage.getItem("nicknameSnake")) {
        logoutAddon()
    }
    else {
        loginAddon()
    }

    $("form").on("submit", function (e) {
        e.preventDefault();
    });
})