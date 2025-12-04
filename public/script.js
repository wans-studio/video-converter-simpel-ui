async function convertVideo() {
    const file = document.getElementById("videoFile").files[0];
    const format = document.getElementById("format").value;
    const status = document.getElementById("status");
    const downloadLink = document.getElementById("downloadLink");

    if (!file) {
        status.innerText = "Please select a video!";
        return;
    }

    status.innerText = "Uploading & Converting...";

    let formData = new FormData();
    formData.append("video", file);
    formData.append("format", format);

    const res = await fetch("/convert", {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (data.status === "ok") {
        status.innerText = "Done!";
        downloadLink.href = data.url;
        downloadLink.style.display = "block";
        downloadLink.innerText = "Download " + data.output;
    } else {
        status.innerText = "Error converting video!";
    }
}
