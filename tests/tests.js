window.location = '#';
var lock = false;
var lockedAt = 0;


function stopPlayer() {
	window.location = '#';
	document.getElementById('track').pause();
	lock = false;
}

function nowLock() {
	lock = true;
	lockedAt = Date.now();
}

function waitNoLock() {
console.log(lockedAt);
	while (lock && (Date.now() < (lockedAt+10))) ;
	lock = false;
}

QUnit.testDone(stopPlayer);

test( "hello TimecodeHash", function() {
	ok( typeof window.TimecodeHash === "object", "Passed!" );

	var $track = document.getElementById('track');
	ok($track.paused, 'paused by defaults' );
});

test( "TimecodeHash.convertTimeInSeconds", function() {
	var tch = window.TimecodeHash;
	ok(tch.convertTimeInSeconds(0) === 0, 'got zero' );
	ok(tch.convertTimeInSeconds('1') === 1, 'got one' );
	ok(tch.convertTimeInSeconds('1s') === 1, 'got one second' );
	ok(tch.convertTimeInSeconds('20s') === 20, 'got twenty seconds' );
	ok(tch.convertTimeInSeconds('1m') === 60, 'got one minute' );
	ok(tch.convertTimeInSeconds('1m1s') === 61, 'got one minute and one second' );
	ok(tch.convertTimeInSeconds('2h4m2s') === 7442, 'got 2 hours, 4 minutes and 2 seconds' );
});

test( "TimecodeHash.convertColonTimeInSeconds", function() {
	var tch = window.TimecodeHash;
	ok(tch.convertColonTimeInSeconds('0:01') === 1, 'got one second' );
	ok(tch.convertColonTimeInSeconds('1:34') === 94, 'got one minute and 34 seconds' );
	ok(tch.convertColonTimeInSeconds('2:01:34') === 7294, 'got two hours, one minute and 34 seconds' );
	ok(tch.convertColonTimeInSeconds('1:02:01:34') === (7294 + 86400), 'got one day, two hours, one minute and 34 seconds' );
});

test( "TimecodeHash.convertSecondsInTime", function() {
	var tch = window.TimecodeHash;
	ok(tch.convertSecondsInTime(0) === '0s', 'got zero' );
	ok(tch.convertSecondsInTime(1) === '1s', 'got one' );
	ok(tch.convertSecondsInTime(20) === '20s', 'got twenty seconds' );
	ok(tch.convertSecondsInTime(60) === '1m', 'got one minute' );
	ok(tch.convertSecondsInTime(61) === '1m1s', 'got one minute and one second' );
	ok(tch.convertSecondsInTime(7442) === '2h4m2s', 'got 2 hours, 4 minutes and 2 seconds' );
});


nowLock();
QUnit.asyncTest( "TimecodeHash.jumpIdAt existing at start", function( assert ) {
	expect( 2 );
	var $track = document.getElementById('track');
	var tch = window.TimecodeHash;
	tch.jumpIdAt('track',0, function() {
		assert.ok($track.currentTime === 0, 'is at start' );
		assert.ok(!$track.paused, 'not paused afterwards' );
		QUnit.start();
		stopPlayer();
	});
});

waitNoLock();
nowLock();
QUnit.asyncTest( "TimecodeHash.jumpIdAt existing at 600 secs", function( assert ) {
	expect( 1 );
	var $track = document.getElementById('track');
	var tch = window.TimecodeHash;
	tch.jumpIdAt('track',600, function() {
		assert.ok($track.currentTime === 600, 'is at 10mn' );
		QUnit.start();
		stopPlayer();
	});
});

function hashOrder_test(expected_string, hash , expected_time)
{
	waitNoLock();
	nowLock();
	QUnit.asyncTest( "TimecodeHash.hashOrder "+expected_string, function( assert ) {
		nowLock();
		expect( 1 );
		var tch = window.TimecodeHash;
		var $track = document.getElementById('track');
		tch.hashOrder(hash, function() {
			assert.ok($track.currentTime === expected_time, expected_string);
			QUnit.start();
			stopPlayer();
		});
	});
}
hashOrder_test('is at 10 seconds', 'track&t=10', 10);
hashOrder_test('is at one hour, 2 minutes and 4 seconds', 'track&t=1h2m4s', 3724);
hashOrder_test('unnammed track is at 40 seconds', '&t=40', 40);
hashOrder_test('unnammed track is at 20 seconds', '&t=20s', 20);
hashOrder_test('track is at 02:04:02', 'track&t=01:04:02', 3842);
hashOrder_test('unnamed track is at 1:02', '&t=1:02', 62);

function hashOrder_otherSeparator_test(expected_string, hash , expected_time)
{
	waitNoLock();
	nowLock();
	QUnit.asyncTest( "TimecodeHash.hashOrder with other separator "+expected_string, function( assert ) {
		nowLock();
		expect( 1 );
		var tch = window.TimecodeHash;
		tch.separator = '‣'
		var $track = document.getElementById('track');
		tch.hashOrder(hash, function() {
			assert.ok($track.currentTime === expected_time, expected_string);
			QUnit.start();
			stopPlayer();
		});
	});
}
hashOrder_otherSeparator_test('is at 10 seconds', 'track‣10', 10);
hashOrder_otherSeparator_test('original separator ignored', 'track&t=30', 10);
hashOrder_otherSeparator_test('is at one hour, 2 minutes and 4 seconds', 'track‣1h2m4s', 3724);
hashOrder_otherSeparator_test('unnammed track is at 40 seconds', '‣40', 40);
hashOrder_otherSeparator_test('unnammed track is at 20 seconds', '‣20', 20);
hashOrder_otherSeparator_test('unnammed track is at 01:02:04', '‣01:02:04', 3724);
hashOrder_otherSeparator_test('unnammed track is at 00:01:10', '‣00:01:10', 70);


function hashtest(hash,expects,describ) {
	waitNoLock();
	nowLock();
	var $track = document.getElementById('track');
	QUnit.asyncTest('on hash change : '+describ, function(assert) {
		nowLock();
		expect(1);
		window.location = hash;
		function event_callback() {
			assert.ok($track.currentTime === expects);
			window.removeEventListener( 'hashchange', event_callback,false);
			stopPlayer();
			QUnit.start();
		}
		window.addEventListener( 'hashchange', event_callback,false);
	});
}
function test_finaux() {
	waitNoLock();
	nowLock();
	window.TimecodeHash.separator = '@';
	hashtest('#track&t=30',			30,		'named is at 30 seconds' );
	hashtest('#track&t=25s',		25,		'named is at 25 seconds' );
	hashtest('#track&t=10m10s',		610,	'is at 10 minutes and 10 seconds');
	hashtest('#&t=10s',				10,		'unnamed is at 10 seconds');
	hashtest('#&t=01:01:01',		3661,	'unnamed is at 01:01:01');
	hashtest('#track&t=00:10:00',	600,	'named is at 00:10:00');
}