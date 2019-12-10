    // Your web app's Firebase configuration
  
//   var firebaseConfig = {
//     apiKey: "AIzaSyByjjiLHKp-zbLVCLnHJ0iqOKWSrdCB5qk",
//     authDomain: "tracalorie-ed9cd.firebaseapp.com",
//     databaseURL: "https://tracalorie-ed9cd.firebaseio.com",
//     projectId: "tracalorie-ed9cd",
//     storageBucket: "tracalorie-ed9cd.appspot.com",
//     messagingSenderId: "840176486056",
//     appId: "1:840176486056:web:c9da1571c63962c6f8e49d"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   const firestore = firebase.firestore()

//   const docref = firestore.doc('/Meals/1')


// Data Controller

const DataCtrl = (function() {
    
    // Public Methods
    
    return {

    }

})()

// Item controller 

const ItemCtrl = (function() {
    
    const Item = function(id, meal, calorie) {
        this.id = id
        this.meal = meal
        this.calorie = calorie
    }

    // Data Structure

    var data = {
        items: [
            // {id:1, meal:"Steak", calorie: 500},
            // {id:2, meal:"Fries", calorie: 200},
            // {id:3, meal:"Sandwich", calorie: 300}
        ],
        currentItem: null,
        totalCalorie: 0
    }

    return {

        logItems: function() {
            return data
        },

        addItems: function(name,calorie) {
            
            let ID;

            if(data.items.length > 0) {
                
                // ID = data.items.length + 1
                ID = data.items[data.items.length - 1].id + 1
            
            }
            else {
                ID = 0
            }

            
            calorie = parseInt(calorie)
            NewItem = new Item(ID,name,calorie) 
            data.items.push(NewItem);  
            return NewItem

        },

        getItems: function() {
            return data.items
        },
        GetItemEach: function(id) {
            let found = null
            data.items.forEach(function(item) {
                if(item.id === id) {
                    found = item
                }
            })
            return found
        },

        getCalories: function() {

            let total = 0
            data.items.forEach(function(item) {
                total += item.calorie
            })

            data.totalCalorie = total

            return data.totalCalorie
        },
        setCurrentItem: function(itemfound) {
            data.currentItem = itemfound
        },
        getCurrentItem: function() {
            return data.currentItem
        },
        updateItem: function(meal, calorie) {

            let found = null

            calore = parseInt(calorie)

            data.items.forEach(function(item) {

                if(item.id === data.currentItem.id) {
                    item.meal = meal
                    item.calorie = calorie
                    found = item
                }
                
            })
            return found
        },
        clearAllItems() {
            data.items = []
        },
        deleteItem: function(id) {

            const ids = data.items.map(function(item) {
                return item.id 
            })

            const index = ids.indexOf(id)

            data.items.splice(index, 1)

        }
    }
})()

// UI Controller

const UICtrl = (function() {

    const UISelectors = {
        itemList: ".itemslist",
        listItems: ".itemslist li",
        meal: ".meal",
        calorie: ".calorie",
        addbtn: "#addItem",
        updbtn: "#updItem",
        delbtn: "#delItem",
        backbtn: "#back",
        clearbtn: "#clearAll",
        totalCalories: ".CaloriesTotal",
        ListItem: ".item-collection",
        EditItem: ".Edit"
    }

    // Public Methods

    return {
        populateItems: function(item) {
            
            console.log(item)
            var html = ''

            var itemList = document.querySelector(UISelectors.itemList)

            item.forEach((item) => {
                html += `<li class="item-collection" id="item-${item.id}">
                <span><strong>${item.meal} : </strong><em>${item.calorie} cal</em></span><a href="" class="Edit">🖊️</a></li>`
            })

            itemList.innerHTML = html
        },
        getSelectors: function() {
            return UISelectors
        },
        getItemValues: function() {

            return {
                meal: document.querySelector(UISelectors.meal).value,
                calorie: document.querySelector(UISelectors.calorie).value
            }

        },

        addItemList: function(item) {

            let li = document.createElement('li')

            li.className = "item-collection"

            li.id = `item-${item.id}`;

            li.innerHTML = `<span><strong>${item.meal} : </strong><em>${item.calorie} cal</em></span><a href="" class="Edit">🖊️</a>`

            // insert li to ul

            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)

            // this.clearInput()
        },

        addCalories: function(total) {
            document.querySelector(UISelectors.totalCalories).textContent = total
        },
        addToForm: function() {
            document.querySelector(UISelectors.meal).value = ItemCtrl.getCurrentItem().meal
            document.querySelector(UISelectors.calorie).value = ItemCtrl.getCurrentItem().calorie
        },
        updateListItem: function(item) {
            let listItems = document.querySelectorAll(UISelectors.listItems) 

            listItems = Array.from(listItems)

            listItems.forEach(function(listItem) {

                const itemID = listItem.getAttribute('id')

                if(itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML = `<span><strong>${item.meal} : </strong><em>${item.calorie} cal</em></span><a href="" class="Edit">🖊️</a>
                    `
                }

            })

            console.log(listItems)
        },
        deleteListItem: function(id) {

            var listitem = `#item-${id}` // Getting id
            document.querySelector(listitem).remove()

        },
        clearMeals: function() {

            let listItems = document.querySelectorAll(UISelectors.listItems) 

            listItems = Array.from(listItems)

            listItems.forEach(function(listItem) {

                listItem.remove()

            })

        },
        clearEditState: function() {
            
            this.clearInput()

            document.querySelector(UISelectors.addbtn).style.display = "inline"
            document.querySelector(UISelectors.updbtn).style.display = "none"
            document.querySelector(UISelectors.delbtn).style.display = "none"
            document.querySelector(UISelectors.backbtn).style.display = "none"

        },
        activeEditState: function() {

            document.querySelector(UISelectors.updbtn).style.display = "inline"
            document.querySelector(UISelectors.delbtn).style.display = "inline"
            document.querySelector(UISelectors.backbtn).style.display = "inline"
            document.querySelector(UISelectors.addbtn).style.display = "none"
            
        },
        clearInput: function() {
            document.querySelector(UISelectors.meal).value = ""
            document.querySelector(UISelectors.calorie).value = ""
        }
    }

})()

