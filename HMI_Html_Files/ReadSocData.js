var TagType_Unsigned = 10, TagType_Unsigned_Time = 11 ; // Was 50 ;
var TagType_Signed = 20, TagType_Signed_Time = 21 ; // Was 60 ;
var TagType_Double = 30, TagType_Double_Time = 31 ; // Was 70 ;
var TagType_String = 40, TagType_String_Time = 41 ; // Was 80 ;
var subscribe = 1 ;

function b64ToUint6 (nChr) 
{
	return nChr > 64 && nChr < 91 ?
		nChr - 65
		: nChr > 96 && nChr < 123 ?
		nChr - 71
		: nChr > 47 && nChr < 58 ?
		nChr + 4
		: nChr === 43 ?
		62
		: nChr === 47 ?
		63
		:
		0;
}

function base64DecToArr (sBase64, nBlocksSize) 
{
	var
		sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
		nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

	for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) 
	{
		nMod4 = nInIdx & 3;
		nUint24 |= b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
		if (nMod4 === 3 || nInLen - nInIdx === 1) 
		{
			for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) 
			{
				taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
			}
			nUint24 = 0;
		}
	}
	return taBytes;
}

function GetDtVal(DateStr, From, Chrs)
{
	var partstr = DateStr.slice(From, From + Chrs);
	if(2 == Chrs)
	{
		if("0" == partstr.charAt(0))
		{
			partstr = partstr.charAt(1);
		}
	}
	return parseInt(partstr);
}

function GetTimeDiff(TagVal)
{
	var yr, mon, dt, hr, min, sec ;

	yr = GetDtVal(TagVal, 0, 4);
	mon = GetDtVal(TagVal, 4, 2); 	mon = mon - 1 ;
	dt = GetDtVal(TagVal, 6, 2);

	hr = GetDtVal(TagVal, 8, 2);
	min = GetDtVal(TagVal, 10, 2);
	sec = GetDtVal(TagVal, 12, 2);
					
	var SrvtTime = new Date(yr, mon, dt, hr, min, sec, 0);
	var ClntTime = new Date();

	var SrvrMilli =  Date.parse(SrvtTime); 
	var ClntMilli = Date.parse(ClntTime);

	SrvrTimeDiff = SrvrMilli - ClntMilli ;
}

function UpdateTagVal(wTagID, TagVal, TagTime)
{
	var iTagCtr = 0 , nTagMax = TagArray.length ;
	
	if(0 == wTagID)
	{
		//GetTimeDiff(TagVal);
		var d = new Date()
		var n = d.getTimezoneOffset();
		SrvrTimeDiff = (n * 60000) ;
	}
	else if(1 == wTagID)
	{
		SrvrTimeZone = TagVal ;
	}
	
	for(iTagCtr = 0 ; iTagCtr < nTagMax ; iTagCtr++)
	{
		var TagObj = TagArray[iTagCtr] ;
		if(wTagID === TagObj.Idx)
		{
			TagObj.Val = TagVal ;
			//TagObj.Time = TagTime ;
			TagObj.Time = ShiftTime(TagTime, - SrvrTimeDiff)
			TagObj.bReady = true ;
			
			TagObj.ExeTrends();
			break ;
		}
	}
}

