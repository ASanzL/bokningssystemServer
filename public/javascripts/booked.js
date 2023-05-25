async function updateTable(){
    var url = "/api/booked";
    const response = await fetch(url);
    const jsonData = await response.json();
    booked = document.getElementById("bookedtable")
    x = await getplanename(1);
    jsonData.forEach(async e => {
        const airplaneName = await getplanename(e.airplanesId);
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
        td4.appendChild(document.createTextNode(new Date(e.day).toDateString()));
        tr.appendChild(td4);
        booked.appendChild(tr);
    });
}

async function getplanename(id){
    var url = `/api/airplanes/${id}`;
    const response = await fetch(url);
    const jsonData = await response.json();

    for(e of jsonData){
        return e.name
    }
}

updateTable();