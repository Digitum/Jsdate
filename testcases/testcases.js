function starttest()
{
	console.log( "Start test procedures" );
	console.log( document.getElementById( "inputDate" ) );
	var inDate = document.getElementById( "inputDate" ).value;
	var inTime = document.getElementById( "inputTime" ).value;
	var inDutyDate = document.getElementById( "inputDutyDate" ).value;
	console.log( "Get Date: " + inDate );
	
	var _d = new Date();
	_d.stringDate( inDate );
	_d.stringTime( inTime );
	addRow( "Date.format()", "\"Y-m-d\"", _d.format( "Y-m-d" ), "Ok" );
	addRow( "Date.format()", "\"H:i:s\"", _d.format( "H:i:s" ) , "Ok" );
	addRow( "Date.format()", "\"d\"", _d.format( "d" ), "" );
	addRow( "Date.format()", "\"D\"", _d.format( "D" ), "" );
	addRow( "Date.format()", "\"j\"", _d.format( "j" ), "" );
	addRow( "Date.format()", "\"l\" (Lower case 'L')", _d.format( "l" ) , "" );
	addRow( "Date.format()", "\"N\"", _d.format( "N" ) , "" );
	addRow( "Date.format()", "\"S\"", _d.format( "S" ) , "" );
	addRow( "Date.format()", "\"w\"", _d.format( "w" ) , "" );
	addRow( "Date.format()", "\"z\"", _d.format( "z" ) , "" );
	addRow( "Date.format()", "\"W\"", _d.format( "W" ) , "" );
	addRow( "Date.format()", "\"F\"", _d.format( "F" ) , "" );
	addRow( "Date.format()", "\"m\"", _d.format( "m" ) , "" );
	addRow( "Date.format()", "\"M\"", _d.format( "M" ) , "" );
	addRow( "Date.format()", "\"n\"", _d.format( "n" ) , "" );
	addRow( "Date.format()", "\"t\"", _d.format( "t" ) , "" );
	addRow( "Date.format()", "\"L\"", _d.format( "L" ) , "" );
	addRow( "Date.format()", "\"o\"", _d.format( "o" ) , "" );
	addRow( "Date.format()", "\"Y\"", _d.format( "Y" ) , "" );
	addRow( "Date.format()", "\"y\"", _d.format( "y" ) , "" );
	addRow( "Date.format()", "\"a\"", _d.format( "a" ) , "" );
	addRow( "Date.format()", "\"A\"", _d.format( "A" ) , "" );
	addRow( "Date.format()", "\"B\"", _d.format( "B" ) , "" );
	addRow( "Date.format()", "\"g\"", _d.format( "g" ) , "" );
	addRow( "Date.format()", "\"G\"", _d.format( "G" ) , "" );
	addRow( "Date.format()", "\"h\"", _d.format( "h" ) , "" );
	addRow( "Date.format()", "\"H\"", _d.format( "H" ) , "" );
	addRow( "Date.format()", "\"i\"", _d.format( "i" ) , "" );
	addRow( "Date.format()", "\"s\"", _d.format( "s" ) , "" );
	addRow( "Date.format()", "\"u\"", _d.format( "u" ) , "" );
	addRow( "Date.format()", "\"e\"", _d.format( "e" ) , "" );
	addRow( "Date.format()", "\"I (Capital 'i')\"", _d.format( "I" ) , "" );
	addRow( "Date.format()", "\"O\"", _d.format( "O" ) , "" );
	addRow( "Date.format()", "\"P\"", _d.format( "P" ) , "" );
	addRow( "Date.format()", "\"T\"", _d.format( "T" ) , "" );
	addRow( "Date.format()", "\"Z\"", _d.format( "Z" ) , "" );
	addRow( "Date.format()", "\"c\"", _d.format( "c" ) , "" );
	addRow( "Date.format()", "\"r\"", _d.format( "r" ) , "" );
	addRow( "Date.format()", "\"U\"", _d.format( "U" ) , "" );
	addRow( "Date.dutyFormat()", "\"H:i:s\",\"" + inDutyDate + "\"", _d.dutyFormat("H:i:s",inDutyDate) , "" );
}
function addRow( sText, sValue1, sValue2 )
{
	var _tr = document.querySelector( "#resultTable>tbody" ).insertRow( -1 );

	for( var i = 0; i < arguments.length ; i++ ) {
		var _td = _tr.insertCell( i );
		_td.innerHTML = arguments[i];
		
	}
}
