async function handleresponse2(){
    var xhr = new XMLHttpRequest();
    var url = "/api/booked";
    const response = await fetch(url);
    const jsonData = await response.json();
    console.log(jsonData);
    booked = document.getElementById("bookedtable")
    x = await getplanename(1);
    console.log('hej', x);
    jsonData.forEach(async e => {
        const airplaneName = await getplanename(1);
        console.log(airplaneName);
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createTextNode(e.bookingId));
        tr.appendChild(td);
        td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(e.personnummer));
        tr.appendChild(td2);
        td3 = document.createElement('td');
        planename = e.airplanesId
        td3.appendChild(document.createTextNode(airplaneName));
        tr.appendChild(td3);
        td4 = document.createElement('td');
        td4.appendChild(document.createTextNode(new Date(e.startTime).toDateString()));
        tr.appendChild(td4);
        td5 = document.createElement('td');
        td5.appendChild(document.createTextNode(new Date(e.endTime).toDateString()));
        tr.appendChild(td5);
        booked.appendChild(tr);
    });
}

async function getplanename(id){
    var xhr = new XMLHttpRequest();
    var url = `/api/airplanes/${id}`;
    const response = await fetch(url);
    const jsonData = await response.json();

    for(e of jsonData){
        return e.name
    }
}

handleresponse2();