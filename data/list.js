export let data = JSON.parse(localStorage.getItem('data'));

if (!data) {
  data = [
    {
      id: 1,
      content: 'Attend Meeting',
      checked: false
    },
    {
      id: 2,
      content: 'Do homework',
      checked: false
    }
  ]
}

const moveItemsToLast=document.querySelector('#toggle');
console.log(moveItemsToLast.checked);
export function addCheckedEvent(){
  document.querySelectorAll('.js-check-box').forEach((box)=>{
    box.addEventListener('change',function(){
        
        const id=this.dataset.inputItemId;
        data.forEach((item)=>{
          if(item.id==id){
            if(item.checked===false){
              item.checked=true;
              
            }
            else{
              item.checked=false;
            }
            if(moveItemsToLast.checked){
              moveItems();
            }
          }
        })

        savetoStorage();
        generateObject();
        renderListHTML();
        
      })

  })
}


export function savetoStorage() {
  localStorage.setItem('data', JSON.stringify(data));
  generateObject();
}

class Todo {
  id;
  content;
  checked;
  constructor(details) {
    this.id = details.id;
    this.content = details.content;
    this.checked = details.checked;
  }
}

export let toDoList;

export function generateObject() {
  toDoList = data.map((subset) => {
    return new Todo(subset);
  })
}


export function renderListHTML() {
  let listHTML = ``;
  toDoList.forEach((item) => {
    listHTML += `

     <li class="js-list-container-${item.id} flex justify-between bg-[#FF7676] py-4 px-4 rounded-xl 2xl:px-10">
          <div class="pr-6"><h3 class="text-xl text-white text-wrap text-justify">${item.content}</h3></div>
          <div class="flex items-center gap-4">
            <input id="default-checkbox" type="checkbox"  ${item.checked ? 'checked' : ''} class="js-check-box w-5 h-5 rounded" data-input-item-id="${item.id}" />
            <button class="js-delete-btn" data-list-id=${item.id}>
              <i data-feather="trash-2" class="text-white hover:text-fuchsia-200 transition duration-150 ease-in-out"></i>
            </button>
          </div>
      </li>

    `
  })
  document.querySelector('.js-itemContainer').innerHTML = listHTML;
  addCheckedEvent();
  addDeleteEvent();
  feather.replace();
}

export function addDeleteEvent() {
  document.querySelectorAll('.js-delete-btn').forEach((button) => {
      button.addEventListener('click', () => {
      const buttonId = button.dataset.listId;
      document.querySelector(`.js-list-container-${buttonId}`).remove();
      removeItem(buttonId);
    })
  })
}

export function removeItem(buttonId) {
  data = data.filter((listItem) => {
    return listItem.id != buttonId;
  })
  savetoStorage();
}



export function moveItems(){
  let temp1=[];
  let temp2=[];
  data.forEach((item)=>{
    if(item.checked){
      temp1.push(item);
    }
    else{
      temp2.push(item);
    }
  })

  data=temp2.concat(temp1);
  savetoStorage();
}

