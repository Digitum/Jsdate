function starttest()
{
	console.log( "Start test procedures" );
	var _d = new Date();
	addRow( "Date.format()", "\"Y-m-d\"", _d.format("Y-m-d") );
	addRow( "Date.format()", "\"H:i:s\"", _d.format("H:i:s") );
	addRow( "Date.dutyFormat()", "\"H:i:s\"", _d.dutyFormat("H:i:s","2015-11-09") );
}
function addRow( sText, sValue1, sValue2 )
{
	var _tr = document.querySelector( "#resultTable>tbody" ).insertRow( -1 );

	for( var i = 0; i < arguments.length ; i++ ) {
		var _td = _tr.insertCell( i );
		_td.innerHTML = arguments[i];
		
	}
	// var _td1 = _tr.insertCell( 1 );
	// var _td2 = _tr.insertCell( 2 );

	// _td1.innerHTML = sValue1;	
	// _td2.innerHTML = sValue2;	
}
