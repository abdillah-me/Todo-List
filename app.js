const baseURL = "https://jsonplaceholder.typicode.com/todos/";
const todoListBase = document.getElementById("todoList");
let cardTodoList = [];
const searchbar = document.querySelector(".searchbar");

async function loadDataTodo() {
   try {
      const response = await fetch(baseURL);
      cardTodoList = await response.json();
      displayDataTodo(cardTodoList);
   } catch (error) {
      console.error(error);
   }
}
loadDataTodo();

// searchbar
searchbar.addEventListener("keyup", (e) => {
   const searchByString = e.target.value.toLowerCase();
   const filterTodo = cardTodoList.filter((todo) => {
      return todo.title.toLowerCase().includes(searchByString);
   });
   displayDataTodo(filterTodo);
});

let viewPerPage = 10;
let curentPage = 1;

document.querySelector(".form-select").addEventListener("change", (e) => {
   viewPerPage = e.target.value;
   loadDataTodo();
});

const displayDataTodo = (todoList) => {
   const htmlString = todoList
      .filter((data, index) => {
         let start = (curentPage - 1) * viewPerPage;
         let end = curentPage * viewPerPage;
         if (index >= start && index < end) return true;
      })
      .map((todoList) => {
         return `
         <div class="col-sm-12 col-md-6 mb-3 h-100">
            <div class="card text-center">
               <div class="card-body">
                  <p class="card-text fw-bold text-capitalize">${todoList.title}</p>
                  <p class="status fw-bold text-capitalize">
                  ${
                     todoList.completed
                        ? `<span style="color:green">complete</span>`
                        : `<span style="color:red">not complete</span>`
                  }</p>
                  <a href="#" class="link-primary">Details</a>
               </div>
            </div>
         </div>
         `;
      })
      .join("");
   todoListBase.innerHTML = htmlString;
};

// pagination
document.querySelector(".previous").addEventListener("click", previous, false);
document.querySelector(".next").addEventListener("click", next, false);

function previous() {
   if (curentPage > 1) {
      curentPage--;
      loadDataTodo();
   }
   indicator();
}
function next() {
   if (curentPage * viewPerPage < cardTodoList.length) {
      curentPage++;
      loadDataTodo();
   }
   indicator();
}

function indicator() {
   const indicator = document.querySelector(".indicator");
   indicator.innerHTML = curentPage;
}
