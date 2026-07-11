/* ==================================
   MINI CRM (Connected to MongoDB)
================================== */

const leadForm = document.getElementById("leadForm");
const leadTableBody = document.getElementById("leadTableBody");
const emptyState = document.getElementById("emptyState");

const searchLead = document.getElementById("searchLead");
const statusFilter = document.getElementById("statusFilter");

// Aapke backend ka URL
const API_URL = "http://localhost:5000/api/leads";

let leads = [];
let editId = null; // MongoDB ID track karne ke liye

/* ====================================
   WE HAVE FETCH DATA FROM BACKEND
====================================== */
async function fetchLeads() {
    try {
        const response = await fetch(`${API_URL}/all`);
        leads = await response.json();
        filterLeads();
        updateDashboard();
    } catch (error) {
        console.error("Error fetching leads from the server:", error);
    }
}

/* ===========================
   NOTIFICATION
=========================== */
function showMessage(message){
    alert(message);
}

/* ===========================
   DISPLAY LEADS IN TABLE
=========================== */
function displayLeads(filteredLeads = leads){
    leadTableBody.innerHTML = "";

    if(filteredLeads.length === 0){
        emptyState.style.display = "block";
    }else{
        emptyState.style.display = "none";
    }

    filteredLeads.forEach((lead)=>{
        leadTableBody.innerHTML += `
        <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
            <td>${lead.source}</td>
            <td>
                <span class="status ${lead.status.toLowerCase()}">
                    ${lead.status}
                </span>
            </td>
            <td>${lead.notes}</td>
            <td>
                <button class="edit-btn" onclick="editLead('${lead._id}')">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="delete-row-btn" onclick="deleteLead('${lead._id}')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });
}

/* ===========================
   DASHBOARD STATS
=========================== */
function updateDashboard(){
    document.getElementById("totalLeads").textContent = leads.length;
    document.getElementById("newLeads").textContent = 
        leads.filter(lead => lead.status === "New").length;
    document.getElementById("contactedLeads").textContent = 
        leads.filter(lead => lead.status === "Contacted").length;
    document.getElementById("convertedLeads").textContent = 
        leads.filter(lead => lead.status === "Converted" || lead.status === "Qualified").length;
    document.getElementById("recordCount").textContent = leads.length;
    document.getElementById("lastUpdated").textContent = new Date().toLocaleString();
}

/* ===========================
   ADD YA UPDATE LEAD (MONGODB)
=========================== */
leadForm.addEventListener("submit", async function(e){
    e.preventDefault();

    const leadData = {
        name: document.getElementById("clientName").value,
        email: document.getElementById("clientEmail").value,
        phone: document.getElementById("clientPhone").value,
        source: document.getElementById("leadSource").value,
        status: document.getElementById("leadStatus").value,
        notes: document.getElementById("leadNotes").value
    };

    try {
        if(editId === null){
            // Naya lead add karne ke liye
            const response = await fetch(`${API_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadData)
            });
            const result = await response.json();
            if(result.success) showMessage("Lead added successfully!");
        } else {
            // Lead update karne ke liye
            const response = await fetch(`${API_URL}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(leadData)
            });
            const result = await response.json();
            if(result.success) {
                showMessage("Lead updated successfully!");
                editId = null;
                document.querySelector(".add-btn").innerHTML = `<i class="fa-solid fa-plus"></i> Add Lead`;
            }
        }

        leadForm.reset();
        await fetchLeads(); // Database se naya data load karein
    } catch (error) {
        console.error("Error saving lead:", error);
    }
});

/* ===========================
   SEARCH & FILTER
=========================== */
function filterLeads(){
    const searchText = searchLead.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filtered = leads.filter(lead=>{
        const matchesSearch = 
            lead.name.toLowerCase().includes(searchText) || 
            lead.email.toLowerCase().includes(searchText);

        const matchesStatus = 
            selectedStatus === "All" || 
            lead.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    displayLeads(filtered);
}

searchLead.addEventListener("input", filterLeads);
statusFilter.addEventListener("change", filterLeads);

/* ===========================
   DELETE LEAD
=========================== */
async function deleteLead(id){

    if(confirm("Are you sure you want to delete this lead?")){

        try {

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            const result = await response.json();

            if(result.success){

                showMessage("Lead deleted successfully!");

                fetchLeads();

            }

        } catch (error) {

            console.error("Error deleting lead:", error);

        }

    }

}

/* ===========================
   EDIT LEAD BUTTON CLICK
=========================== */
function editLead(id){
    const lead = leads.find(l => l._id === id);
    if(!lead) return;

    document.getElementById("clientName").value = lead.name;
    document.getElementById("clientEmail").value = lead.email;
    document.getElementById("clientPhone").value = lead.phone;
    document.getElementById("leadSource").value = lead.source;
    document.getElementById("leadStatus").value = lead.status;
    document.getElementById("leadNotes").value = lead.notes;

    editId = id;

    document.querySelector(".add-btn").innerHTML = `<i class="fa-solid fa-floppy-disk"></i> Update Lead`;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===========================
   REFRESH
=========================== */
const refreshBtn = document.getElementById("refreshBtn");
refreshBtn.addEventListener("click", function(){
    searchLead.value = "";
    statusFilter.value = "All";
    fetchLeads();
});

/* ===========================
   EXPORT TO CSV
=========================== */
const exportBtn = document.getElementById("exportBtn");
exportBtn.addEventListener("click", function(){
    if(leads.length === 0){
        alert("No leads available to export.");
        return;
    }

    let csv = "Name,Email,Phone,Source,Status,Notes\n";
    leads.forEach((lead)=>{
        csv += `"${lead.name}","${lead.email}","${lead.phone}","${lead.source}","${lead.status}","${lead.notes}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Client_Leads.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

 /* ===========================
       DELETE ALL LEADS
 =========================== */

const deleteAllBtn = document.getElementById("deleteAllBtn");

deleteAllBtn.addEventListener("click", async () => {

    // Ask for confirmation before deleting all leads
    const confirmDelete = confirm("Are you sure you want to delete all leads?");

    if (confirmDelete) {

        try {

            const response = await fetch("http://localhost:5000/api/leads/delete-all", {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {

                alert("All leads have been deleted successfully!");

                location.reload();

            } else {

                alert("Something went wrong: " + data.message);

            }

        } catch (error) {

            console.error("Error:", error);

            alert("Unable to connect to the server.");

        }

    }

});

/* ===========================
   INITIAL LOAD
=========================== */
fetchLeads();

