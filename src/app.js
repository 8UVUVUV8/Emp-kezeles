const doc = {
    tbody: null,
    saveB : null

};
const state = {
    dolgozoLista: [],
    host: null
};

window.addEventListener('load', () => {
    init();
    
    
})

function init() {
    state.host = 'http://localhost:8000/'
    doc.tbody = document.querySelector('#tbody');
    doc.saveB = document.querySelector('#savebutton');
    doc.saveB.addEventListener('clcik', () => {
        console.log("mukszik")
    });
    getEmp()    
}

function getEmp(){
    let point = 'employees';
    let url = state.host + point;
    fetch(url)
    .then( response => {
        return response.json()
    } )
    .then(result => {
        console.log(result);
        state.dolgozoLista = result
        render();
    });

}

function deleteEmployee(id) {
    let point = 'employees';
    let url = state.host + point + '/' + id
    fetch(url, {
        method: 'delete'
    })
    .then(res => res.json())
    .then(res =>{
        console.log(res);
        getEmp();
        render();
    })


}

function startdeleteEmployee(event){
    let id = (event.getAttribute('data-id'));
    deleteEmployee(id)
}




function render() {
    let rows = '';
    state.dolgozoLista.forEach( dolgozo => {
        
        rows += `
            <tr>
                <td>${dolgozo.id}</td>
                <td>${dolgozo.name}</td>
                <td>${dolgozo.city}</td>
                <td>${dolgozo.salary}</td>
                <td>
                    <button classs="btn btn-warning"
                    onclick = "startdeleteEmployee(this)"
                    data-id = "${dolgozo.id}"
                    >Törlés</button>
                </td>
            </tr>
        `;

    });
    doc.tbody.innerHTML = rows;
    
}




