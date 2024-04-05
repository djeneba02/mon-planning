// document.addEventListener("DOMContentLoaded", function(){
// const add = document.getElementById("add");
// const dateList = document.getElementById("dateList");
// const addList = document.getElementById("addList");
// const addBtn = document.getElementById("addBtn");
//    addBtn.addEventListener("click", function(){
//     const contentAdd= add.value.trim();
//     const contentdate= dateList.value.trim();
//     if(contentAdd.value !== ""){
//         const listLi= document.createElement("li");
//         listLi.classList.add("task");
//         listLi.innerText= `
//             <span> ${add} </span>
//             <span> ${dateList} </span>
//             <button class="deleteBtn"> supprimer</button>
//         `;
        
//         addList.appendChild(listLi);
//         add.value= "";
//         contentdate.value= "";
//     }
//     addList.addEventListener("click", function(event){
//         if(event.target.classList.contains("deleteBtn")){
//             event.target.parentElement.remove();
//         }
//     });
//    });
// });

// $(document).ready(function(){
//     const add = document.getElementById("add");
// const dateList = document.getElementById("dateList");
// const addList = document.getElementById("addList");
// const addBtn = document.getElementById("addBtn");
//     $('Add').change(function(){
//         var Add = $(this).val();
//         $('ul').appened('<li>'+ Add +'</li>');
//         $(this).val('')
//     });


// });
// $(document).ready(function(){
//     var add = $("#add");
//     var dateList = $("#dateList");
//     var addList = $("#addList");
//     var addBtn = $("#addBtn");
//     var taskCounter = $("#plannings-Tache span"); // Sélectionne le span contenant le nombre de tâches
//    //   updateTaskCounter();
//     addBtn.on("click", function(){
//         var contentAdd = add.val().trim();
//         var contentDate = dateList.val().trim();
//         var selectedPriority = $(this).siblings(".priority").val(); // Récupère la priorité sélectionnée
//         if (contentAdd !== "") {
//             var listLi = $("<li>").addClass("task").html(`
//                 <span> ${contentAdd} </span>
//                 <span> ${contentDate} </span>
            
//                 <button class="deleteBtn"> supprimer</button>
//                 <select class="priority">
//                     <option value="high">Haute</option>
//                     <option value="medium">Moyenne</option>
//                     <option value="low">Basse</option>
//                 </select>
//             `);
//              addList.append(listLi);
//             add.val("");
//             dateList.val("");
//              // Met à jour le nombre de tâches
//              var currentTasks = parseInt(taskCounter.text());
//              taskCounter.text(currentTasks + 1);
//         }
//     });

//     addList.on("click", ".deleteBtn", function(){
//         $(this).parent().remove();
//         // Met à jour le nombre de tâches après la suppression
//         var currentTasks = parseInt(taskCounter.text());
//         taskCounter.text(currentTasks - 1);
       

      
//     });
//     // Fonction pour mettre à jour le nombre de tâches
//     function updateTaskCounter() {
//         var currentTasks = addList.find('li.task').length;
//         taskCounter.text(currentTasks);
//     }

   
// });
$(document).ready(function(){
    var add = $("#add");
    var dateList = $("#dateList");
    var addList = $("#addList");
    var addBtn = $("#addBtn");
    var taskCounter = $("#plannings-Tache span"); // Sélectionne le span contenant le nombre de tâches

    // Charger les tâches depuis le stockage local au chargement de la page
    loadTasksFromLocalStorage();

    addBtn.on("click", function(){
        var contentAdd = add.val().trim();
        var contentDate = dateList.val().trim();
        var selectedPriority = $(this).siblings(".priority").val(); // Récupère la priorité sélectionnée
        if (contentAdd !== "") {
            var listLi = $("<li>").addClass("task").html(`
                <span> ${contentAdd} </span>
                <span> ${contentDate} </span>
                <button class="deleteBtn"> supprimer</button>
                <select class="priority">
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                </select>
                <select class="status">
                <option value="comp">complet</option>
                <option value="incomp">incomplet</option>
                
            </select>
            `);
            addList.append(listLi);
            add.val("");
            dateList.val("");
            // Met à jour le nombre de tâches
            updateTaskCounter();
            // Enregistrer les tâches dans le stockage local
            saveTasksToLocalStorage();
        }
    });

    addList.on("click", ".deleteBtn", function(){
        $(this).parent().remove();
        // Met à jour le nombre de tâches après la suppression
        updateTaskCounter();
        // Enregistrer les tâches dans le stockage local après la suppression
        saveTasksToLocalStorage();
    });

    // Fonction pour mettre à jour le nombre de tâches
    function updateTaskCounter() {
        var currentTasks = addList.find('li.task').length;
        taskCounter.text(currentTasks);
    }

    // Fonction pour enregistrer les tâches dans le stockage local
    function saveTasksToLocalStorage() {
        var tasks = [];
        addList.find('li.task').each(function() {
            var task = {
                content: $(this).find('span:first').text().trim(),
                date: $(this).find('span:nth-child(2)').text().trim()
                // Vous pouvez également enregistrer la priorité ici si nécessaire
            };
            tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Fonction pour charger les tâches depuis le stockage local
    function loadTasksFromLocalStorage() {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function(task) {
                var listLi = $("<li>").addClass("task").html(`
                    <span> ${task.content} </span>
                    <span> ${task.date} </span>
                    <button class="deleteBtn"> supprimer</button>
                    <select class="priority">
                        <option value="high">Haute</option>
                        <option value="medium">Moyenne</option>
                        <option value="low">Basse</option>
                    </select>
                `);
                addList.append(listLi);
            });
            // Met à jour le nombre de tâches après le chargement
            updateTaskCounter();
        }
    }
});