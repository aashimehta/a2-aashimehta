// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  //id associated w/ input is how you get the value of the input
  //querySelector links to html using ID, tag name or class name; assign html tag an ID, 
  //also getElementByID
  //# is in front of ID name 
        
  
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const startInput = document.querySelector('#startDate');
const finishInput = document.querySelector('#dateFinished');
const itemIdentifier = titleInput.value + authorInput.value + startInput.value + finishInput.value;

const json = { title: titleInput.value,
         author: authorInput.value, 
         startDate: startInput.value,
         dateFinished: finishInput.value,
         identifier: itemIdentifier
}; //json is how you want to package data before sending it to front end
  //{attribute : value}
const body = JSON.stringify( json ); 


const response = await fetch( '/submit', {
    method:'POST', 
    body
  })

let data = ""; 
  if (response.status === 200){
     data = await response.json()


  }

  const list = document.createElement('ul')
  const existingList = document.querySelector('ul');
  if (existingList) {
    existingList.parentNode.removeChild(existingList);
  }
  
  console.log(data)

  
const addedItems = []


  data.forEach(d => {

   const itemIdentifier = d.title + d.author + d.startDate + d.dateFinished
    if (!addedItems.includes(itemIdentifier)){
      const li = document.createElement('li')
      li.className = "userLibrary"
      const deleteButton = document.createElement("button")
      deleteButton.innerText = "Delete";
      deleteButton.className = "delete";
      
      li.innerText = "Title: " + d.title + "\nAuthor: " + d.author + "\nStart Date: " + d.startDate + "\nFinish Date: " + d.dateFinished 
      
      
      list.appendChild(li)
      list.appendChild(deleteButton)
      addedItems.push(itemIdentifier)
      deleteButton.onclick = () => deleteBook(itemIdentifier, li, deleteButton);

   

   }
    
  })

  document.body.appendChild( list )

}


async function deleteBook(itemID, listItemElem, delButton) {
  console.log("Delete book...")
  console.log(itemID)

  
    const response = await fetch(`/delete/${itemID}`, {
      method: 'DELETE', 

    }); 
    console.log(`/delete/${itemID}`)
    console.log("Response status:", response.status); // Log the response status code

  //sucessful
  if (response.status  === 200){
      let ul = listItemElem.parentNode;

    ul.removeChild(listItemElem)
    ul.removeChild(delButton)
    console.log("Success")

  }
  else {
    console.error("Error deleting item on server")
  }
  

}

window.onload = function() {
  const button = document.querySelector("button");
  button.onclick = submit;
}