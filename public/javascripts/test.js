// const t = document.getElementById('test');

// async function testFunction(){
//     document.getElementById("knapp").addEventListener('click',(e)=> {console.log('hej');});
//     const response = await fetch("/api/test");
//     const jsonData = await response.json();

//     t.textContent = jsonData.msg;
// }

document.getElementById("knapp").addEventListener('click', onclick);
function makeRequest(){
    var xhr = new XMLHttpRequest();
    var url = "/api/book";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({ "personnummer": document.getElementById("uid").value, "airplanesId": document.getElementById("planes").value, "startTime": document.getElementById("starttime").value, "endTime": document.getElementById("endtime").value });
    console.log(data)
    xhr.send(data);


}

async function handleResponse(){
    var xhr = new XMLHttpRequest();
    var url = "/api/airplanes";
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    select = document.getElementById("planes");
    for(e of jsonData.airplanes){
        console.log(e);
        newer = document.createElement('option');
        newer.appendChild(document.createTextNode(e.name));
        newer.value = e.id;
        select.appendChild(newer);
    }
}


function onclick(){
    makeRequest();
    console.log('at least the button work');
    
}

handleResponse();