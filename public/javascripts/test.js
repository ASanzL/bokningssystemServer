const t = document.getElementById('test');

async function testFunction(){
    const response = await fetch("/api/test");
    const jsonData = await response.json();

    t.textContent = jsonData.msg;
}

testFunction();