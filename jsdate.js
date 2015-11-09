// JS date
// (c) Odd Holstensson 2015-11-09

Date.prototype.getOrdinal = function()
{
	// Calculate ordinal day of year
	var current = new Date( this.valueOf() ); // This date
	current.setUTCHours( 12,0,0,0 ); // Set UTC time to mid day
	janfirst = new Date( current.valueOf() ); // Copy 
	janfirst.setUTCMonth( 0,1 );// Set to 1 january
	// Subtract difference in milliseconds and it should result in an integer.
	// To be shure, Math.round should take care of the rest.
	return Math.round( ( current.valueOf()-janfirst.valueOf() )/( 24*60*60*1000 ) );
}
Date.prototype.getISOWeek = function()
{
	// ISO8601 week number
	var _wc = new Date( this.valueOf() );
	_wc.setUTCHours( 12,0,0,0 );
	var _ws = new Date( _wc.valueOf() );
	_ws.setUTCMonth( 0,4 );
	_ws.setDate( _ws.getDate()+[ -6,0,-1,-2,-3,-4,-5 ][ _ws.getDay() ] )
	return ( Math.floor( ( _wc.valueOf()-_ws.valueOf() )/( 24*60*60*1000 )/7 ) )+1;
}

Date.prototype.format = function()
{
	var sFormat = "Y-m-d";
	if( arguments.length > 0 )
	{
		sFormat = arguments[0];
	}
	
	var dCopy = new Date( this.valueOf() );
	var iMillisecs = dCopy.getTime();

	var d = {};
	d.d = ( dCopy.getDate()<10 ? "0" : "" )+dCopy.getDate();
	d.D = this._presets.aShortDays[ dCopy.getDay() ];
	d.j = dCopy.getDate();
	d.l = this._presets.aLongDays[ dCopy.getDay() ];
	d.N = dCopy.getDay()+1;
	d.S = this._presets.aSuffix[ dCopy.getDate() ];
	d.w = dCopy.getDay();
	d.z = this.getOrdinal();
	d.W = this.getISOWeek();
	d.F = this._presets.aLongMonth[ dCopy.getMonth() ];
	d.m = ( dCopy.getMonth()<9 ? "0" : "" )+( dCopy.getMonth()+1 );
	d.M = this._presets.aShortMonth[ dCopy.getMonth() ];
	d.n = dCopy.getMonth()+1;
	d.t = 31;
	d.o = dCopy.getFullYear();
	d.Y = dCopy.getFullYear();
	d.y = dCopy.getYear();
	d.a = ( dCopy.getHours()>11 ? "am" : "pm" );
	d.A = ( dCopy.getHours()>11 ? "AM" : "PM" );
	d.B = Math.floor( ( ( ( this.getUTCHours() + 1 )%24 ) + this.getUTCMinutes()/60 + this.getUTCSeconds()/3600 )*1000/24 ); // Swatch internet time
	d.g = ( dCopy.getHours()==0 ? 12 : ( dCopy.getHours()>12 ? dCopy.getHours()-12 : dCopy.getHours() ) );
	d.G = dCopy.getHours();
	d.h = ( dCopy.getHours()>0 && dCopy.getHours()<10 || dCopy.getHours()>12 && dCopy.getHours()<22?"0":"" )+( dCopy.getHours()==0 ? 12 : ( dCopy.getHours()>12 ? dCopy.getHours()-12 : dCopy.getHours() ) );
	d.H = ( d.G<10 ? "0" : "" )+d.G;
	d.i = ( dCopy.getMinutes()<10 ? "0" : "" )+dCopy.getMinutes();
	d.s = ( dCopy.getSeconds()<10 ? "0" : "")+dCopy.getSeconds();
	d.u = dCopy.getMilliseconds()*1000; // endast millisekundprecision
	// Offset till UTC i formatat (+|-)HHMM
	d.O = ( dCopy.getTimezoneOffset()<0 ? "+" : "-") + this._pad( Math.abs( dCopy.getTimezoneOffset() / 60 * 100 ),"0",4 );
	var tzOffsetSign = ( dCopy.getTimezoneOffset() == 0 ? "Z":( dCopy.getTimezoneOffset()>0 ? "-" : "+" ) );
	var tzOffsetMins = ( dCopy.getTimezoneOffset() < 0 ? -dCopy.getTimezoneOffset():dCopy.getTimezoneOffset() );
	var tzOffsetHours = parseInt( tzOffsetMins/60,10 );
	tzOffsetMins = parseInt( ( tzOffsetMins%60 ),10 );
	d.P = tzOffsetSign + ( tzOffsetHours<10 ? "0" : "") + tzOffsetHours + ":" + ( tzOffsetMins<10 ? "0" : "" ) + tzOffsetMins;
	
	d.T = ""; // Timezone Abbreviation
	d.Z = dCopy.getTimezoneOffset();

	d.e = "UTC"; // Time zone identifier
	// Räkna ut om datumet är sommar eller vintertid
	var dTemp = new Date( dCopy.valueOf() );
	dTemp.setMonth( 1,29 );
	d.L = ( dTemp.getDate()==1?"0":"1" );
	
	// Sommartid eller ej
	var testDate = new Date( dCopy.valueOf() );
	testDate.setMonth( 0 );
	d.I = ( dCopy.getTimezoneOffset() == testDate.getTimezoneOffset() ? "0" : "1" );
	d.c = d.Y+"-"+d.m + "-" +d.d + "T" + d.H + ":"+ d.i + ":" + d.s + d.P;
	d.r = d.D+", " + d.d + " " +d.M + " " + d.Y + " " + d.H + ":" + d.i + ":" + d.s + " " + d.O;
	d.U = Math.round( dCopy.getTime()/ 1000 );
	
	var sReturn = "";
	for( var i = 0 ; i < sFormat.length ; i++ )
	{
		sReturn += ( d[ sFormat.substr( i,1 ) ] != undefined ? d[ sFormat.substr( i,1 ) ] : sFormat.substr( i,1 ) );
	}
	return sReturn;
}
Date.prototype.dutyFormat = function( sFormat, vDutydate )
{
	// console.log(vDutydate);
	// Dutyformat returnerar värden enligt samma koncept som format men med
	// skillnaden att det visas med utgång från datum i dutydate.
	// Att göra:
	// Om inget dutydate skickas med så skall innevarande datum användas, dvs samma funktion som Date::format().
	
	if( !vDutydate )
	{
		throw new Error( "Date.dutyFormat: No DutyDate supplied!" );	
		return false;
	}
	dDutydate = false;
	if( typeof vDutydate.getFullYear == "function" )
	{
		dDutydate = vDutydate;
	}
	else if( typeof vDutydate === "number" || vDutydate == parseInt( vDutydate,10 ) )
	{
		// Unix-datum
		dDutydate = new Date( parseInt( vDutydate,10 )*1000 );
	}
	// else if(dDutydate.YMDToDate(vDutydate,true))
	else
	{
		dDutydate = new Date();
		dDutydate = dDutydate.YMDToDate( vDutydate,true )
		// dDutydate = dDutydate.YMDToDate(vDutydate);
	}
	
	if(dDutydate == false) 
	{
		throw new Error( "Date.dutyFormat: No valid DuyDate supplied!" );	
		return false;
	}
	var actualDate = new Date( this.valueOf() );
	var dCopy = new Date( actualDate.valueOf() );
	
	dDutydate.setHours( dCopy.getHours(), dCopy.getMinutes(), dCopy.getSeconds(), dCopy.getMilliseconds() );
	actualDate.setHours( dCopy.getHours(), dCopy.getMinutes(), dCopy.getSeconds(), dCopy.getMilliseconds() );

	// Ta reda på om det är samma kalenderdygn eller +/- 1 dygn
	var hourOffset = parseInt( ( actualDate.valueOf() - dDutydate.valueOf() )/( 60*60*1000 ),10 );
	
	// Max -24 till +36 timmar
	if( hourOffset < -24 || hourOffset > 36 )
	{
		console.warn( "[Warning] Date::dutyFormat() : hoursOffset out of range!" );
		return false;
	}
	var iMillisecs = dCopy.getTime();

	var d = {};
	d.d = ( dDutydate.getDate()<10 ? "0" : "" )+dDutydate.getDate(); // Dutydatum
	d.D = this._presets.aShortDays[ dDutydate.getDay() ]; // Dutydatum
	d.j = dDutydate.getDate();
	d.l = this._presets.aLongDays[ dDutydate.getDay() ];
	d.N = dDutydate.getDay()+1;
	d.S = this._presets.aSuffix[ dDutydate.getDate() ];
	d.w = dDutydate.getDay();
	d.z = this.getOrdinal();
	d.W = this.getISOWeek();
	d.F = this._presets.aLongMonth[ dDutydate.getMonth() ];
	d.m = ( dDutydate.getMonth()<9 ? "0" : "" )+( dDutydate.getMonth()+1 );
	d.M = this._presets.aShortMonth[ dDutydate.getMonth() ];
	d.n = dDutydate.getMonth()+1;
	d.t = 31;
	d.o = dDutydate.getFullYear();
	d.Y = dDutydate.getFullYear();
	d.y = dDutydate.getYear();
	d.a = ( dCopy.getHours()>11 ? "am" : "pm" );
	d.A = ( dCopy.getHours()>11 ? "AM" : "PM" );
	d.B = Math.floor( ( ( ( this.getUTCHours() + 1 )%24 ) + this.getUTCMinutes()/60 + this.getUTCSeconds()/3600 )*1000/24 ); // Swatch internet time
	// d.g = (dCopy.getHours()==0?12:(dCopy.getHours()>12?dCopy.getHours()-12:dCopy.getHours()));
	d.g = "?";
	d.G = parseInt( dDutydate.getHours() + hourOffset,10 );
	// d.h = ( dCopy.getHours()>0 && dCopy.getHours()<10 || dCopy.getHours()>12 && dCopy.getHours()<22 ? "0" : "" )+( dCopy.getHours()==0 ? 12 : ( dCopy.getHours()>12 ? dCopy.getHours()-12 : dCopy.getHours() ) );
	d.h = "?";
	if( d.G < 0 ) {
		// Visa baklängestid
		d.H = "-" + ( dDutydate.getHours()<10 ? "0" : "" )+dDutydate.getHours();
	} else {
		d.H = ( d.G<10 ? "0" : "" )+d.G;
	}
	d.i = ( dCopy.getMinutes()<10 ? "0" : "" )+dCopy.getMinutes();
	d.s = ( dCopy.getSeconds()<10 ? "0":"" )+dCopy.getSeconds();
	d.u = dCopy.getMilliseconds()*1000; // endast millisekundprecision
	// Offset till UTC i formatat (+|-)HHMM
	// d.O = ( dCopy.getTimezoneOffset()<0 ? "+" : "-") + this._pad( Math.abs( dCopy.getTimezoneOffset() / 60 * 100), "0", 4 );
	d.O = "?";
	var tzOffsetSign = ( dCopy.getTimezoneOffset() == 0 ? "Z" : ( dCopy.getTimezoneOffset()>0 ? "-" : "+" ) );
	var tzOffsetMins = ( dCopy.getTimezoneOffset() < 0 ? -dCopy.getTimezoneOffset() : dCopy.getTimezoneOffset() );
	var tzOffsetHours = parseInt( tzOffsetMins/60,10 );
	tzOffsetMins = parseInt( ( tzOffsetMins%60 ),10 );
	// d.P = tzOffsetSign + ( tzOffsetHours<10?"0":"" ) + tzOffsetHours + ":" + ( tzOffsetMins<10?"0":"" ) + tzOffsetMins;
	d.P = "?";
	
	d.T = ""; // Timezone Abbreviation
	// d.Z = dCopy.getTimezoneOffset();
	d.Z = "?";

	d.e = "UTC"; // Time zone identifier
	// Räkna ut om datumet är sommar eller vintertid
	var dTemp = new Date( dCopy.valueOf() );
	dTemp.setMonth( 1,29 );
	d.L = ( dTemp.getDate()==1?"0":"1" );
	
	// Sommartid eller ej
	var testDate = new Date( dCopy.valueOf() );
	testDate.setMonth( 0 );
	d.I = ( dCopy.getTimezoneOffset() == testDate.getTimezoneOffset() ? "0" : "1" );
	d.c = d.Y+"-"+d.m + "-" +d.d + "T" + d.H + ":"+ d.i + ":" + d.s + d.P;
	d.r = d.D+", " + d.d + " " +d.M + " " + d.Y + " " + d.H + ":" + d.i + ":" + d.s + " " + d.O;
	d.U = Math.round( dCopy.getTime()/ 1000 );
	
	var sReturn = "";
	for( var i = 0; i < sFormat.length; i++ ) {
		sReturn += ( d[ sFormat.substr( i, 1 ) ] != undefined ? d[ sFormat.substr( i, 1 ) ] : sFormat.substr( i, 1 ) );
	}
	return sReturn;
}

