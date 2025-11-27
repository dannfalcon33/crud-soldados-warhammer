// Funcionalidad del modal
const modal = document.getElementById("soldierModal");
const addSoldierBtn = document.getElementById("addSoldierBtn");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveSoldierBtn = document.getElementById("saveSoldierBtn");

// Funciones del modal confirmar eliminar
const deleteModal = document.getElementById("deleteModal");
const closeDeleteModal = document.getElementById("closeDeleteModal");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

//Datos de formulario
const fullname = document.getElementById("fullname");
const facction = document.getElementById("facction");
const classSoldier = document.getElementById("classSoldier");
const rankSoldier = document.getElementById("rankSoldier");
const division = document.getElementById("division");
const statusSoldier = document.getElementById("status");

const soldiersList = [] || JSON.parse(localStorage.getItem("soldiersList"));

addSoldierBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

cancelBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

closeDeleteModal.addEventListener("click", () => {
  deleteModal.classList.remove("active");
});

cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.remove("active");
});

saveSoldierBtn.addEventListener("click", () => {
  if (
    fullname.value !== "" &&
    facction.value !== "" &&
    classSoldier.value !== "" &&
    rankSoldier.value !== "" &&
    division.value !== "" &&
    statusSoldier.value !== ""
  ) {
    soldiersList.push({
      fullname: fullname.value,
      facction: facction.value,
      classSoldier: classSoldier.value,
      rankSoldier: rankSoldier.value,
      division: division.value,
      statusSoldier: statusSoldier.value,
    });
    renderSoldiers();
    document.getElementById("soldierForm").reset();
  } else {
    document.getElementById("soldierForm").reset();
  }
  modal.classList.remove("active");
});

function renderSoldiers(data = soldiersList) {
  const soldiersContainer = document.getElementById("soldiersContainer");
  soldiersContainer.innerHTML = "";

  soldiersList.forEach((soldier, index) => {
    const soldierElement = document.createElement("tr");
    soldierElement.innerHTML = `
      <td>${soldier.fullname}</td>
      <td>${soldier.facction}</td>
      <td>${soldier.classSoldier}</td>
      <td>${soldier.rankSoldier}</td>
      <td>${soldier.division}</td>
      <td><span class="status-badge status-${soldier.statusSoldier}">${soldier.statusSoldier}</span></td>
      <td>
      <div class="action-buttons">
              <button class="btn btn-icon btn-danger" onclick="deleteData(${index})">
          <i class="fas fa-trash"></i>
        </button>
        <button class="btn btn-icon btn-warning" onclick="editData(${index})">
          <i class="fas fa-edit"></i>
        </button>
      </div>
      </td>
    `;
    soldiersContainer.appendChild(soldierElement);
  });

  countSoldiers(soldiersList);
  countImperialSoldiers(soldiersList);
  countAdeptusAstares(soldiersList);
}

function deleteData(index) {
  deleteModal.classList.add("active");
  confirmDeleteBtn.onclick = () => {
    soldiersList.splice(index, 1);
    renderSoldiers();
    deleteModal.classList.remove("active");
    confirmDeleteBtn.onclick = null;
  };
}

function editData(index) {
  const soldier = soldiersList[index];
  fullname.value = soldier.fullname;
  facction.value = soldier.facction;
  classSoldier.value = soldier.classSoldier;
  rankSoldier.value = soldier.rankSoldier;
  division.value = soldier.division;
  statusSoldier.value = soldier.statusSoldier;

  soldiersList.splice(index, 1);
  modal.classList.add("active");
}

function countSoldiers(soldiersList) {
  const countSoldiers = document.getElementById("countSoldiers");
  countSoldiers.innerHTML = "";
  const countStar = document.createElement("span");
  countStar.classList.add("count-star");
  countStar.innerHTML = soldiersList.length;
  countSoldiers.appendChild(countStar);
}

function countImperialSoldiers(soldiersList) {
  const countImperialSoldiers = document.getElementById(
    "countImperialSoldiers"
  );
  countImperialSoldiers.innerHTML = "";
  const countStar = document.createElement("span");
  countStar.classList.add("count-star");
  countStar.innerHTML = soldiersList.filter(
    (soldier) => soldier.facction === "Guardia Imperial"
  ).length;
  countImperialSoldiers.appendChild(countStar);
}

function countAdeptusAstares(soldiersList) {
  const countAdeptusAstares = document.getElementById("countAdeptusAstares");
  countAdeptusAstares.innerHTML = "";
  const countStar = document.createElement("span");
  countStar.classList.add("count-star");
  countStar.innerHTML = soldiersList.filter(
    (soldier) => soldier.facction === "Adeptus Astartes"
  ).length;
  countAdeptusAstares.appendChild(countStar);
}

// Cerrar modal al hacer clic fuera de él
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
