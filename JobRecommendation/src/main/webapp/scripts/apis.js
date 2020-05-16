/**
 * API #2 Load favorite (or visited) items API end point: [GET]
 * /history?user_id=1111
 */
function loadFavoriteItems() {
	activeBtn('fav-btn');

	// request parameters
	var url = './history';
	var params = 'user_id=' + user_id;
	var req = JSON.stringify({});

	// display loading message
	showLoadingMessage('Loading favorite items...');

	// make AJAX call
	ajax('GET', url + '?' + params, req, function(res) {
		var items = JSON.parse(res);
		if (!items || items.length === 0) {
			showWarningMessage('No favorite item.');
		} else {
			listItems(items);
		}
	}, function() {
		showErrorMessage('Cannot load favorite items.');
	});
}

/**
 * API #3 Load recommended items API end point: [GET]
 * /recommendation?user_id=1111
 */
function loadRecommendedItems() {
	activeBtn('recommend-btn');

	// request parameters
	var url = './recommendation' + '?' + 'user_id=' + user_id + '&lat=' + lat
			+ '&lon=' + lng;
	var data = null;

	// display loading message
	showLoadingMessage('Loading recommended items...');

	// make AJAX call
	ajax(
			'GET',
			url,
			data,
			// successful callback
			function(res) {
				var items = JSON.parse(res);
				if (!items || items.length === 0) {
					showWarningMessage('No recommended item. Make sure you have favorites.');
				} else {
					listItems(items);
				}
			},
			// failed callback
			function() {
				showErrorMessage('Cannot load recommended items.');
			});
}

/**
 * API #1 Load the nearby items API end point: [GET]
 * /search?user_id=1111&lat=37.38&lon=-122.08
 */
function loadNearbyItems() {
	console.log('loadNearbyItems');
	activeBtn('nearby-btn');

	// The request parameters
	var url = './search';
	var params = 'user_id=' + user_id + '&lat=' + lat + '&lon=' + lng;
	var data = null;

	// display loading message
	showLoadingMessage('Loading nearby items...');

	// make AJAX call
	ajax('GET', url + '?' + params, data,
	// successful callback
	function(res) {
		var items = JSON.parse(res);
		if (!items || items.length === 0) {
			showWarningMessage('No nearby item.');
		} else {
			console.log(items);
			listItems(items);
		}
	},
	// failed callback
	function() {
		showErrorMessage('Cannot load nearby items.');
	});
}

/**
 * API #4 Toggle favorite (or visited) items
 * 
 * @param item -
 *            The item from the list
 * 
 * API end point: [POST]/[DELETE] /history request json data: { user_id: 1111,
 * favorite: item }
 */
function changeFavoriteItem(item) {
	// check whether this item has been visited or not
	var li = document.querySelector('#item-' + item.item_id);
	var favIcon = document.querySelector('#fav-icon-' + item.item_id);
	var favorite = !(li.dataset.favorite === 'true');

	// request parameters
	var url = './history';
	var req = JSON.stringify({
		user_id : user_id,
		favorite : item
	});
	var method = favorite ? 'POST' : 'DELETE';

	ajax(method, url, req,
	// successful callback
	function(res) {
		var result = JSON.parse(res);
		if (result.status === 'OK' || result.result === 'SUCCESS') {
			li.dataset.favorite = favorite;
			favIcon.className = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
		}
	});
}
