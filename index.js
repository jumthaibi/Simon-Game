let game_pattern = [];
let user_pattern = [];
let colors = ["blue", "red", "green", "yellow"];
let started = false;
let level = 0;



document.addEventListener("keydown",function(){
    if(!started){
        started = true;
        level = 0;
        document.getElementById("level-title").textContent = "level "+level;
        next_sequence();
    }
})

function next_sequence(){
    let random_num = Math.floor(Math.random()*colors.length);
    let random_color = colors[random_num];
    game_pattern.push(random_color);
    computer_click();
}

function computer_click(){
    for (let i = 0; i < game_pattern.length; i++) {
        setTimeout(() => {
            let btn = document.getElementById(game_pattern[i]);
            btn.classList.add("pressed");
            make_audio(game_pattern[i]);
            setTimeout(() => {
                btn.classList.remove("pressed");
            }, 200);
        }, i * 700); 
    }
}

document.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click",function(){
        user_pattern.push(btn.id);
        check_pattern();
        make_audio(btn.id);
    })
})

function check_pattern(){
    for(let j = 0 ; j<user_pattern.length;j++){
        if(user_pattern[j]!=game_pattern[j]){
            start_over();
            break;
        }
    }
    if (user_pattern.length === game_pattern.length) {
        level++;
        document.getElementById("level-title").textContent = "Level " + level;
        user_pattern = [];
        setTimeout(next_sequence, 1000); 
    }
}

function start_over(){
    level = -1 ;
    started = false;
    user_pattern = [];
    game_pattern = [];
    make_audio("wrong");
    document.body.style.backgroundColor = "red";
    document.getElementById("level-title").style.color = "honeydew";
    setTimeout(() => {
        document.body.style.backgroundColor = "";
        document.getElementById("level-title").style.color = ""; 
    }, 700);
}

function make_audio(key){
    switch(key){
        case "red":
            var red = new Audio("red.ogg");
            red.play();
            break;
        case "blue":
            var blue = new Audio("blue.ogg");
            blue.play();
            break;
        case "green":
            var green = new Audio("green.ogg");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("yellow.ogg");
            yellow.play();
            break;
        case "wrong":
            var wrong = new Audio("wrong.mp3");
            wrong.play();
            break;
        default:
            console.log(key);
    }
}