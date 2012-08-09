var scraper = require('scraper');


function getRouteList(callback){
	scraper({
		'uri': 'http://webwatch.itsmarta.com/prediction.aspx?mode=d',
		'headers': {'User-Agent': 'Mozilla/5.0 (X11; CrOS i686 2268.111.0) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11'}
	}, function(err, jQuery) {
	if (err){
		callback(err, null);
	}
	else{
		callback(null,parseSelectBySelector(jQuery, "#ddlRoutes"));
	}
    
  });
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
getRouteList( function(err, result){
	if(err){
		throw err;
	}
	console.log(result);
});