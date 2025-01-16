let vehicleList = [];
let tireDataList = [];
let serviceList = [];
let currentVehicle = null;

function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.add('active');
}

function saveVehicle() {
    const plate = document.getElementById('vehicle-plate').value.trim();
    if (plate) {
        vehicleList.push(plate);
        alert('Veículo salvo!'); // Mensagem ajustada para "Veículo salvo!"
        document.getElementById('vehicle-plate').value = '';
        updateVehicleList();
        navigateTo('menu-screen');
    } else {
        alert('Digite a placa do veículo.');
    }
}


function removeVehicle(index) {
    const vehicleToRemove = vehicleList[index]; // Identifica o veiculo a ser removido
    vehicleList.splice(index, 1); // Remove o veiculo da lista de veiculos

    // Remove todos os servicos associados ao veiculo
    serviceList = serviceList.filter(service => service.vehicle !== vehicleToRemove);

    updateVehicleList(); // Atualiza a lista de veiculos
    updateHistory(); // Atualiza o historico de servicos
}


function updateVehicleList() {
    const vehicleListContainer = document.getElementById('vehicle-list');
    vehicleListContainer.innerHTML = '';
    vehicleList.forEach((vehicle, index) => {
        const vehicleContainer = document.createElement('div');
        vehicleContainer.style.display = 'flex';
        vehicleContainer.style.justifyContent = 'space-between';
        vehicleContainer.style.alignItems = 'center';
        vehicleContainer.style.width = '80%';
        vehicleContainer.style.marginBottom = '10px';

        const button = document.createElement('button');
        button.textContent = vehicle;
        button.style.flex = '1';
        button.onclick = () => {
            currentVehicle = vehicle;
            navigateTo('tire-data-screen');
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.style.marginLeft = '10px';
        removeButton.style.backgroundColor = '#ff4d4d';
        removeButton.style.color = 'white';
        removeButton.style.border = 'none';
        removeButton.style.borderRadius = '5px';
        removeButton.style.padding = '5px 10px';
        removeButton.style.cursor = 'pointer';
        removeButton.onclick = () => removeVehicle(index);

        vehicleContainer.appendChild(button);
        vehicleContainer.appendChild(removeButton);
        vehicleListContainer.appendChild(vehicleContainer);
    });
}

function saveTireData() {
    const number = document.getElementById('tire-number').value.trim();
    const pressure = document.getElementById('last-pressure').value.trim();
    const position = document.getElementById('tire-position').value.trim();
    if (number && pressure && position) {
        tireDataList.push({ vehicle: currentVehicle, number, pressure, position });
        alert('Dados dos pneus salvos!');
        document.getElementById('tire-number').value = '';
        document.getElementById('last-pressure').value = '';
        document.getElementById('tire-position').value = '';
        navigateTo('service-screen');
    } else {
        alert('Preencha todos os campos.');
    }
}

function saveService() {
    const pressure = document.getElementById('service-pressure').value.trim();
    const depth = document.getElementById('service-depth').value.trim();
    const movement = document.getElementById('service-movement').value;
    if (pressure && depth && movement) {
        serviceList.push({ vehicle: currentVehicle, pressure, depth, movement });
        alert('Serviço registrado!');
        document.getElementById('service-pressure').value = '';
        document.getElementById('service-depth').value = '';
        document.getElementById('service-movement').value = 'Rodízio';
        updateHistory();
        navigateTo('menu-screen');
    } else {
        alert('Preencha todos os campos.');
    }
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    serviceList.forEach((service, index) => {
        const item = document.createElement('div');
        item.textContent = `Veículo: ${service.vehicle} | Pressão: ${service.pressure} | Sulco: ${service.depth} | Movimento: ${service.movement}`;
        historyList.appendChild(item);
    });
}

