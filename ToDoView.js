'use strict'



/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}
    
    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        
        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        

        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
        listElement.onmouseup = function() {  // Selected List on Top
            listsElement.insertBefore(listElement, listsElement.childNodes[0]);
            var x= listElement.getAttributeNode("id");
            
            
        }
        


        
    }


    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");
        
        
        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            let listItemElement = document.createElement('div');
            listItemElement.setAttribute("id", listItem.id);
            listItemElement.setAttribute("class", "list-item-card");
            itemsListDiv.appendChild(listItemElement);

            let taskCol = document.createElement('div');
            taskCol.setAttribute("class", "task-col");
            //taskCol.setAttribute("contentEditable", "true");
            taskCol.setAttribute("id", 'task');
            taskCol.innerHTML = listItem.description;
            listItemElement.appendChild(taskCol);

             taskCol.onclick = (event) => {  
                let swapper = document.createElement('input');
                swapper.setAttribute("type", "text");
               // swapper.setAttribute("size", '30');
                
                taskCol.replaceWith(swapper);
                // swapper.onfocus = function(){  
                //     handleClickedDiv(taskCol.onclick);
                // };
                swapper.onblur = function(){ 

                };

                 this.controller.handleClickedDiv(event.target);}
            let dueDate = document.createElement('div');
            dueDate.className = 'due-date-col';
            dueDate.innerHTML =listItem.dueDate;
            listItemElement.appendChild(dueDate);

            let status = document.createElement('div');
            status.setAttribute("class", "status-col");
            status.innerHTML= listItem.status;
            listItemElement.appendChild(status);

            let listControls = document.createElement('div');
            listControls.setAttribute("class", "list-controls-col");
            listItemElement.appendChild(listControls);

            let upArrow = document.createElement('div');
            upArrow.setAttribute("class", "list-item-control material-icons");
            upArrow.innerHTML = 'keyboard_arrow_up';
            listControls.appendChild(upArrow);

            let downArrow = document.createElement('div');
            downArrow.setAttribute("class", "list-item-control material-icons");
            downArrow.innerHTML = 'keyboard_arrow_down';
            listControls.appendChild(downArrow);

            let closee = document.createElement('div');
            closee.setAttribute("class", "list-item-control material-icons");
            closee.innerHTML = 'close';
            listControls.appendChild(closee);

            // let listItemControl = document.createElement('div');
            // listItemControl.setAttribute("class", "list-item-control")
            // listControls.appendChild(listItemControl);
            // listControls.appendChild(listItemControl);
            
            





            // let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
            //                     + "<div class='task-col'>"+  listItem.description + 
            //                        "</div>"
            //                     + "<div class='due-date-col'>" + listItem.dueDate + "</div>"
            //                     + "<div class='status-col'>" + listItem.status + "</div>"
            //                     + "<div class='list-controls-col'>"
            //                     + " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
            //                     + " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
            //                     + " <div class='list-item-control material-icons'>close</div>"
            //                     + " <div class='list-item-control'></div>"
            //                     + " <div class='list-item-control'></div>"
            //                     + "</div>";
            // itemsListDiv.innerHTML += listItemElement;
            itemsListDiv.appendChild(listItemElement);
            }
        }

        swap = function(){
            
            
        }


    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }

}