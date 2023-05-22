// const t = document.getElementById('test');

// async function testFunction(){
//     document.getElementById("knapp").addEventListener('click',(e)=> {console.log('hej');});
//     const response = await fetch("/api/test");
//     const jsonData = await response.json();

//     t.textContent = jsonData.msg;
// }

document.getElementById("knapp").addEventListener('click', () => {
    var xhr = new XMLHttpRequest();
    var url = "/api/book";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    var data = JSON.stringify({
    "personnummer": document.getElementById("uid").value,
    "airplanesId": document.getElementById("planes").value,
    "startTime": document.getElementById("starttime").value,
    "endTime": document.getElementById("endtime").value });
    xhr.send(data);
});

async function updateSelect(){
    var url = "/api/airplanes";
    const response = await fetch(url);
    const jsonData = await response.json();
    select = document.getElementById("planes");
    for(e of jsonData.airplanes){
        newer = document.createElement('option');
        newer.appendChild(document.createTextNode(e.name));
        newer.value = e.id;
        select.appendChild(newer);
    }
}

// updateSelect();