let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let header = document.getElementById('level-title');
let body = document.querySelector('body');

$(document).on("keyup", function () {
    if (!started) {
        header.innerHTML = `Level: ${level}`;
        nextSequence();
        started = true;
    }
});

$(document).on("touchend", function () {
    if (!started) {
        header.innerHTML = `Level: ${level}`;
        nextSequence();
        started = true;
    }
});

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass('pressed');

    setTimeout(function () {
        $("#" + currentColour).removeClass('pressed');
    }, 100);
};

$('.btn').click(function () {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswers(userClickedPattern.length-1);
    console.log(userClickedPattern);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    header.innerHTML = `Level: ${level}`;
    let randomNUmber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNUmber];
    gamePattern.push(randomChosenColour);
    var button = $("#" + randomChosenColour);
    button.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    console.log(gamePattern);
};

function checkAnswers(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log('wrong');
        playSound('wrong');
        body.classList.add('game-over');
        setTimeout(function() {
            body.classList.remove('game-over');
        },200);
        header.innerHTML = "Game over! Press any key to restart."
        startOver();
    }
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}