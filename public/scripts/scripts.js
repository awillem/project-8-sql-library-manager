//variable declarations
const pageHeader = document.getElementById('pageHeader');
const body = document.getElementsByTagName('body');
const bookBody = document.getElementsByTagName('tbody');
const bookTr = bookBody[0].children;
const bookList = [];
for ( let i = 0; i < bookTr.length; i ++ ) {
    bookList.push(bookTr[i]);
}



createPag(pagCount());
const pagDiv = document.querySelector('.pagination');
const pagUl = pagDiv.children;
const pagLi = pagUl[0].children;
console.log('pagination pages ' + pagLi.length);

//Attach Search Feature
const searchDiv = createElement('div');
searchDiv.className = 'book-search';
const searchInput = createElement('input');
searchInput.type = 'text';
searchInput.placeholder = "Search for books...";
const searchButton = createElement('button');
searchButton.textContent = "Search";

pageHeader.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

//create no response message, but set display to None.  To be used in search event function
const message = createElement('h3');
message.textContent = 'No Results Found';
pagDiv.appendChild(message);
message.style.display = "none";


//Helper Functions

function createElement(element) {
    return document.createElement(element);
}


/* PAGINATION */

function pagCount() {
    let count = bookList.length;
    // for (let i = 0; i < bookList.length; i += 1){
    //   count += 1;
    // }
    // console.log(count);
    // console.log(bookList.length);
    // return count;
    // count = Math.ceil(count / 10);
    return count;
}

function createPag(count) {
    count = Math.ceil(count/10);
    if (count > 1) {
        const pagDiv = createElement('div');
        pagDiv.className = "pagination";
        body[0].appendChild(pagDiv);
        const ul = createElement('ul');    
        for (let i = 1; i <= count; i++) {
       const li = createElement('li');
       const a = createElement('a');
       a.href = '#';
       a.textContent = i;
       if(i === 1) {
           a.className = "active"
       }
       li.appendChild(a);
       ul.appendChild(li);
    }    
        pagDiv.appendChild(ul);
        setPag();
    }
}


function setPag () {
    const pagDiv = document.querySelector('.pagination');
    const pagUl = pagDiv.children;
    const pagLi = pagUl[0].children;
    for (let i = 0; i < pagLi.length; i+=1) {
      const link = pagLi[i].firstChild;
      if(link.className === 'active') {
        const active = parseInt(pagLi[i].firstChild.textContent);
        const activeUpper = (active * 10) - 1;
        const activeLower = activeUpper - 9;
        for (let j = 0; j < bookList.length; j += 1) {
          if (j >= activeLower && j <= activeUpper) {
            bookList[j].style.display = 'table-row';
          } else {
             bookList[j].style.display = "none";
          }
        }
      }
    }
  }


/* SEARCH */

function search (e,typeInCaps) {
    if (e.target.tagName === typeInCaps) {
      const searchValue = searchInput.value.toLowerCase();
      console.log(searchValue);
      for (let i = 0; i < bookList.length; i +=1) {
        bookList[i].style.display = 'none';
      }
      bookList.length = 0;
      for (let i = 0; i < pagLi.length; i += 1) {
          pagLi[i].style.display = 'inline';
          pagLi[i].firstChild.className = "";
        }
        pagLi[0].firstChild.className = "active";
  
        message.style.display = 'none';
  
      if (searchValue !== '') {
        for (let j = 0; j < bookTr.length; j ++ ) {
            const bookTd = bookTr[j].children;
            const bookName = bookTd[0].firstChild.textContent.toLowerCase();
            const authorName = bookTd[1].textContent.toLowerCase();
            const genre = bookTd[2].textContent.toLowerCase();
            const year = bookTd[3].textContent.toLowerCase();
            if (bookName.includes(searchValue) || authorName.includes(searchValue) || genre.includes(searchValue) || year.includes(searchValue)) {
                bookList.push(bookTr[j]);
          }
        }
        let counter = pagCount();
        if (counter === 0) {
          message.style.display = "block";
        }
        counter = Math.ceil(counter/10);
        for (let i = 0; i < pagLi.length; i += 1) {
          if (i > (counter - 1)){
          pagLi[i].style.display = 'none';
          }
        }
      } else {
         for (let i = 0; i < bookTr.length; i += 1) {
           bookList.push(bookTr[i]);
  
         }
      } //closes else
    } // closes if button
    setPag();
  }


/* EVENT HANDLERS */

//Listens for clicks on pagination links
pagUl[0].addEventListener('click', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === "LI") {
      for (let i = 0; i < pagLi.length; i += 1) {
        const link = pagLi[i].firstChild;
        link.className = "";
      }
      e.target.className = "active";
      setPag();
    }
  });

  //Listens for search button
  searchDiv.addEventListener('click', (e) => {
    search(e, 'BUTTON');
  });

 // Listens for any typing in the search input
  searchDiv.addEventListener('keyup', (e) => {
    search(e, 'INPUT');
  });