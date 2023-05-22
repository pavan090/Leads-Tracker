let myLeads = [];
let inputEl = document.getElementById('input-el');
let inputBtn = document.getElementById('input-btn');
let savedListEl = document.getElementById('saved-list-el');
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
let deleteBtn = document.getElementById('delete-btn');
let tabBtn = document.getElementById('save-tab-btn');

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}



inputBtn.addEventListener('click',function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
})

deleteBtn.addEventListener('dblclick',function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})
// deleteBtn.addEventListener('click',function(){
//     alert('Double click on DELETE ALL to delete the saved links.');
// })

tabBtn.addEventListener('click',function(){

    chrome.tabs.query({active : true , currentWindow : true},function(tabs){
        myLeads.push(tabs[0]['url']);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
    })
})

function render(leads){
    // const li = document.createElement("li");
    // li.textContent = myLeads[myLeads.length  - 1];
    // savedListEl.append(li);
    let listItems = "";
    for(let i = 0; i < leads.length ; i++){
        // listItems += "<li> <a target = '_blank' href='" + myLeads[i] + "'>" + myLeads[i] + " </a> </li>";
        listItems += `
            <li> 
                <a target = '_blank' href = '${leads[i]}'> ${leads[i]} </a> 
            </li>
        `
    }
    savedListEl.innerHTML = listItems
}




