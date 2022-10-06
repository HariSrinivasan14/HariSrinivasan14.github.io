const log = console.log

let numLettersTyped = 0
const fullName = "Hari Srinivasan.";
const typeSpeed = 100;
let isTyped = false;


function typeName(){
    if (numLettersTyped < fullName.length){
        document.getElementsByClassName("fullName")[0].innerHTML += fullName[numLettersTyped];
        setTimeout(typeName, typeSpeed);
        numLettersTyped ++;
    }
    if (numLettersTyped == fullName.length) {
        document.getElementsByClassName("nav")[0].style.display = "block";
    }

}


function displayPopout(event){
    let buttonClicked = event.target.innerHTML;

    if (document.getElementById("wrapperAboutMe").style.display !== "block" || document.getElementById("myProjectPopOut").style.display !== "block"){
        if (buttonClicked === "About Me"){
            log(buttonClicked)
            document.getElementById("wrapperAboutMe").style.display = "block";
        } else if (buttonClicked === "My Projects"){
            log(buttonClicked)
            document.getElementById("wrapperMyProject").style.display = "block";
        } else {
            log(buttonClicked);
            document.getElementById("wrapperContactMe").style.display = "block";
        }
    }
    
}

function resetMyProjectPopout(){
    
    // reset dropdown
    document.getElementById("projectCategory").value = "All Projects";

    //reset Projects
    let contentDiv = document.getElementById("projectDiv").children;
    for(let counter = 0; counter < contentDiv.length; counter++){
        contentDiv[counter].className = "projectContent-hidden";
    }
    contentDiv[0].className = "projectContent";


    // reset indicators
    let numprojectDisplay = document.getElementById("numProjects").children;

    for(let counter = 0; counter < numprojectDisplay.length; counter++){
        numprojectDisplay[counter].className = "projectIndicator";
    }
    numprojectDisplay[0].className = "currentProjectIndicator"; 
}


function closePopout(event){
    log(event)
    let buttonClicked = event.target.id;
    log(buttonClicked)
    if (buttonClicked === "closeAboutMe"){
        document.getElementById("wrapperAboutMe").style.display = "none";
    } else if (buttonClicked === "closeMyProject") {
        document.getElementById("wrapperMyProject").style.display = "none";
        resetMyProjectPopout();
    } else {
        document.getElementById("wrapperContactMe").style.display = "none";
    }
    
}

function filterProjects(event){
    let toFilter = event.value;
    log(toFilter)
    const projects = {
        "All Projects": [1 ,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        "OS & Parallel Programming": [5, 6, 8, 14],
        "Web Developement": [1, 10, 11],
        "Cyber Security": [4, 7],
        "Other": [2, 3, 9, 12, 13]        
    }
    let contentDiv = document.getElementById("projectDiv").children;
    for(let counter = 0; counter < contentDiv.length; counter++){
        if(projects[toFilter].indexOf(counter + 1) >= 0) {
            contentDiv[counter].className = "projectContent-hidden";
        }else {
            contentDiv[counter].className = "projectContent-filtered";
        }
    }
    contentDiv[projects[toFilter][0] - 1].className = "projectContent";

    // update number project display
    let projectDisplay = document.getElementById("numProjects").children;

    // reset indicators
    for(let counter = 0; counter < projectDisplay.length; counter++){
        projectDisplay[counter].className = "projectIndicator";
    }

    let numRemoveIndicator = projects[toFilter].length;
    for (let counter = projectDisplay.length - 1; counter >= numRemoveIndicator; counter--){
        projectDisplay[counter].className = "projectIndicator-filtered";
    }
    projectDisplay[0].className = "currentProjectIndicator";


}

function getProject(projectNumber) {
    let listOfProjects = document.getElementById("projectDiv").children;
    let counter = 0;
    let index = 0;
    while (counter != projectNumber){
        if (listOfProjects[index].className !== "projectContent-filtered"){
            counter++;
        }
        index++;
    }
    return listOfProjects[index - 1];
}

function selectProject(event){
    let currentProjectIndicator = document.getElementsByClassName("currentProjectIndicator")[0];
    var id = parseInt(currentProjectIndicator.id);

    // update the indicators and display
    currentProjectIndicator.className = "projectIndicator";
    let project = getProject(id);
    project.className = "projectContent-hidden"; 
    
    let target = event.target;
    id = parseInt(target.id);
    target.className = "currentProjectIndicator";
    project = getProject(id);
    project.className = "projectContent"; 

}

function getPreProject(currentProject){
    let project = currentProject;
    while (project.previousElementSibling != null && project.previousElementSibling.className === "projectContent-filtered") {
        project = project.previousElementSibling;
    }
    return project.previousElementSibling;
}


function displayPreProject(){
    let currentProject = document.getElementsByClassName("projectContent")[0];
    let preProject = getPreProject(currentProject);
    if (preProject != null){
        currentProject.className = "projectContent-hidden";
        preProject.className = "projectContent";
        updateNumProjects(false)
    }
}

function updateNumProjects(isNext){
    let currentProjectIndicator = document.getElementsByClassName("currentProjectIndicator")[0];
    if (isNext){
        let nextProjectIndicator = currentProjectIndicator.nextElementSibling;
        if (nextProjectIndicator.className === "projectIndicator") {
            currentProjectIndicator.className = "projectIndicator";
            nextProjectIndicator.className = "currentProjectIndicator";
        }
    } else {
        let previousProjectIndicator = currentProjectIndicator.previousElementSibling;
        if (previousProjectIndicator.className === "projectIndicator") {
            currentProjectIndicator.className = "projectIndicator";
            previousProjectIndicator.className = "currentProjectIndicator";
        }
    }

}

function getNextProject(currentProject){
    let project = currentProject;
    while (project.nextElementSibling != null && project.nextElementSibling.className === "projectContent-filtered") {
        project = project.nextElementSibling;
    }
    return project.nextElementSibling;
}

function displayNextProject(){
    let currentProject = document.getElementsByClassName("projectContent")[0];
    let nextProject = getNextProject(currentProject);
    if (nextProject !== null){
        currentProject.className = "projectContent-hidden";
        nextProject.className = "projectContent";
        updateNumProjects(true)
    }
}

function redirectToProjects(){
    document.getElementById("wrapperAboutMe").style.display = "none";
    document.getElementById("wrapperMyProject").style.display = "block";
}