function ParseData(BaseBuf)
{
	var nLen = BaseBuf.byteLength, nPtr = 0 ;
	var nType = 0, wTagID = 0;
	var TagVal = 0, TagTime = 0 ;
	while(nPtr < nLen)
	{
		var TypeSrc = BaseBuf.slice(nPtr, nPtr + 1);
		var uiTypeSrc = new Uint8Array(TypeSrc);
		nType = uiTypeSrc[0]; nPtr += 1 ;

		var TagIDSrc = BaseBuf.slice(nPtr, nPtr + 2);
		var uiIDSrc = new Uint16Array(TagIDSrc);
		wTagID = uiIDSrc[0]; nPtr += 2 ;

		var SrcTag, SrcData ;
		var nDataStart = nPtr , nDataEnd = 0, nDataLen = 0 ;
		if((TagType_Unsigned_Time == nType) || (TagType_Unsigned == nType))
		{
			nDataLen = 0, nTmpLen = 4 ;
			nDataEnd = nDataStart + nTmpLen ;  nDataLen += nTmpLen ;
			nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
			nSrcData = new Uint32Array(nSrcTag); 

			TagVal = nSrcData[0] ;			
			if(TagType_Unsigned_Time == nType)
			{
				nDataStart = nDataEnd ; nTmpLen = 6 ;
				nDataEnd = nDataStart + nTmpLen ; nDataLen += nTmpLen ;
				nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
				nSrcData = new Uint8Array(nSrcTag);
				
				TagTime = new Date(2000 + nSrcData[0], nSrcData[1] - 1, nSrcData[2], nSrcData[3], nSrcData[4], nSrcData[5], 0);
			}			
			UpdateTagVal(wTagID, TagVal, TagTime);
		}
		else if((TagType_Signed_Time == nType) || (TagType_Signed == nType))
		{
			nDataLen = 0, nTmpLen = 4 ;
			nDataEnd = nDataStart + nTmpLen ; nDataLen += nTmpLen ;
			nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
			nSrcData = new Int32Array(nSrcTag);
			
			TagVal = nSrcData[0] ;			
			if(TagType_Signed_Time == nType)
			{
				nDataStart = nDataEnd ; nTmpLen = 6 ;
				nDataEnd = nDataStart + nTmpLen ; nDataLen += nTmpLen ;
				nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
				nSrcData = new Uint8Array(nSrcTag);
				
				TagTime = new Date(2000 + nSrcData[0], nSrcData[1] - 1, nSrcData[2], nSrcData[3], nSrcData[4], nSrcData[5], 0);
			}
			UpdateTagVal(wTagID, TagVal, TagTime);
		}
		else if((TagType_Double_Time == nType) || (TagType_Double == nType))
		{
			nDataLen = 0, nTmpLen = 8 ;
			nDataEnd = nDataStart + nTmpLen ; nDataLen += nTmpLen ;
			nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
			nSrcData = new Float64Array(nSrcTag);
			
			TagVal = nSrcData[0] ;			
			if(TagType_Double_Time == nType)
			{
				nDataStart = nDataEnd ; nTmpLen = 6 ;
				nDataEnd = nDataStart + nTmpLen ; nDataLen += nTmpLen ;
				nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
				nSrcData = new Uint8Array(nSrcTag);
				
				TagTime = new Date(2000 + nSrcData[0], nSrcData[1] - 1, nSrcData[2], nSrcData[3], nSrcData[4], nSrcData[5], 0);
			}
			UpdateTagVal(wTagID, TagVal, TagTime);
		}
		else if((TagType_String_Time == nType) || (TagType_String == nType))
		{
			var strlen = 0, nDataLen = 0 ; nTmpLen = 2 ;
			nDataEnd = nDataStart + nTmpLen ;  nDataLen += nTmpLen ;
			nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
			nSrcData = new Uint16Array(nSrcTag); 
			strlen = nSrcData[0];
			
			nDataStart = nDataEnd ; nTmpLen = strlen ;
			nDataEnd = nDataStart + nTmpLen ; nDataLen += nTmpLen ;
			nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
			nSrcData = new Uint8Array(nSrcTag); 
			var str = String.fromCharCode.apply(null, nSrcData);

			TagVal = str ;			
			if(TagType_String_Time == nType)
			{
				nDataStart = nDataEnd ; nTmpLen = 6 ;
				nDataEnd = nDataStart + nTmpLen ; nDataLen += nTmpLen ;
				nSrcTag = BaseBuf.slice(nDataStart, nDataEnd);
				nSrcData = new Uint8Array(nSrcTag);
				
				TagTime = new Date(2000 + nSrcData[0], nSrcData[1] - 1, nSrcData[2], nSrcData[3], nSrcData[4], nSrcData[5], 0);
			}
			UpdateTagVal(wTagID, TagVal, TagTime);
		}
		nPtr += nDataLen ;
	}
}

function SendToSrvr()
{
	if(1 == Connected)
	{
		var strSend = '3publish| ' ;
		strSend += WinIdx ;
		socket.send(strSend);
	}
}

function connect()
{
	var host = "ws://"; host += location.hostname ; host += ":81" ;
	try
	{
			socket = new WebSocket(host);
			socket.onopen = function()
			{
				var num = 100000 * Math.random() ;
				var dnow = new Date();
				var milli = Date.parse(dnow);
				
				var strRnd = num.toString();
				strRnd = strRnd.substr(0, 3);
				var strMilli = milli.toString();
				strMilli = strMilli.substr(6, strMilli.length - 9);
				var pseudoName = "T_" + strMilli + "_" + strRnd;
				socket.send('0'+pseudoName);
			}
			socket.onmessage = function(msg)
			{
				Connected = 1 ;
				var str = "";
				str = msg.data;
				var id  = str.substr(0, 1);
				var separator = str.indexOf("|");
				var arg1 = "", arg2 = "";
				if(separator != -1)
				{
					arg1 = str.substr(1, separator-1);
					arg2 = str.substr(separator+1);
				}
				else
				{
					arg1 = str.substr(1);				
				}
				// cases of id = 0, 1, 3, 4 ignored
				if(id == "2")
				{
					var ui8Array = base64DecToArr(arg2);
					var BaseBuf = ui8Array.buffer ;
					ParseData(BaseBuf);
				}
     			if(subscribe == 1)
				{
					socket.send('3subscribe');
					subscribe = 0; 
				}
			}
		socket.onclose = function(){
		}			
	} catch(exception){}	
}
