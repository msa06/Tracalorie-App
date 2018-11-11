// Storage Controller

// Item Controller
  const ItemCtrl = (function(){
    
    //Item Constructor
    const Item = function(id,name,calories){
      this.id = id;
      this.name = name;
      this.calories = calories;
    }

    //Data Structure / State
    const data = {
      items: [
        // {id:0,name:'Steak Dinner', calories:1200},
        // {id:1,name:'Cookies', calories:400},
        // {id:2,name:'Eggs', calories:300},
      ], 
      currentItem: null,
      totalCalories:0
    }

    //Public methods
    return{
      getItems: function(){
        return data.items;
      },
      addItem:function(name,calories){
        let id;
        //Create ID
        if(data.items.length>0){
          id = data.items[data.items.length-1].id + 1;
        }
        else{
          id = 0;
        }

        //Calories to Number
        calories = parseInt(calories);
        //Create a new Item
        newItem = new Item(id,name,calories);
        
        //Add to Item Array
        data.items.push(newItem);

        return newItem;
      },
      logItems:function(){
        return data;
      },
      getTotalCalories:function(){
        let total = 0;
        data.items.forEach(function(item){
          total+=item.calories;
        });
        data.totalCalories = total;
        return data.totalCalories;  
      }
    }

  })();

// UI Controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn:'.add-btn',
    itemNameInput:'#item-name',
    itemCaloriesInput:'#item-calories',
    totalCalories:'.total-calories'
  }

  //Public methods
  return{
    populateItemList: function(items){
      let output="";
      items.forEach(function(item){
          output += `
            <li class="collection-item" id="item-${item.id}">
            <b>${item.name}: </b><em>${item.calories}   Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
            </li>
          `;
      });
      //Insert List Item
      document.querySelector(UISelectors.itemList).innerHTML = output;
    },
    getItemInput:function(){
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem:function(item){
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      //Create li Element
      const li = document.createElement('li');
      //add Class to the li
      li.className = 'collection-item'
      li.id = `item-${item.id}`;
      //add Html
      li.innerHTML =  `
        <b>${item.name}: </b>
        <em>${item.calories}   Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;
      //Insert Item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
      
    },
    clearInputFields:function(){
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList:function(){
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories:function(totalCalories){
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    getSelector: function(){
      return UISelectors;
    }

  }
    
})();

// App Controller
const App = (function(ItemCtrl,UICtrl){

  //Load Event Listners
  const loadEventListners = function(){
    //Get UI Selector
    const UISelectors = UICtrl.getSelector();

    //Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

  }

  //Add Item Submit
  const itemAddSubmit = function(e){
    //Get Form From Ui Controller
    const input = UICtrl.getItemInput();
    //Check for name and calorie Input
    if(input.name !=='' && input.calories !== ''){
      const newItem = ItemCtrl.addItem(input.name,input.calories);
      //Add Item to the UI List
      UICtrl.addListItem(newItem);
      
      //get the total Calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Show total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      //Clear Fields
      UICtrl.clearInputFields();
    }

    e.preventDefault();
  }


  //Public methods
  return{
    init: function(){
      //Fetch items from Data Structure
      const items = ItemCtrl.getItems();
      
      //Check if any Items
      if(items.length === 0){
        UICtrl.hideList();
      }{

      //Populate List with items
        UICtrl.populateItemList(items);
      }

      //Populate List with items
      UICtrl.populateItemList(items);

      //LoadEvent Listner
      loadEventListners();

    }
  }
    
})(ItemCtrl,UICtrl);

//App Init
App.init();