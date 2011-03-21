function append2panel(id, type){

    //text = text.replace(/^\s+/g,'').replace(/\s+$/g,'');    	
	
	var container; //contains all the filter element
	
	var categoryName = id.split('-')[0];
	var filterName = id.split('-')[1];
	
    if(document.getElementById('c-' + categoryName)){
        container = document.getElementById('c-' + categoryName);
        
        if(document.getElementById('f-' + id)){
        
            borrarFiltro(categoryName,id);
            return;
            
         }else{
            var tableAux = document.getElementById('t-' + categoryName);
            
            var filter = createFilter(filterName, type, id);    
            tableAux.appendChild(filter);
         }
        
    } else {   
        
        container =  createContainer(id, type);
        $("#panel-filter").append(container);
    }    
    
}

function borrarFiltro(categoryName,id){
    var tableAux = document.getElementById('t-' + categoryName);
    tableAux.removeChild(document.getElementById('f-' + id));
    if(tableAux.childElementCount == 1)
        borrar('panel-filter', 'c-' + categoryName);
}

function borrar(parent, obj){
    fi = document.getElementById(parent); 
    fi.removeChild(document.getElementById(obj));
}


//creates the element wich contains all the filter of a category
function createContainer(id, initFilterType){
    
    var container;
    var categoryName = id.split('-')[0];
	var filterName = id.split('-')[1];
		
    container = document.createElement('div');
    container.id = 'c-' + categoryName;
    container.className = "filter"; 
    
    //the close button
    var but = document.createElement('input');
    but.type = 'button';
    but.value = 'x';
    but.onclick = function () {borrar('panel-filter', 'c-' + categoryName)} 
    but.className = "close-but"; 
    
    //the table which organizes the layout of the filter element
    var table = document.createElement('table');
    table.id = "t-" + categoryName;
    
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("style","width: 100%;");
	td1.setAttribute("colspan","2");
	td1.innerHTML = "<b>"+categoryName+"</b>";
    var td2 = document.createElement('td');
    td2.setAttribute("style","width: 5px; aling:right");
    td2.appendChild(but);
    tr.appendChild(td1);
    tr.appendChild(td2);
    
    table.appendChild(tr);    
    var filter = createFilter(filterName, initFilterType, id);    
    table.appendChild(filter);
    container.appendChild(table);    
    
    return container;
     
}


//returns a teble row with the filter element
function createFilter(name, type, id){

    var category = id.split('-')[0];  
    
    var tr = document.createElement('tr');    
    tr.id = "f-" + id;
    
    var td1 = document.createElement('td');
    td1.innerHTML = name;
	td1.setAttribute("style","width: 5%; padding-left: 5px");
    tr.appendChild(td1);
    
    var td2 = document.createElement('td');
    var input = createInput(name, type);
    td2.appendChild(input);
    
    //the close button
    var but = document.createElement('input');
    but.type = 'button';
    but.value = 'x';
    but.onclick = function () {borrarFiltro(category , id)} 
    //but.className = "close-but"; 
    
    td2.appendChild(but);
    
    tr.appendChild(td2);
    
    return tr;
}

function createInput(name, type){

    var input;
    
    if(type == 'T'){    
        input = document.createElement('input');
        input.type = "text";
        input.setAttribute("size","12");
                
    } else if(type == 'C'){
        input = document.createElement('select');
        for(i = 1; i <= 10; i++){
            var option = document.createElement('option');
            option.value = name + " " + i;
            option.innerHTML = name + " " + i;
            input.appendChild(option);
        }
    }
    
    return input
}
 
