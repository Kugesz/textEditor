let jelenlegMegnyitottFile = "";

const filokBetoltese = () => {
    fetch('/allfiles')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("filok");
        data.forEach(element => {
            container.innerHTML += `<li onclick="megnyitas('${element}')">${element}</li>`;
        });
    })
};

const megnyitas = (fileName) => {
    fetch(`/read/${fileName}`)
    .then(response => response.text())
    .then(data => {
        jelenlegMegnyitottFile=fileName;
        const fileContainer = document.getElementById("szovegArea");
        document.getElementById("fileNameH2").innerHTML = fileName;
        fileContainer.textContent = data;
    })
};

const fileMentese = () => {
    const text = document.getElementById("szovegArea").value;

        fetch(`/save/${jelenlegMegnyitottFile}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    });
};

filokBetoltese();