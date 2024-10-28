import { toDoList, renderListHTML, data, savetoStorage, generateObject,moveItems } from "../data/list.js";



function renderHTML() {
  generateObject();
  renderListHTML();


  const btn = document.querySelector(".js-add-item");
  btn.addEventListener('click', () => {
    const input = document.querySelector('.js-input');
    if (input.value.split(' ').join('')) {
      data.push(
        {
          id: crypto.randomUUID(),
          content: input.value,
          checked: false
        }
      )
      savetoStorage();
      renderListHTML();

    }
    input.value = '';
  });
}
renderHTML();

document.querySelector('#toggle').addEventListener('click',function(){
  console.log(this.checked);
  if(this.checked){
    moveItems();
    renderHTML();
  }
  
})




