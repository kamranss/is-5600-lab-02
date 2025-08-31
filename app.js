/* add your code here */

document.addEventListener('DOMContentLoaded', function () {
 
  var users = JSON.parse(userContent);
  var stocks = JSON.parse(stockContent);

 
  var userList = document.querySelector('.user-list');
  var portfolioBox = document.querySelector('.portfolio-list');

  var stocName = document.querySelector('#stockName');
  var stocSector = document.querySelector('#stockSector');
  var stockIndustry = document.querySelector('#stockIndustry');
  var stockAddress = document.querySelector('#stockAddress');
  var stockLogo = document.querySelector('#logo');

  var userID = document.querySelector('#userID');
  var name = document.querySelector('#firstname');
  var last = document.querySelector('#lastname');
  var address = document.querySelector('#address');
  var city = document.querySelector('#city');
  var email = document.querySelector('#email');

  var buttonSave = document.querySelector('#btnSave');
  var buttonDelete = document.querySelector('#btnDelete');

  
  function showUsers(list) {
    userList.innerHTML = ''; 
    for (var i = 0; i < list.length; i++) {
      var li = document.createElement('li');
      li.id = list[i].id; 
      li.textContent = list[i].user.lastname + ', ' + list[i].user.firstname;
      userList.appendChild(li);
    }
  }


  function fillForm(u) {
    userID.value = u.id;
    name.value = u.user.firstname;
    last.value = u.user.lastname;
    address.value = u.user.address;
    city.value = u.user.city;
    email.value = u.user.email;
  }

  
  function clearStockBox() {
    stocName.textContent = '';
    stocSector.textContent = '';
    stockIndustry.textContent = '';
    stockAddress.textContent = '';
    stockLogo.removeAttribute('src');
  }

  
  function showPortfolio(u) {
    portfolioBox.innerHTML = '';


    var h1 = document.createElement('h3'); h1.textContent = 'Symbol';
    var h2 = document.createElement('h3'); h2.textContent = 'Shares';
    var h3 = document.createElement('h3'); h3.textContent = 'Actions';
    portfolioBox.appendChild(h1);
    portfolioBox.appendChild(h2);
    portfolioBox.appendChild(h3);

   
    var items = u.portfolio || [];
    for (var i = 0; i < items.length; i++) {
      var symP = document.createElement('p');
      symP.textContent = items[i].symbol;

      var sharesP = document.createElement('p');
      sharesP.textContent = items[i].owned;

      var btn = document.createElement('button');
      btn.textContent = 'View';
      btn.id = items[i].symbol;

      portfolioBox.appendChild(symP);
      portfolioBox.appendChild(sharesP);
      portfolioBox.appendChild(btn);
    }
  }


  function showStock(symbol) {
    var s = null;
    for (var i = 0; i < stocks.length; i++) {
      if (stocks[i].symbol == symbol) {
        s = stocks[i];
        break;
      }
    }
    if (!s) {
      clearStockBox();
      stocName.textContent = 'Not found';
      return;
    }

    stocName.textContent = s.name || '';
    stocSector.textContent = s.sector || '';
    stockIndustry.textContent = s.subIndustry || '';
    stockAddress.textContent = s.address || '';
    stockLogo.src = 'logos/' + symbol + '.svg';
    stockLogo.alt = (s.name || symbol) + ' logo';
  }

  
  userList.addEventListener('click', function (e) {
    if (e.target.tagName !== 'LI') return;
    var id = e.target.id;

   
    var u = null;
    for (var i = 0; i < users.length; i++) {
      if (String(users[i].id) === String(id)) {
        u = users[i];
        break;
      }
    }
    if (!u) return;

    fillForm(u);
    showPortfolio(u);
    clearStockBox(); 
  });


  portfolioBox.addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') return;
    var symbol = e.target.id;
    showStock(symbol);
  });


  buttonSave.addEventListener('click', function (e) {
    e.preventDefault();
    var id = userID.value;
    if (!id) return;

    for (var i = 0; i < users.length; i++) {
      if (String(users[i].id) === String(id)) {
        users[i].user.firstname = name.value.trim();
        users[i].user.lastname  = last.value.trim();
        users[i].user.address   = address.value.trim();
        users[i].user.city      = city.value.trim();
        users[i].user.email     = email.value.trim();
        break;
      }
    }


    showUsers(users);


    var current = null;
    for (var j = 0; j < users.length; j++) {
      if (String(users[j].id) === String(id)) {
        current = users[j];
        break;
      }
    }
    if (current) {
      fillForm(current);
      showPortfolio(current);
    }
  });


  buttonDelete.addEventListener('click', function (e) {
    e.preventDefault();
    var id = userID.value;
    if (!id) return;

    var index = -1;
    for (var i = 0; i < users.length; i++) {
      if (String(users[i].id) === String(id)) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      users.splice(index, 1);
      showUsers(users);

 
      userID.value = '';
      name.value = '';
      last.value = '';
      address.value = '';
      city.value = '';
      email.value = '';
      portfolioBox.innerHTML = '';
      clearStockBox();
    }
  });


  showUsers(users);

});


