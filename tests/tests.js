
test( "hello TimecodeHash", function() {
	ok( typeof TimecodeHash === "function", "Passed!" );

	var $track = document.getElementById('track');
	ok($track.paused, 'paused by defaults' );
});

test( "TimecodeHash.convertTimeInSeconds", function() {
	var tch = new TimecodeHash();
	ok(tch.convertTimeInSeconds(0) === 0, 'got zero' );
	ok(tch.convertTimeInSeconds('1') === 1, 'got one' );
	ok(tch.convertTimeInSeconds('1s') === 1, 'got one second' );
	ok(tch.convertTimeInSeconds('20s') === 20, 'got twenty seconds' );
	ok(tch.convertTimeInSeconds('1m') === 60, 'got one minute' );
	ok(tch.convertTimeInSeconds('1m1s') === 61, 'got one minute and one second' );
	ok(tch.convertTimeInSeconds('2h4m2s') === 7442, 'got 2 hours, 4 minutes and 2 seconds' );
});

test( "TimecodeHash.jumpElementAt existing", function() {
	var $track = document.getElementById('track');
	var tch = new TimecodeHash();
	tch.jumpElementAt('track',0)
	ok($track.currentTime === 0, 'is at start' );
	ok(!$track.paused, 'not paused afterwards' );

	tch.jumpElementAt('track',600);
	ok($track.currentTime === 600, 'is at 10mn' );
});



test( "TimecodeHash.hashOrder", function() {
	var tch = new TimecodeHash();
	var $track = document.getElementById('track');
	tch.hashOrder('track@10');
	ok($track.currentTime === 10, 'is at 10 seconds' );

	tch.hashOrder('track@1h2m4s');
	ok($track.currentTime === 3724, 'is at one hour, 2 minutes and 4 seconds' );

	tch.hashOrder('@40');
	ok($track.currentTime === 40, 'unnammed track is at 40 seconds' );

	tch.hashOrder('@20s');
	ok($track.currentTime === 20, 'unnammed track is at 20 seconds' );

});


test( "on hash change", function() {
	var $track = document.getElementById('track');
	window.location = '#track@10';
	ok($track.currentTime === 10, 'is at 10 seconds' );

	window.location = '#track@10m10s';
	ok($track.currentTime === 610, 'is at 10 minutes and 10 seconds' );

	window.location = '#';
	$track.pause();
});
