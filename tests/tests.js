
window.location = '#';

QUnit.testDone(function( ) {
	var $track = document.getElementById('track');
	window.location = '#';
	$track.pause();
});

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

test( "TimecodeHash.convertColonTimeInSeconds", function() {
	var tch = new TimecodeHash();
	ok(tch.convertColonTimeInSeconds('0:01') === 1, 'got one second' );
	ok(tch.convertColonTimeInSeconds('1:34') === 94, 'got one minute and 34 seconds' );
	ok(tch.convertColonTimeInSeconds('2:01:34') === 7294, 'got two hours, one minute and 34 seconds' );
	ok(tch.convertColonTimeInSeconds('1:02:01:34') === (7294 + 86400), 'got one day, two hours, one minute and 34 seconds' );
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

	tch.hashOrder('track@01:04:02');
	ok($track.currentTime === 3842, 'track is at 02:04:02' );

	tch.hashOrder('@1:02');
	ok($track.currentTime === 62, 'unnamed track is at 1:02' );
});

test( "TimecodeHash.hashOrder with other separator", function() {
	var tch = new TimecodeHash();
	var $track = document.getElementById('track');
	tch.separator = '‣'
	tch.hashOrder('track‣10');
	ok($track.currentTime === 10, 'is at 10 seconds' );
	tch.hashOrder('track@30');
	ok($track.currentTime === 10, 'original separator ignored');

	tch.hashOrder('track‣1h2m4s');
	ok($track.currentTime === 3724, 'is at one hour, 2 minutes and 4 seconds' );

	tch.hashOrder('‣40');
	ok($track.currentTime === 40, 'unnammed track is at 40 seconds' );

	tch.hashOrder('‣20s');
	ok($track.currentTime === 20, 'unnammed track is at 20 seconds' );

	tch.hashOrder('‣01:02:04');
	ok($track.currentTime === 3724, 'unnammed track is at 01:02:04' );

	tch.hashOrder('track‣00:01:10');
	ok($track.currentTime === 70, 'nammed track is at 00:01:10' );
});

function hashtest(hash,expects,describ) {
	var $track = document.getElementById('track');
	QUnit.asyncTest('on hash change : '+describ, function(assert) {
		expect(1);
		window.location = hash;
		setTimeout(function() {
			assert.ok($track.currentTime === expects);
			QUnit.start();
		}, 20);		
	});
}
hashtest('#track@30',		30,		'named is at 30 seconds' );
hashtest('#track@25s',		25,		'named is at 25 seconds' );
hashtest('#track@10m10s',	610,	'is at 10 minutes and 10 seconds');
hashtest('#@10s',			10,		'unnamed is at 10 seconds');
hashtest('#@01:01:01',		3661,	'unnamed is at 01:01:01');
hashtest('#track@00:10:00',	600,	'named is at 00:10:00');
