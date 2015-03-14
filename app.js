var itemTemplate = $('#templates .item');
var list = $('#list');

/* Adding an item to the page */
var addItemToPage = function(itemData) {
	var item = itemTemplate.clone();
	item.attr('data-id',itemData.id);
	item.find('.description').text(itemData.description);
	if(itemData.completed) {
		item.addClass('completed');
	}
	list.append(item);
}
var loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/JPinney/"
})

/* Loading the list from the server */
loadRequest.done(function(dataFromServer) {
  var itemsData = dataFromServer.items

  itemsData.forEach(function(itemData) {
    addItemToPage(itemData)
  })
})

/* Adding an item to the list */
$('#add-form').on('submit', function(event) {
  event.preventDefault()
  var itemDescription = event.target.itemDescription.value
  var creationRequest = $.ajax({
	  type: 'POST',
	  url: "http://listalous.herokuapp.com/lists/JPinney/items",
	  data: { description: itemDescription, completed: false }
	})
  creationRequest.done(function(itemDataFromServer) {
	  addItemToPage(itemDataFromServer)
	})
})

/* Marking an item complete*/
$('#list').on('click', '.complete-button', function(event) {
  var item = $(event.target).parent()
	var isItemCompleted = item.hasClass('completed')
	var itemId = item.attr('data-id')
	var updateRequest = $.ajax({
	  type: 'PUT',
	  url: "https://listalous.herokuapp.com/lists/YOUR-LIST-NAME-HERE/items/" + itemId,
	  data: { completed: !isItemCompleted }
	})
	updateRequest.done(function(itemData) {
	  if (itemData.completed) {
	    item.addClass('completed')
	  } else {
	    item.removeClass('completed')
	  }
	})
})
