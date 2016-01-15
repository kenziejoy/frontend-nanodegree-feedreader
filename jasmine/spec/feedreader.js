// feedreader.js

$(function() {
	// RSS Feeds Suite
	describe('RSS Feeds', function() {
		
		// Check for a feed
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});
		
		// Check for a url
		it('should contain a URL', function() {
			allFeeds.forEach(function(value) {
				expect(allFeeds.url).toBeDefined();
				expect(allFeeds.url.length).not.toBe(0);
				/* using Spoon Library regex for testing url validity - https://mathiasbynens.be/demo/url-regex*/
				expect(allFeeds.url).toMatch(/(((http|ftp|https):\/{2})+(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/imuS);
			});
		});
		
		// Check for a name
		it('should have a name', function() {
			allFeeds.forEach(function(value) {
				expect(allFeeds.name).toBeDefined();
				expect(allFeeds.name.length).not.toBe(0);
			});
		});
	});

	// Menu Suite
	describe('The Menu', function() {
		
		var menuHidden = $('body').hasClass('menu-hidden');
		var menuItem = $('.menu-icon-link');
		
		// Is the menu hidden by default?
		it('should be hidden by default', function() {
			expect(menuHidden).toBe(true);
		});

		// Does the menu slide on click?
		it('should become visible when icon clicked', function() {
			menuItem.click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			menuItem.click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
		
	// Entries
	describe('Initial entries', function() {
		
		var entries;
		
		//let the loadFeed function run
		beforeEach(function(done) {
			loadFeed(0,done);
		});
		
		// At least one entry
		it('should have at least one entry', function(done) {
			entries = $('.feed').find('.entry').length;
			expect(entries).toBeGreaterThan(0);
			done();
		});
	});

	// Feed Selection
	describe('New feed selection', function() {
		
		var firstFeed,
			secondFeed;
		
		
		beforeEach(function(done) {
			//first feed text
			firstFeed = $('.entry')[0].innerText;
			//load second feed
			loadFeed(1,done);
		});
		
		it('content changes when user loads a new feed', function(done) {
			//second feed text
			secondFeed = $('.entry')[0].innerText;
			expect(firstFeed).not.toBe(secondFeed);
			done();
		});
		
		//reload first feed
		afterEach(function(done) {
			loadFeed(0,done);
		});
	});
}());
