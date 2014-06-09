test( "hello TimecodeHash", function() {
	ok( typeof TimecodeHash === "function", "Passed!" );
});

test( "TimecodeHash.convertTimeInSeconds", function() {
	var tch = new TimecodeHash();
	ok(tch.convertTimeInSeconds(0) === 0, 'got zero' );
	ok(tch.convertTimeInSeconds('1') === 1, 'got one' );
	ok(tch.convertTimeInSeconds('1s') === 1, 'got one second' );
	ok(tch.convertTimeInSeconds('1m') === 60, 'got one minute' );
	ok(tch.convertTimeInSeconds('1m1s') === 61, 'got one minute and one second' );
	ok(tch.convertTimeInSeconds('2h4m2s') === 7442, 'got 2 hours, 4 minutes and 2 seconds' );
});

test( "TimecodeHash.jumpElementAt existing", function() {
	var tch = new TimecodeHash();
	tch.jumpElementAt('track',0)
	var $track = document.getElementById('track');
	ok($track.currentTime === 0, 'is at start' );

	tch.jumpElementAt('track',600);
	ok($track.currentTime === 600, 'is at 10mn' );
});
