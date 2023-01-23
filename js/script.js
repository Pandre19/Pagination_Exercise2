const number_users = 39;
const contact_list = document.querySelector(".contact-list");
const total_count = document.querySelector(".page-header h3");
const pagination_list = document.querySelector(".pagination ul");
let last_page = 1;

async function fetch_function() {
  let aux_data = await fetch(
    `https://randomuser.me/api/?results=${number_users}`
  );
  let data = await aux_data.json();
  return data.results;
}

function set_users(array) {
  var component_array = "";
  for (let user of array) {
    component_array += `<li class="contact-item cf">
        <div class="contact-details">
            <img class="avatar" src="${user.picture.large}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <span class="email">${user.email}</span>
        </div>
        <div class="joined-details">
                <span class="date">Joined ${new Date(user.registered.date).toLocaleDateString()}</span>
        </div>
    </li>`;
  }
  contact_list.innerHTML = component_array;
}

function pagination(data) {
    let number_pages = Math.ceil(data.length / 10);
    let item = "";
    for(let i = 0; i < number_pages; i++) {
        if(i == 0){
            item += `<li><a class="active" href="#">${i+1}</a></li>`;
        } else {
            item += `<li><a href="#">${i+1}</a></li>`;
        }
        
    }
    pagination_list.innerHTML = item;
    const links_list = document.querySelectorAll(".pagination li a");
    links_list.forEach((item) => {
        item.addEventListener('click', (e) => {
            let number_page = Math.floor(item.innerHTML);
            if(number_page == last_page) {
                e.preventDefault();
            } else {
                let lower_point = (number_page * 10) - 10;
                let upper_point = (number_page * 10);
                set_users(data.slice(lower_point, upper_point));
                change_page(item, links_list[last_page - 1]);
                last_page = number_page;
            }
            
        })
    })
}

function change_page(current_item, last_item) {
    current_item.classList.add('active');
    last_item.classList.remove('active');
}

async function main() {
  let users = await fetch_function();
  total_count.innerHTML = `Total: ${users.length}`;
  set_users(users.slice(0,10));
  pagination(users);
}

main();