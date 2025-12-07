const form = document.getElementById("requestForm");
const list = document.getElementById("requestList");

let requests = JSON.parse(localStorage.getItem("requests")) || [];

// Load existing requests on page load
loadRequests();

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const studentId = document.getElementById("studentId").value;
  const documentType = document.getElementById("document").value;
  const purpose = document.getElementById("purpose").value;

  const today = new Date();
  const receivingDate = new Date();
  receivingDate.setDate(today.getDate() + 3);

  const request = {
    name,
    studentId,
    documentType,
    purpose,
    status: "Pending",
    receivingDate: receivingDate.toISOString().split("T")[0],
    releaseDate: ""
  };

  requests.push(request);
  localStorage.setItem("requests", JSON.stringify(requests));

  form.reset();
  loadRequests();
});

function loadRequests() {
  list.innerHTML = "";
  requests.forEach(req => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${req.name}</strong> (${req.studentId})<br>
      Document: ${req.documentType}<br>
      Purpose: ${req.purpose}<br>
      Status: <strong>${req.status}</strong><br>
      Receiving Date: ${req.receivingDate}<br>
      Release Date: ${req.releaseDate || "To be set"}
    `;
    list.appendChild(li);
  });
}