// Appp Controller

const AppCtrl = (function(ItemCtrl, UICtrl) {

    const UISelectors = UICtrl.getSelectors()

    // Add Meal Function

    const ItemAddSubmit = function(e) {

        const input = UICtrl.getItemValues()

        // docref.set({
        //     meal: "steak",
        //     calorie: 300
        // }).then(function() {
        //     console.log('data saved..')
        // }).catch(function(err) {
        //     console.log('error', err)
        // })

        if(input.meal !== '' && input.calorie !== '') {
            
            const NewItem = ItemCtrl.addItems(input.meal, input.calorie)
            UICtrl.addItemList(NewItem)

            // Get total calories from itemCtrl

            const totalCalorie = ItemCtrl.getCalories()

            UICtrl.addCalories(totalCalorie)

            UICtrl.clearInput()

        } else {
            alert('incomplete')
        }
    
        e.preventDefault()
    }

    // Edit Meal Function 

    const EditEachItem = function(e) {

        if(e.target.classList.contains('Edit')) {

            const ListId = e.target.parentNode.id
            const GetIdArray = ListId.split('-')
            
            const id = parseInt(GetIdArray[1])

            const itemfound = ItemCtrl.GetItemEach(id)

            ItemCtrl.setCurrentItem(itemfound)
            UICtrl.activeEditState()
            UICtrl.addToForm()
        }
        e.preventDefault()

    }

    // Updating Each Item Functionality

    const updEachItem = function(e) {

        const itemToEdit = UICtrl.getItemValues()

        console.log(itemToEdit)

        const updatedItem = ItemCtrl.updateItem(itemToEdit.meal, itemToEdit.calorie)

        console.log(updatedItem)

        UICtrl.updateListItem(updatedItem)

        UICtrl.clearEditState()

        e.preventDefault()
        
    }

    const deleteMeal = function(e) {
        
        const currentItem = ItemCtrl.getCurrentItem()
        
        console.log(currentItem)

        ItemCtrl.deleteItem(currentItem.id)
        UICtrl.deleteListItem(currentItem.id)

        UICtrl.clearEditState()
        
        e.preventDefault()
    }

    const clearAllMeal = function() {

        UICtrl.clearMeals()
        ItemCtrl.clearAllItems()

    }



    // Add Meal Button Functionality
    document.querySelector(UISelectors.addbtn).addEventListener('click', ItemAddSubmit)

    // Edit Each individual Meeal Button Functionality
    document.querySelector(UISelectors.itemList).addEventListener('click', EditEachItem)
    
    // Update Meal button Functionality
    document.querySelector(UISelectors.updbtn).addEventListener('click', updEachItem)

    // Back button
    document.querySelector(UISelectors.backbtn).addEventListener('click', 
    UICtrl.clearEditState())

    // Delete Meal 
    document.querySelector(UISelectors.delbtn).addEventListener('click', deleteMeal)

    // Clear All Meal Functionality
    document.querySelector(UISelectors.clearbtn).addEventListener('click', clearAllMeal)


    // Public Methods
    
    return {
        init: function() {
            UICtrl.clearEditState()

            console.log(ItemCtrl.logItems())

            const item = ItemCtrl.getItems()
        
            UICtrl.populateItems(item)

            const values = UICtrl.getItemValues

            console.log(values)
        }
    }

})(ItemCtrl, UICtrl)

AppCtrl.init()