Date.prototype.stringTime = function( sString )
{
	var hours = 0;
	var mins = 0;
	var secs = 0;
	var _previousDay = false;
	if( sString.match(/^\-/) ) {
		sString = sString.substr( 1 );
		_previousDay = true;
	}
	if(sString.match(/^\d{1,2}$/)) {
		mins = parseInt( sString, 10 );
	}
	if( sString.match(/^\d{3}$/) ) {
		sString = "0" + sString;
	}
	if( sString.match( /^\d{4}$/ ) ) {
		var hours = parseInt( sString.substr( 0, 2 ), 10 );
		var mins = parseInt( sString.substr( 2, 2 ), 10 );
	} else if( sString.match( /^\d{2}[:]\d{2}$/ ) )	{
		var hours = parseInt( sString.substr( 0, 2 ), 10 );
		var mins = parseInt( sString.substr( 3,2 ), 10 );
	} else {
		if( sString.toLowerCase() == "n" ) {
			var temptime = new Date();
			hours = temptime.getHours();
			mins = temptime.getMinutes( mins );
		} else {
			return false;
		}
	}

	if( _previousDay ) {
		hours = hours - 24;
	}
	
	if( arguments.length > 1 ) {
		if( typeof arguments[ 1 ].setHours == "function" ) {
			var rv = arguments[ 1 ];
			rv.setHours( hours );
			rv.setMinutes( mins );
			rv.setSeconds( secs );
			return rv;
		}
	}
	if( this instanceof Date ) {
		this.setHours( hours );
		this.setMinutes( mins );
		this.setSeconds( secs );
		return true;
	}
	var rv = new Date( 0 );
	rv.setHours( hours );
	rv.setMinutes( mins );
	rv.setSeconds( secs );
	return rv;
}
Date.prototype.stringDate = function( sString )
{
	// console.log(sString);
	var now = new Date();
	now.setHours( 0, 0, 0, 0 );
	if( sString.match( /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/ ) ) {
		sString = sString.substr( 0, 4 ) + "-" + sString.substr( 4, 2 ) + "-" + sString.substr( 6, 2 );
	}
	if( sString.match( /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/ ) )	{
		now.setFullYear( parseInt( sString.substr( 0, 4 ), 10 ), parseInt( sString.substr( 5, 2 ), 10 )-1, parseInt( sString.substr( 8, 2 ), 10 ) );
	}
	
	if(this instanceof Date) {
		// Om funktionen kallats som objektfunktion
		this.setFullYear( now.getFullYear(), now.getMonth(), now.getDate() );
		// return this.format( "Y-m-d" );
		return this;
	}
	return now;
}
Date.prototype.YMDToDate = function( sString )
{
	// Giltiga format:
	// ?-MM-DD
	// ??-MM-DD
	// ?MMDD
	// ??MMDD
	// "today"
	var _year;
	var _dDate = false;
	if ( sString.match( /^[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/ ) && sString.length >= 8 )	{
		var _year = "" + ( sString.substr( 0, 2 )>70 ? "19" : "20" ) + sString.substr( 0, 2 );
		var _month = sString.substr( 3, 2 );
		var _day = sString.substr( 6, 2 );
	} else if ( sString.match( /^(19|20)[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/ ) && sString.length >= 10 ) {
		var _year = sString.substr( 0, 4 );
		var _month = sString.substr( 5, 2 );
		var _day = sString.substr( 8, 2 );
	} else if ( sString.match( /^[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])/ ) && sString.length >= 6 ) {
		var _year = "" + ( sString.substr( 0, 2 )>70 ? "19" : "20" ) + sString.substr( 0, 2 );
		var _month = sString.substr( 2, 2 );
		var _day = sString.substr( 4, 2 );
	} else if ( sString.match( /^(19|20)[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])/ ) && sString.length >= 8 )	{
		var _year = sString.substr( 0, 4 );
		var _month = sString.substr( 4, 2 );
		var _day = sString.substr( 6, 2 );
	}
	if( _year )	{
		_dDate = new Date( _year, _month-1, _day, 12, 0, 0, 0 );
	}
	// Unix timestamp
	if ( sString.match( /^u\d+$/ ) ) {
		_dDate = new Date( parseInt( sString.substr( 1 ) )*1000 );
	}

	if( !_dDate )
	{
		if( arguments.length > 0 ) {
			if( arguments[0] == true ) {
				return _dDate;
			}
		}
		_dDate = new Date( );
		_dDate.setHours( 12, 0, 0, 0 );
		return _dDate;
	}
	return _dDate;
}
Date.prototype._repeat = function( _sString, _iCount )
{
	if( typeof _iCount == "number" && _iCount > 0 ) {
		return new Array( _iCount+1 ).join( _sString );
	}
	return false;
} 

