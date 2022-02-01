/*Mejorar recorrido, si tendré 3 prioridades, debería asignar prioridad 3 a las 1ras páginas hasta que no existan
 elementos en el json con esa prioridad.
*/
let Btns=document.getElementById("Botones");
let listaBtns = Btns.childNodes;

window.onload = function (){
    mostrarImgsPorPagina(1);
};

function mostrarPagina(val){
    mostrarImgsPorPagina(val);
}

function mostrarImgsPorPagina(pagina){
    if(Btns.hasChildNodes()){
        var pagActual;
        for(var i =0; i<listaBtns.length; i++){
            if(listaBtns[i].className=="active blue"){
                pagActual=listaBtns[i].value;
            }
        }
        
        var prioridadPagina;
        //Asignación de Prioridad
        prioridadPagina=4-pagina;

        if(pagina==1){
            document.getElementById("BtnIzquierda").className = "disabled";
            document.getElementById("BtnDerecha").className = "waves-effect";
        } else {
            if(pagina<3){
                document.getElementById("BtnIzquierda").className = "waves-effect";
                document.getElementById("BtnDerecha").className = "waves-effect";
            } else{
                document.getElementById("BtnIzquierda").className = "waves-effect";
                document.getElementById("BtnDerecha").className = "disabled";
            }
        }

        for (var i = 0; i < listaBtns.length; i++) {
            if(listaBtns[i].value==pagina){
                listaBtns[i].className = "active blue";
            } else {
                listaBtns[i].className= "waves-effect";
            }
        }
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'json/infoImg.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function (){
        if(this.readyState==4 && this.status==200){
            let datos =  JSON.parse(this.responseText);
            let res = document.querySelector('#listaImgs');
            res.innerHTML='';
            let htmlTxt= '';
            let fila1 = true;
            let c=0;
            for(let item of datos){
                if(item.prioridad==prioridadPagina && c<10){
                    c++;
                    if(fila1==true){
                        htmlTxt += `
                        <div class="row">
                            <img class="col s12 l6 responsive-img" src="${item.src}" alt="${item.alt}">`
                    } else{
                        htmlTxt += `
                            <img class="col s12 l6 responsive-img" src="${item.src}" alt="${item.alt}">
                        </div>`
                        res.innerHTML+=htmlTxt;
                        htmlTxt='';
                    }
                    if(item.prioridad==3)
                        console.log(item.src+item.alt);
                    fila1=!fila1;
                }
            }
        }
    }
}