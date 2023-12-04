//loadData push fetch
const loadData = async (id = 1000) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const cards = data.data;
  // console.log(cards);
  displayShowData(cards);
  // sortButton(cards)
};

// category data push fuction
async function getCategoryData() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const categorys = data.data;

  return categorys;
}
// categoroy btn fuction

const categories = async () => {
  const categorys = await getCategoryData();
  categorys.forEach((category) => {
    const btnContainer = document.getElementById("btn-container");
    const div = document.createElement("div");
    div.innerHTML = `
      <button id='${category.category_id}' onclick="btnClick('${category.category_id}')"  class=" bg-slate-300 hover:bg-[#FF1F3D] hover:text-white  p-3 lg:px-7 md:px-7 px-5 rounded-md text-base font-medium">${category.category}</button> 
       `;
    btnContainer.appendChild(div);
     
    // active button
    const firstBtn = document.getElementById(categorys[0].category_id);
    if (firstBtn) {
      firstBtn.classList.add("bg-[#FF1F3D]", "text-white");
      firstBtn.classList.remove("bg-slate-300");
    }
  });
};

// global veriable
const cardContainer = document.getElementById("card-container");
const cardContainer2 = document.getElementById("card-container2");

// Display show Data 
const displayShowData = (cards) => {
  const originalCards = [...cards];
  let isSorted = false;

  cardContainer2.innerHTML = " ";

  document.getElementById("sort-views").addEventListener("click", function () {
    if (isSorted) {
      cards = [...originalCards];

      isSorted = false;
    } else {
      cards.sort(
        (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
      );

      isSorted = true;
    }

    render(cards);
  });

  // drawing page 
  if (cards.length === 0) {
    // console.log(cards);
    cardContainer2.innerHTML = " ";
    cardContainer.innerHTML = "";

    const div = document.createElement("div");
    div.innerHTML = "";
    div.classList.add("lg:mt-16");
    div.classList.add("mt-8");
    div.innerHTML = `
    <div class="m-auto items-center text-center">
      <img src="/photos/Icon.png" alt="" class="m-auto">
      <h2 class="lg:text-4xl text-2xl font-bold ">Oops!! Sorry, There is no <br> content here</h2>
     </div>
    `;
    cardContainer2.appendChild(div);
  } else {
    render(cards);
  }
};

function render(cards) {
  cardContainer.innerHTML = " ";

  // video time calculate
  cards.forEach((card) => {
    const second = Number(`${card.others.posted_date}`);
    let h = Math.floor(second / 3600);
    let m = Math.floor((second % 3600) / 60);
    
    // all data display
    const div = document.createElement("div");
    div.innerHTML = `
            <div class=" bg-base-100  ">
                 <div id="time" class="relative">
                   <img src="${
                     card?.thumbnail
                   }" alt="" class="rounded-lg h-[170px] w-full" />
                   ${
                     second
                       ? `<p id="time-div" class="  absolute bottom-2 p-2 right-2 bg-black text-white text-xs  rounded-md text-center "
                   > ${h}hrs ${m}min ago</p>`
                       : " "
                   }
                 </div>
                 <div class="flex items-start ml-2 gap-3 mt-2 ">
                      <div class="mt-4 ">
                      <img src="${
                        card.authors[0].profile_picture
                      }" alt="" class="rounded-full w-8 h-8">
                      
                      </div>
                  <div class=" p-3 ">
                   <h2 class="card-title text-base font-bold">${card.title}</h2>
                   <div class= "flex items-center gap-2">
                   <p class="text-sm text-gray-600 "> 
                   ${card.authors[0].profile_name} </p>
                   <img src="${
                     card.authors[0].verified ? `/photos/verified.png` : ""
                   }" alt="" class="w-4">
                   </div>
                   
                   <p class="text-sm text-gray-600">${
                     card.others.views
                   } views</p>
                 </div>
                 </div>
                 
               </div>
            `;
    cardContainer.appendChild(div);
  });
}

// sort views & active color
const btnClick = async (id) => {
  const categorys = await getCategoryData();

  categorys.forEach((category) => {
    if (category.category_id == id) {
      const btn = document.getElementById(id);
      btn.classList.remove("bg-slate-300");
      btn.classList.add("bg-[#FF1F3D]", "text-white");
    } else {
      const btn = document.getElementById(category.category_id);
      btn.classList.remove("bg-[#FF1F3D]", "text-white");
      btn.classList.add("bg-slate-300");
    }
  });

  loadData(id);
};
categories();
loadData();