Date.prototype._pad = function( _vString, _sPad, _iCount)
{
	if( typeof _iCount == "number" && typeof _sPad == "string" ) {
		sOutput = this._repeat( _sPad, _iCount );
		return sOutput.substr( 0, sOutput.length-_vString.length ) + _vString;
	}
	return false;
}

Date.prototype._presets = {
	aShortDays:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
	aLongDays:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
	aSuffix:[ "", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st" ],
	aShortMonth:[ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
	aLongMonth:[ "January", "February", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
};

function secondsToTime( _seconds )
{
	var _seconds = parseInt( _seconds,10 );
	var _minutes = Math.floor( _seconds/60 );
	var _negsign = "";
	if(_minutes < 0) {
		// Negativa klockslag
		if( _minutes > -1440 ) {
			_minutes = 1440 + _minutes;
			_negsign = "-";
		} else {
			return false;
		}
	}
	
	var _hour = Math.floor(_minutes/60);
	var _min = _minutes % 60;
	return _negsign + ( _hour<10 ? "0"+_hour : _hour )+":"+( _min<10 ? "0"+_min : _min );
}

function timeToSeconds( _sTime )
{
	// Endast format TT:MM eller -TT:MM
	// Gör om tid till millisekunder
	var _hours = 0;
	var _mins = 0;
	var _negative = false;

	if( _sTime.match( /^\d{2}[:]\d{2}$/ ) ) {
		_hours = parseInt( _sTime.substr( 0, 2 ), 10 );
		_mins = parseInt( _sTime.substr( 3, 2 ), 10 );
	} else if ( _sTime.match( /^[-]\d{2}[:]\d{2}$/ ) ) {
		_hours = parseInt( _sTime.substr( 1, 2 ), 10 );
		_mins = parseInt( _sTime.substr( 4, 2 ), 10 );
		_negative = true;
	} else {
		return false;
	}
	if( _negative ) {
		if( _hours<25 ) {
			var hourmins = ( 23-_hours )*60;
			_mins = ( 60-_mins ) + hourmins;
			return -( _mins*60 );
		} else {
			return false;
		}
	} else {
		_mins = _mins + _hours*60;
		return _mins*60;
	}
}
// Trim support is missing
if ( !String.prototype.trim ) {
   String.prototype.trim=function(){ return this.replace( /^\s+|\s+$/g, '' ); };
}
