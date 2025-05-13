let jobData = JSON.parse(localStorage.getItem('jobs')) || [];
let editingIndex = null;

function renderTable() {
  const tbody = document.querySelector('#jobTable tbody');
  tbody.innerHTML = '';

  jobData.forEach((job, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td class="clickable" onclick="viewDetail(${index})">${job.description}</td>
      <td>${job.startDate}</td>
      <td>${job.endDate}</td>
      <td class="status ${job.status.replace(" ", "")}">${job.status}</td>
      <td class="edit-delete-btn>
        <button class="edit-btn" onclick="editJob(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteJob(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  localStorage.setItem('jobs', JSON.stringify(jobData));
}

function openForm() {
  document.getElementById('jobForm').style.display = 'flex';
  document.getElementById('formTitle').innerText = 'Add Job';
  document.getElementById('jobInputForm').reset();
  editingIndex = null;
}

function closeForm() {
  document.getElementById('jobForm').style.display = 'none';
}

function editJob(index) {
  const job = jobData[index];
  document.getElementById('description').value = job.description;
  document.getElementById('startDate').value = job.startDate;
  document.getElementById('endDate').value = job.endDate;
  document.getElementById('status').value = job.status;
  editingIndex = index;
  document.getElementById('formTitle').innerText = 'Edit Job';
  document.getElementById('jobForm').style.display = 'flex';
}

function deleteJob(index) {
  if (confirm('Are you sure you want to delete this job?')) {
    jobData.splice(index, 1);
    renderTable();
  }
}

document.getElementById('jobInputForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const job = {
    description: document.getElementById('description').value,
    startDate: document.getElementById('startDate').value,
    endDate: document.getElementById('endDate').value,
    status: document.getElementById('status').value
  };

  if (editingIndex !== null) {
    jobData[editingIndex] = job;
  } else {
    jobData.push(job);
  }

  closeForm();
  renderTable();
});

function viewDetail(index) {
  const job = jobData[index];
  document.getElementById('detailContent').innerText = `
Description: ${job.description}
Start Date: ${job.startDate}
End Date: ${job.endDate}
Status: ${job.status}
  `;
  document.getElementById('jobDetails').style.display = 'flex';
}

function closeDetails() {
  document.getElementById('jobDetails').style.display = 'none';
}

window.onload = renderTable;
