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
			for(var i = 0; i < allFeeds.length; i++) {
				//allFeeds.forEach(function(index) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
			};
		});
		
		// Check for a name
		it('should have a name', function() {
			for(var i = 0; i < allFeeds.length; i++) {
			//allFeeds.forEach(function(index) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			};
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
		it('should become visible when icon clicked and invisible when clicked again', function() {
			menuItem.click();
			expect($('body').hasClass('menu-hidden')).toBeFalsy();
			menuItem.click();
			expect($('body').hasClass('menu-hidden')).toBeTruthy();
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
			entries = $('.feed .entry').length;
			expect(entries).toBeGreaterThan(0);
			done();
		});
	});

	// Feed Selection
	describe('New feed selection', function() {
		
		var firstFeed,
			secondFeed;
		
		
		beforeEach(function(done) {
			//load first feed
			loadFeed(0, function(){
				//first feed text
				firstFeed = $('.feed').text();
				//load second feed
				loadFeed(1,done);
			});
		});
		
		it('content changes when user loads a new feed', function(done) {
			//second feed text
			secondFeed = $('.feed').text();
			expect(firstFeed).not.toBe(secondFeed);
			done();
		});
		
		//reload first feed
		afterAll(function(done) {
			loadFeed(0,done);
		});
	});
	
}());
