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
	
	var colorClass;
	if(categoryName == 'programas de mano')
	    colorClass = "c-pdm";  	    
	else
	    colorClass = "c-" + categoryName;
	
	
		
    container = document.createElement('div');
    container.id = 'c-' + categoryName;
    container.className = "filter " + colorClass; 
    
    //the close button
    var but = document.createElement('input');
    but.type = 'button';
    but.value = 'x';
    but.onclick = function () {borrar('panel-filter', 'c-' + categoryName)} 
    but.className = "close-but"; 
    but.title = 'Cerrar todos los filtros de ' + categoryName;
    
    //the table which organizes the layout of the filter element
    var table = document.createElement('table');
    table.id = "t-" + categoryName;
    
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    td1.setAttribute("style","width: 100%;");
	td1.setAttribute("colspan","3");
	td1.innerHTML = "<b>&raquo;&nbsp;"+categoryName+"</b>";
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
    td1.setAttribute("style","width:2%")
    var img = document.createElement('img');
    img.title = 'Hacer obligatorio este filtro \n' + 
                'se omitiran los resultados que no lo contengan'  ;
    img.src = 'images/optional2.ico'    
    img.id = "0"; //optional
    img.onclick = function () { changeFilterIco(img); }
    td1.appendChild(img);  
    tr.appendChild(td1);  
    
    var td2 = document.createElement('td');
    td2.innerHTML = name;
	td2.setAttribute("style","width: 5%; padding-left: 5px");
    tr.appendChild(td2);
    
    var td3; //= document.createElement('td');
    var input = createInput(name, type);        
    if(type != 'F'){        
        td3 = document.createElement('td');
        td3.appendChild(input);
    } else {
        td3 = input;
    }
    
    //the close button
    var but = document.createElement('input');
    but.type = 'button';
    but.value = 'x';
    but.onclick = function () {borrarFiltro(category , id)} 
    but.className = "f-close-but"; 
    but.title = 'Cerrar el filtro ' + name;
    
    td3.appendChild(but);
    
    tr.appendChild(td3);
    
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
    } else {
        input = document.createElement('td');
        input.setAttribute("style", "padding-left: 13px;")
        
        var desde = document.createElement('input');
        desde.type = "text";
        desde.setAttribute("size","4");
        var txtDesde = document.createElement('span');
        txtDesde.innerHTML = "despues de:"        
        
        var hasta = document.createElement('input');
        hasta.type = "text";
        hasta.setAttribute("size","4");
        var txtHasta = document.createElement('span');
        txtHasta.innerHTML = "&nbsp;antes de:"  
        
        input.appendChild(txtDesde);
        input.appendChild(desde);
        input.appendChild(txtHasta);
        input.appendChild(hasta);
    }
    
    return input
}

function changeFilterIco(obj){
    if(obj.id == "0") {
        obj.src = "images/mandatory2.ico";
        obj.title = "Hacer opcional este filtro";
        obj.id = "1";
    } else {
        obj.src = "images/optional2.ico";
        obj.title = "Hacer obligatorio este filtro";
        obj.id = "0";
    }  
}
