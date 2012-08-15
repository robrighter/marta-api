var scraper = require('scraper');
var request = require('request');

var urls = {
	departures: 'http://webwatch.itsmarta.com/prediction.aspx?mode=d',
	arrivals: 'http://webwatch.itsmarta.com/prediction.aspx?mode=a'
}


function getRouteList(callback){
	scrapeForSelectBox(callback, urls.departures, "#ddlRoutes");
}

function getDirectionList(route, callback){
	scrapeForSelectBox(callback, urls.departures, "#ddlDirections", route);
}

function getStopList(route, direction, callback){

}

function scrapeForSelectBox(callback, url, slectboxid, route){
	scraper({
		jar: getRouteCookieJar(route),
		uri: url, //,
		followRedirect: false,
		headers: {'User-Agent': 'Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11'}
	}, function(err, jQuery) {
		if (err){
			callback(err, null);
		}
		else{
			callback(null,parseSelectBySelector(jQuery, slectboxid));//"#ddlDirections"
		}
	});
}

function getRouteCookieJar(route){
	var j = request.jar();
	if(route){
		var cookie = request.cookie('Route='+route);
		j.add(cookie);
	}
	return j;
}


function parseSelectBySelector(jQuery, selector){
	var ret = {};
	var i = 0;
	jQuery(selector + " > option").each(function(){
		var description = jQuery(this).text().trim();
		var key = jQuery(this).attr('value').trim()
		ret[key] = description;
	})
	return ret;
}




//test
// ROUTE LIST
getRouteList( function(err, result){
	console.log('///////////////// ROUTE LIST ///////////////////');
	if(err){
		throw err;
	}
	console.log(result);
});

//DIRECTION LIST
getDirectionList(148, function(err, result){
	console.log('///////////// DIRECTION LIST /////////////////');
	if(err){
		throw err;
	}
	console.log(result);
});