const trElement = document.getElementById('tbody')
const submitButton = document.getElementById('submit')
const firstValue = document.getElementById('value1')
const secondValue = document.getElementById('value2')
const teamSelect1 = document.getElementById('team1');
const teamSelect2 = document.getElementById('team2');

let  teams = JSON.parse(localStorage.getItem("teams")) ||  [];



function Team(id,name){
    this.id=id;
    this.name =name;
    this.game = 0;
    this.goals=0;
    this.score=0;
};

function createTeam(id, name){
    teams.push(new Team(id, name));
};


function createTable() {
    tbody.innerHTML = ""
    teams.forEach((team,id) => {
     const tr = document.createElement('tr');
     const firstTd = document.createElement('td');
     const secondTd = document.createElement('td');
     const thirdTd = document.createElement('td');
     const fourthTd = document.createElement('td');
     const fiveTd = document.createElement('td');
     firstTd.textContent = ++id;
     secondTd.textContent = team.name;
     thirdTd.textContent = team.game;
     fourthTd.textContent = team.goals;
     fiveTd.textContent = team.score;
     trElement.appendChild(tr);
     tr.appendChild(firstTd);
     tr.appendChild(secondTd);
     tr.appendChild(thirdTd);
     tr.appendChild(fourthTd);
     tr.appendChild(fiveTd);
    }) 
}

function createSelect(){
    teams.forEach((team) => {
        const option1 = document.createElement('option')
        option1.textContent = team.name;
        option1.value = team.id;
        const option2 = document.createElement('option')
        option2.textContent = team.name;
        option2.value = team.id;
        teamSelect1.appendChild(option1);
        teamSelect2.appendChild(option2);
        
    });
}

function updadeLocalStorage(){
    localStorage.setItem("teams", JSON.stringify(teams));
}

function arraySort(){
    teams.sort((a, b) => {
        if(a.score > b.score){
            return -1
        }else{
            if(a.score < b.score){
                return 1
            }else {
                if(a.goals >= b.goals){
                    return -1 
                }else{
                    return 1
                }
            }
        }
        
    })
}


submitButton.addEventListener('click',function(){
    JSON.parse(localStorage.getItem('teams'))
    if(firstValue.value !==""&&secondValue.value !==""){
        let currentTeam1 = teams.find(team => team.id === +teamSelect1.value);
        let currentTeam2 = teams.find(team => team.id === +teamSelect2.value);
        currentTeam1.game++;
        currentTeam2.game++;
        if(+firstValue.value > +secondValue.value){
            currentTeam1.score += 3; 
        }else{
            if(+firstValue.value == +secondValue.value){
                currentTeam1.score++;
                currentTeam2.score++;
            }else{
                currentTeam2.score += 3;
            }
        }
        currentTeam1.goals =currentTeam1.goals + (firstValue.value - secondValue.value) 
        currentTeam2.goals =currentTeam2.goals + (secondValue.value - firstValue.value)
        arraySort();
        updadeLocalStorage();
        createTable();
    }
});


if(teams.length === 0){
    createTeam(1, "Ac Milan");
    createTeam(2, "Fc Bayern");
    createTeam(3, "Fc Barcelona");
    createTeam(4, "Real Madrid");
}

createTable();
createSelect();


    
