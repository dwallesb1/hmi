function ReadNos(nStart, nCount, Arry, Type)
{
	var nSrc, nSrcA, nEnd =  nStart + nCount ;

	nSrc = Arry.slice(nStart, nEnd);
	
	switch(Type)
	{
		case RNo.UI_8 :
			nSrcA = new Uint8Array(nSrc);	
			break ;
		case RNo.UI_16 :
			nSrcA = new Uint16Array(nSrc);	
			break ;
		case RNo.UI_32 :
			nSrcA = new Uint32Array(nSrc);	
			break ;
		case RNo.I_8 :
			nSrcA = new Int8Array(nSrc);	
			break ;
		case RNo.I_16 :
			nSrcA = new Int16Array(nSrc);	
			break ;
		case RNo.I_32 :
			nSrcA = new Int32Array(nSrc);	
			break ;
		case RNo.F_32 :
			nSrcA = new Float32Array(nSrc);	
			break ;
		case RNo.F_64 :
			nSrcA = new Float64Array(nSrc);	
			break ;
	}	
		
	ReadNos.length = 0 ;
	for(var iCtr = 0 ; iCtr < nSrcA.length ; iCtr++)
	{
		ReadNos[iCtr] = nSrcA[iCtr];
	}
}

function GetColor(r, g, b)
{
	var cClr = "RGB(" + r + "," + g + "," + b + ")";
	return cClr ;
}

function ParseRect(nSrcShp)
{
	var Id = Shp_Rect, lvl, PrtId, x, y, w, h, lw, CRad, f, b, f1clr, f2clr, lclr ;

	var nDataStart = 0, nDataLen ;

	nDataLen = 1 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;
	
	var lvl = ReadNos[0];
		
	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32); nDataStart += nDataLen ;

	var PrtId = ReadNos[0];

	nDataLen = 8 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;

	x = ReadNos[0];
	y = ReadNos[1];
	w = ReadNos[2];
	h = ReadNos[3];
		
	nDataLen = 13 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8); nDataStart += nDataLen ;

	lw = ReadNos[0];
	CRad = ReadNos[1];
	f = ReadNos[2];
	b = ReadNos[3];
	f1clr = GetColor(ReadNos[4], ReadNos[5], ReadNos[6]);
	f2clr = GetColor(ReadNos[7], ReadNos[8], ReadNos[9]);
	lclr = GetColor(ReadNos[10], ReadNos[11], ReadNos[12]);
	
	AddRect(Id, lvl, PrtId, x, y, w, h, lw, CRad, f, b, f1clr, f2clr, lclr);
}

function 	ParseEllipse(nSrcShp)
{
	var Id, lvl, PrtId, xCtr, yCtr, xRad, yRad, lw, f, b, f1clr, f2clr, lclr ;
	
	var nDataStart = 0, nDataLen ;
	
	Id = Shp_Ellipse ;
	
	nDataLen = 1 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32); nDataStart += nDataLen ;

	PrtId = ReadNos[0];
	
	nDataLen = 8 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;
		
	xCtr = ReadNos[0];
	yCtr = ReadNos[1];
	xRad = ReadNos[2];
	yRad  = ReadNos[3];
		
	nDataLen = 12 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8); nDataStart += nDataLen ;

	lw = ReadNos[0];
	f = ReadNos[1];
	b = ReadNos[2];
	f1clr = GetColor(ReadNos[3], ReadNos[4], ReadNos[5]);
	f2clr = GetColor(ReadNos[6], ReadNos[7], ReadNos[8]);
	lclr = GetColor(ReadNos[9], ReadNos[10], ReadNos[11]);
	
	AddEllipse(Id, lvl, PrtId, xCtr, yCtr, xRad, yRad, lw, f, b, f1clr, f2clr, lclr);
}

function 	ParseLine(nSrcShp)
{
	var Id, lvl, PrtId, x1, y1, x2, y2, RtoReqd, lw, lclr ;
	
	var nDataStart = 0, nDataLen ;

	Id = Shp_Line ;
	
	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	PrtId = ReadNos[0];
	
	nDataLen = 8 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;
	
	x1 = ReadNos[0];
	y1 = ReadNos[1];
	x2 = ReadNos[2];
	y2 = ReadNos[3];
		
	nDataLen = 5 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	RtoReqd = ReadNos[0];
	lw = ReadNos[1];
	lclr = GetColor(ReadNos[2], ReadNos[3], ReadNos[4]);
	
	AddLine(Id, lvl, PrtId, x1, y1, x2, y2, RtoReqd, lw, lclr);
}

function 	ParsePolyline(nSrcShp)
{
	var Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, lclr ;
	var nDataStart = 0, nDataLen ;
	
	Id = Shp_Polyline ;
	
	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	PrtId = ReadNos[0];
	
	nDataLen = 8 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	x = ReadNos[0];
	y = ReadNos[1];
	w = ReadNos[2];
	h = ReadNos[3];
	
	nDataLen = 5 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	RtoReqd = ReadNos[0];
	lw = ReadNos[1];
	lclr = GetColor(ReadNos[2], ReadNos[3], ReadNos[4]);

	AddPolyLine(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, lclr);
}

function 	ParsePolygon(nSrcShp)
{
	var Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, f, b, f1clr, f2clr, lclr ;
	var nDataStart = 0, nDataLen ;

	Id = Shp_Polygon ;

	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	PrtId = ReadNos[0];

	nDataLen = 8 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	x = ReadNos[0];
	y = ReadNos[1];
	w = ReadNos[2];
	h = ReadNos[3];

	nDataLen = 13 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	RtoReqd = ReadNos[0];
	lw = ReadNos[1];
	f = ReadNos[2];
	b = ReadNos[3];
	
	f1clr = GetColor(ReadNos[4], ReadNos[5], ReadNos[6]);
	f2clr = GetColor(ReadNos[7], ReadNos[8], ReadNos[9]);
	lclr = GetColor(ReadNos[10], ReadNos[11], ReadNos[12]);

	AddPolygon(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, f, b, f1clr, f2clr, lclr);
}

function 	ParseText(nSrcShp)
{
	var Id, lvl, PrtId, x, y, w, h, FntSz, Bold, Align, tclr ;
	var nDataStart = 0, nDataLen ;

	Id = Shp_Text ;

	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	PrtId = ReadNos[0];

	nDataLen = 8 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	x = ReadNos[0];
	y = ReadNos[1];
	w = ReadNos[2];
	h = ReadNos[3];

	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.I_8);	
	nDataStart += nDataLen ;

	FntSz = ReadNos[0];

	nDataLen = 5 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	Bold = ReadNos[0];
	Align= ReadNos[1];
	tclr = GetColor(ReadNos[2], ReadNos[3], ReadNos[4]);

	AddText(Id, lvl, PrtId, x, y, w, h, FntSz, Bold, Align, tclr);	
}

function 	ParseArc(nSrcShp)
{
	var Id, lvl, PrtId, xCtr, yCtr, Radius, lw, clk, f, b, closed, ArcType, f1clr, f2clr, lclr, StAng, EndAng ;
	var nDataStart = 0, nDataLen ;

	Id = Shp_Arc ;

	nDataLen = 1 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32); nDataStart += nDataLen ;

	PrtId = ReadNos[0];

	nDataLen = 6 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;

	xCtr = ReadNos[0];
	yCtr = ReadNos[1];
	Radius = ReadNos[2];

	nDataLen = 15 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8); nDataStart += nDataLen ;

	lw = ReadNos[0];
	clk = ReadNos[1];
	f = ReadNos[2];
	b = ReadNos[3];
	closed = ReadNos[4];
	ArcType = ReadNos[5];
	
	f1clr = GetColor(ReadNos[6], ReadNos[7], ReadNos[8]);
	f2clr = GetColor(ReadNos[9], ReadNos[10], ReadNos[11]);
	lclr = GetColor(ReadNos[12], ReadNos[13], ReadNos[14]);
		
	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.I_16);	 nDataStart += nDataLen ;

	StAng = ReadNos[0];
	EndAng = ReadNos[1];
	
	AddArc(Id, lvl, PrtId, xCtr, yCtr, Radius, lw, clk, f, b, closed, ArcType, f1clr, f2clr, lclr, StAng, EndAng);
}

function 	ParseImg(nSrcShp)
{
	var Id, lvl, PrtId, x, y, w, h ;
	var nDataStart = 0, nDataLen ;

	Id = Shp_Bitmap ;

	nDataLen = 1 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32); nDataStart += nDataLen ;

	PrtId = ReadNos[0];

	nDataLen = 8 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;

	x = ReadNos[0];
	y = ReadNos[1];
	w = ReadNos[2];
	h = ReadNos[3];

	AddBitmap(Id, lvl, PrtId, x, y, w, h);
}

function 	ParseGroup(nSrcShp)
{
	var Id, lvl, PrtId, GroupId ;
	var nDataStart = 0, nDataLen ;

	Id = Shp_Group ;

	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	lvl = ReadNos[0];
		
	nDataLen = 8 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	PrtId = ReadNos[0];
	GroupId = ReadNos[1];
	
	AddGroup(Id, lvl, PrtId, GroupId);
}

function 	ParseTrend(nSrcShp)
{
	var Id, lvl, PrtId, x, y, w, h, lw, f, b, f1Clr, f2Clr, lClr ;
	var UpdateRate, TimeSpan, Orient, ScrollDir, VScaleType ;
	var nValGrids, nSubValGrids, nTimeGrids, nSubTimeGrids ;
	var ValLblPos, TimeLblPos ;
	var ValMin, ValMax ;
	var ValGridClr, TimeGridClr, ValSubGridClr, TimeSubGridClr ;
	var TimeLblClr, ValLblClr ;
	var nPens ;
	

	var nDataStart = 0, nDataLen ;

	Id = Shp_Trend ;

	nDataLen = 1 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;
	lvl = ReadNos[0];

	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32); nDataStart += nDataLen ;
	PrtId = ReadNos[0];

	nDataLen = 10 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;
	x = ReadNos[0];
	y = ReadNos[1];
	w = ReadNos[2];
	h = ReadNos[3];

	UpdateRate = ReadNos[4];

	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32); nDataStart += nDataLen ;
	TimeSpan = ReadNos[0];

	nDataLen = 13 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;
	lw = ReadNos[0];
	f = ReadNos[1];
	b = ReadNos[2];
	Orient = ReadNos[3];
	ScrollDir = ReadNos[4];
	VScaleType = ReadNos[5];
	nValGrids = ReadNos[6];
	nTimeGrids = ReadNos[7];
	nSubValGrids = ReadNos[8];
	nSubTimeGrids = ReadNos[9];
	ValLblPos = ReadNos[10];
	TimeLblPos = ReadNos[11];
	nPens = ReadNos[12]; 

	nDataLen = 16 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.F_64);	nDataStart += nDataLen ;
	ValMin = ReadNos[0];
	ValMax = ReadNos[1];

	nDataLen = 27 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8); nDataStart += nDataLen ;
	f1Clr = GetColor(ReadNos[0], ReadNos[1], ReadNos[2]);
	f2Clr = GetColor(ReadNos[3], ReadNos[4], ReadNos[5]);
	lClr = GetColor(ReadNos[6], ReadNos[7], ReadNos[8]);

	ValGridClr = GetColor(ReadNos[9], ReadNos[10], ReadNos[11]);
	TimeGridClr = GetColor(ReadNos[12], ReadNos[13], ReadNos[14]);
	ValSubGridClr = GetColor(ReadNos[15], ReadNos[16], ReadNos[17]);
	TimeSubGridClr = GetColor(ReadNos[18], ReadNos[19], ReadNos[20]);
	TimeLblClr = GetColor(ReadNos[21], ReadNos[22], ReadNos[23]);
	ValLblClr = GetColor(ReadNos[24], ReadNos[25], ReadNos[26]);

	AddTrend(Id, lvl, PrtId, x, y, w, h, lw, f, b, f1Clr, f2Clr, lClr);
	LstShape.SetGrid(nValGrids, ValGridClr, nSubValGrids, ValSubGridClr, nTimeGrids, TimeGridClr, nSubTimeGrids, TimeSubGridClr);
	LstShape.SetVals(ValMin, ValMax, VScaleType);
	LstShape.SetLblClrs(TimeLblClr, ValLblClr);
	LstShape.SetTimes(UpdateRate, TimeSpan);
	LstShape.SetLblPos(TimeLblPos, ValLblPos);
	LstShape.SetOrient(Orient, ScrollDir); 

	bProcessAnims = true ;
	return nPens ;
}

function 	ParseTrendPen(nSrcShp)
{
	var TagID, PenClr, lw, ValMin, ValMax, PosMin, PosMax ;
	var nDataStart = 0, nDataLen ;
	
	nDataLen = 2 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;
	TagID = ReadNos[0];
	
	nDataLen = 6 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;
	lw = ReadNos[0];
	PosMin = ReadNos[1];
	PosMax = ReadNos[2];	
	PenClr = GetColor(ReadNos[3], ReadNos[4], ReadNos[5]);
	
	nDataLen = 16 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.F_64);	nDataStart += nDataLen ;
	ValMin = ReadNos[0];
	ValMax = ReadNos[1];
	
	if(Scale_One == LstShape.VScale)
	{
		LstShape.AddPen(TagID, PenClr, lw);
	}
	else
	{
		LstShape.AddPen_S(TagID, PenClr, lw, ValMin, ValMax, PosMin, PosMax);
	}
}

function 	ParseAnimMove(nMoveType, nSrcShp)
{
	var Id, TagIdx, ShpIdx, ShpType, PosMin, PosMax, ValMin, ValMax ;
	var nDataStart = 0, nDataLen ;
	
	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	Id = nMoveType ;
	TagIdx = ReadNos[0];	
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	ShpIdx = ReadNos[0];
	
	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	ShpType = ReadNos[0];

	nDataLen = 32 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.F_64);	
	nDataStart += nDataLen ;

	PosMin = ReadNos[0];
	PosMax = ReadNos[1];	
	ValMin = ReadNos[2];
	ValMax = ReadNos[3];
	
	AddMoveAnim(LstShape, Id, TagIdx, ShpIdx, ShpType, PosMin, PosMax, ValMin, ValMax);
}

function 	ParseAnimVisibility(nSrcShp)
{
	var Id, TagIdx, ShpIdx, ShpType, VisiType, ValMin, ValMax ;
	var nDataStart = 0, nDataLen ;

	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	Id = 57 ;
	TagIdx = ReadNos[0];	
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	ShpIdx = ReadNos[0];
	
	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	ShpType = ReadNos[0];	
	VisiType = ReadNos[1];

	nDataLen = 16 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.F_64);	
	nDataStart += nDataLen ;

	ValMin = ReadNos[0];
	ValMax = ReadNos[1];	

	AddVisiAnim(LstShape, Id, TagIdx, ShpIdx, ShpType, VisiType, ValMin, ValMax);
}

function 	ParseAnimVal(nSrcShp)
{
	var Id, TagIdx, ShpIdx, ShpType, ShowType ;
	var nDataStart = 0, nDataLen ;
	
	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	Id = Anim_ShowVal ;
	TagIdx = ReadNos[0];	

	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	ShpIdx = ReadNos[0];
	
	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	ShpType = ReadNos[0];
	ShowType = ReadNos[1];

	AddShowVal(LstShape, Id, TagIdx, ShpIdx, ShpType, ShowType);
	
	return ShowType ;
}

function 	ParseAnimRotate(nSrcShp)
{
	var Id, TagIdx, ShpIdx, ShpType, xCtr, yCtr, ValMin, ValMax, AngMin, AngMax, RotType, RotDir ;
	var nDataStart = 0, nDataLen ;

	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;
	
	Id = Anim_Rotate ;
	TagIdx = ReadNos[0];	
	
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	ShpIdx = ReadNos[0];
	
	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	ShpType = ReadNos[0];
	
	nDataLen = 48 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.F_64);	
	nDataStart += nDataLen ;
	
	xCtr = ReadNos[0] ;
	yCtr = ReadNos[1] ;
	ValMin = ReadNos[2];
	ValMax = ReadNos[3];	
	AngMin = ReadNos[4];
	AngMax = ReadNos[5];	
	
	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;
	
	RotType = ReadNos[0] ;
	RotDir = ReadNos[1] ;

	AddRotateAnim(LstShape, Id, TagIdx, ShpIdx, ShpType, xCtr, yCtr, ValMin, ValMax, AngMin, AngMax, RotType, RotDir );
}

function 	ParseAnimClr(nSrcShp)
{
	var Id, TagIdx, ShpIdx, ShpType ;
	var nDataStart = 0, nDataLen ;

	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	Id = Anim_Color ;
	TagIdx = ReadNos[0];	
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	ShpIdx = ReadNos[0];
	
	nDataLen = 1 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	ShpType = ReadNos[0];
	
	var nRtnAnim = AddColorAnim(LstShape, Id, TagIdx, ShpIdx, ShpType);
	return nRtnAnim ;
}

function 	ParseAnimSize(nSizeType, nSrcShp)
{
	var Id, TagIdx, ShpIdx, ShpType, AncType, Dir, PosMin, PosMax, ValMin, ValMax ;
	var nDataStart = 0, nDataLen ;
	
	nDataLen = 2 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16);	
	nDataStart += nDataLen ;

	Id = nSizeType ;
	TagIdx = ReadNos[0];
		
	nDataLen = 4 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32);	
	nDataStart += nDataLen ;

	ShpIdx = ReadNos[0];
	
	nDataLen = 3 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	
	nDataStart += nDataLen ;

	ShpType = ReadNos[0];	
	AncType = ReadNos[1];
	Dir = ReadNos[2];
	
	nDataLen = 32 ;
	ReadNos(nDataStart, nDataLen, nSrcShp, RNo.F_64);	
	nDataStart += nDataLen ;

	PosMin = ReadNos[0];	
	PosMax = ReadNos[1];	
	ValMin = ReadNos[2];
	ValMax = ReadNos[3];

	AddSizeAnim(LstShape, Id, TagIdx, ShpIdx, ShpType, AncType, Dir, PosMin, PosMax, ValMin, ValMax);
}

function 	ParseAnimBlink(nSrcShp)
{
	var Id, TagIdx, ShpIdx, ShpType, BlinkBits, ValMin, ValMax, BClrOn, BClrOff, IClrOn, IClrOff, TClrOn, TClrOff ;
	
	var nDataStart = 0, nDataLen ;

	nDataLen = 2 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;
	
	Id = Anim_Blink ; TagIdx = ReadNos[0];	
	
	nDataLen = 4 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_32); nDataStart += nDataLen ;

	ShpIdx = ReadNos[0];
	
	nDataLen = 1 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8);	 nDataStart += nDataLen ;

	ShpType = ReadNos[0];	
	
	nDataLen = 2 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_16); nDataStart += nDataLen ;

	BlinkBits = ReadNos[0];	

	nDataLen = 16 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.F_64); nDataStart += nDataLen ;

	ValMin = ReadNos[0]; ValMax = ReadNos[1];	

	nDataLen = 18 ; ReadNos(nDataStart, nDataLen, nSrcShp, RNo.UI_8); nDataStart += nDataLen ;

	BClrOn = GetColor(ReadNos[0], ReadNos[1], ReadNos[2]);
	BClrOff = GetColor(ReadNos[3], ReadNos[4], ReadNos[5]);

	IClrOn = GetColor(ReadNos[6], ReadNos[7], ReadNos[8]);
	IClrOff = GetColor(ReadNos[9], ReadNos[10], ReadNos[11]);

	TClrOn = GetColor(ReadNos[12], ReadNos[13], ReadNos[14]);
	TClrOff = GetColor(ReadNos[15], ReadNos[16], ReadNos[17]);

	AddBlinkAnim(LstShape, Id, TagIdx, ShpIdx, ShpType, BlinkBits, ValMin, ValMax, BClrOn, BClrOff, IClrOn, IClrOff, TClrOn, TClrOff);
}

function ReadHMIData()
{			
	if(XMLHttpOk == 0) {return ;}
	if(RespReq_hmi == 1){return ;}
	
	xmlhttp_hmi = null ;
	if (window.XMLHttpRequest)
	{
		xmlhttp_hmi = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		xmlhttp_hmi = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if (xmlhttp_hmi != null)
	{
		xmlhttp_hmi.onload = function (oEvent) 
		{
			var SrcArray = this.response ;
			if(SrcArray)
			{
				var nSrcA = new Uint8Array(SrcArray);
				var nSrcShp, SrcLen = SrcArray.byteLength ;
				var nType = 0, nPtr = 0, iCtr = 0, nDataLen = 0 ;
				while(nPtr < SrcLen)
				{
					var nSrc = SrcArray.slice(nPtr, nPtr + 1);
					var nSrcA = new Uint8Array(nSrc);
					nType = nSrcA[0];
					nPtr += 1 ;
					if(nType < 50)
					{
						var nDataStart = nPtr , nDataEnd = 0 ;
						switch(nType)
						{
							case Shp_Rect :
								{
									nDataLen = 26 ;
									nDataEnd = nDataStart + nDataLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParseRect(nSrcShp);
								}
								break ;
							case Shp_Ellipse :
								{
									nDataLen = 25 ;
									nDataEnd = nDataStart + nDataLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParseEllipse(nSrcShp);
								}
								break ;
							case Shp_Line :
								{
									nDataLen = 18 ;
									nDataEnd = nDataStart + nDataLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParseLine(nSrcShp);
								}
								break ;
							case Shp_Polyline :
								{
									var nMovePoly = 20, nMoveData = 0 ;
									nDataEnd = nDataStart + nMovePoly  ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParsePolyline(nSrcShp);
									nDataStart += nMovePoly ;
									
									var nPolyBytes = nSrcShp.slice(18, 20);
									var nPtsCtAry = new Uint16Array(nPolyBytes);
									var nPtsCount = nPtsCtAry[0];
									nMoveData = nPtsCount * 4 ;

									nDataEnd = nDataStart + nMoveData ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									var PolyPts = new Uint16Array(nSrcShp);
									
									var PtsArray = new Array();
									nPtsCount = nPtsCount * 2 ;
									for(var iCtr = 0 ; iCtr < nPtsCount ; iCtr += 2)
									{
										var x, y ;
										x =  PolyPts[iCtr];
										y = PolyPts[iCtr + 1];
										PtsArray[iCtr] = x;
										PtsArray[iCtr + 1] = y;
									}			
									LstShape.PtrArray = PtsArray ;
									nDataLen = nMovePoly +  nMoveData ;
								}
								break ;
							case Shp_Polygon :
								{
									var nMovePoly = 28, nMoveData = 0 ;
									
									nDataEnd = nDataStart + nMovePoly  ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParsePolygon(nSrcShp);
									nDataStart += nMovePoly ;

									var nPolyBytes = nSrcShp.slice(26, 28);
									var nPtsCtAry = new Uint16Array(nPolyBytes);
									var nPtsCount = nPtsCtAry[0];
									nMoveData = nPtsCount * 4 ;

									nDataEnd = nDataStart + nMoveData ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									var PolyPts = new Uint16Array(nSrcShp);
									
									var PtsArray = new Array();
									nPtsCount = nPtsCount * 2 ;
									for(var iCtr = 0 ; iCtr < nPtsCount ; iCtr += 2)
									{
										var x, y ;
										x =  PolyPts[iCtr];
										y = PolyPts[iCtr + 1];
										PtsArray[iCtr] = x;
										PtsArray[iCtr + 1] = y;
									}
									LstShape.PtrArray = PtsArray ;
									nDataLen = nMovePoly +  nMoveData ;								
								}
								break ;
							case Shp_Text :
								{
									var nTmpLen = 19, nTxtLen, vLenBytes, vTxtBytes ;
									var strTxt, strFont ;
									nDataLen = 0 ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParseText(nSrcShp);
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;
									
									nTmpLen = 2 ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									vLenBytes = new Uint16Array(nSrcShp);
									nTxtLen = vLenBytes[0];
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;
									
									nTxtLen = 2 * nTxtLen ;
									nTmpLen = nTxtLen ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									vTxtBytes = new Uint16Array(nSrcShp); 
									strTxt = String.fromCharCode.apply(null, vTxtBytes);
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;

									nTmpLen = 2 ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									vLenBytes = new Uint16Array(nSrcShp);
									nTxtLen = vLenBytes[0];
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;
									
									nTxtLen = 2 * nTxtLen ;
									nTmpLen = nTxtLen ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									vTxtBytes = new Uint16Array(nSrcShp); 
									strFont = String.fromCharCode.apply(null, vTxtBytes);
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;
									
									LstShape.strText = strTxt ;
									LstShape.strFont = strFont ;
								}
								break ;								
							case Shp_Arc :
								{
									nDataLen = 30 ;
									nDataEnd = nDataStart + nDataLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParseArc(nSrcShp);
								}
								break ;
							case Shp_Bitmap :
								{
									var nTmpLen = 13, nTxtLen, vLenBytes, vTxtBytes ;
									var strImage ;							
									nDataLen = 0 ;

									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParseImg(nSrcShp);
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;
									
									nTmpLen = 2 ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									vLenBytes = new Uint16Array(nSrcShp);
									nTxtLen = vLenBytes[0];
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;
									
									nTxtLen = 2 * nTxtLen ;
									nTmpLen = nTxtLen ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									vTxtBytes = new Uint16Array(nSrcShp); 
									strImage = String.fromCharCode.apply(null, vTxtBytes);
									nDataLen += nTmpLen ;
									nDataStart += nTmpLen ;

									LstShape.strImage = strImage ;
								}
								break ;								
							case Shp_Group :
								{
									nDataLen = 9 ;
									nDataEnd = nDataStart + nDataLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									ParseGroup(nSrcShp);
								}
								break ;
							case Shp_Trend :
								{
									var nTmpLen = 75 ; nDataLen = nTmpLen ;
									var PenCtr = 0, nMaxPens = 0 ;
									nDataEnd = nDataStart + nTmpLen ;
									nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
									nMaxPens = ParseTrend(nSrcShp);
									
									for(PenCtr = 0 ; PenCtr < nMaxPens ; PenCtr++)
									{
										nDataStart += nTmpLen ;
										nTmpLen = 24 ; nDataLen += nTmpLen ;
										nDataEnd = nDataStart + nTmpLen ;
										nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
										ParseTrendPen(nSrcShp);
									}
								}
								break ;
						}
						nPtr += nDataLen ;
					}
					else if(nType < 70)
					{
						var nDataStart = nPtr , nDataEnd = 0 ;
						if(Anim_Tag == nType)
						{
							var Idx, AnimType, Type, Val = 0 ;
							var CumLen = 0 ;

							nDataLen = 2 ;
							ReadNos(nDataStart, nDataLen, SrcArray, RNo.UI_8); CumLen += nDataLen ; nDataStart += nDataLen ;
															
							Type = ReadNos[0];
							AnimType = ReadNos[1];
							
							nDataLen = 2 ;
							ReadNos(nDataStart, nDataLen, SrcArray, RNo.UI_16); CumLen += nDataLen ; nDataStart += nDataLen ;
							
							Idx = ReadNos[0];
							
							AddTag(Idx, AnimType, Type, Val);
							
							nDataLen = CumLen ;
						}
						else if((Anim_MoveX == nType) || (Anim_MoveY == nType))
						{
							nDataLen = 39 ;
							nDataEnd = nDataStart + nDataLen ;
							nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
							ParseAnimMove(nType, nSrcShp);
						}
						else if((Anim_SizeX == nType) || (Anim_SizeY == nType))
						{
							nDataLen = 41 ;
							nDataEnd = nDataStart + nDataLen ;
							nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
							ParseAnimSize(nType, nSrcShp);
						}
						else if(Anim_Visi == nType)
						{
							nDataLen = 24 ;
							nDataEnd = nDataStart + nDataLen ;
							nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
							ParseAnimVisibility(nSrcShp);
						}
						else if(Anim_Blink == nType)
						{
							nDataLen = 43 ;
							nDataEnd = nDataStart + nDataLen ;
							nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
							ParseAnimBlink(nSrcShp);
						}
						else if(Anim_Rotate == nType)
						{
							nDataLen = 57 ;
							nDataEnd = nDataStart + nDataLen ;
							nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
							ParseAnimRotate(nSrcShp);
						}
						else if(Anim_ShowVal == nType)
						{
							var nTmpLen = 8, nTxtLen, vLenBytes, vTxtBytes ;
							var strOnText, strOffText, ShowType ;
							nDataLen = 0 ;
							nDataEnd = nDataStart + nTmpLen ;
							nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
							ShowType = ParseAnimVal(nSrcShp);
							nDataLen += nTmpLen ;
							nDataStart += nTmpLen ;
							
							if(1 == ShowType)		// Discrete Val
							{
								nTmpLen = 2 ;
								nDataEnd = nDataStart + nTmpLen ;
								nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
								vLenBytes = new Uint16Array(nSrcShp);
								nTxtLen = vLenBytes[0];
								nDataLen += nTmpLen ;
								nDataStart += nTmpLen ;
								
								nTxtLen = 2 * nTxtLen ;
								nTmpLen = nTxtLen ;
								nDataEnd = nDataStart + nTmpLen ;
								nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
								vTxtBytes = new Uint16Array(nSrcShp); 
								strOnText = String.fromCharCode.apply(null, vTxtBytes);
								nDataLen += nTmpLen ;
								nDataStart += nTmpLen ;

								nTmpLen = 2 ;
								nDataEnd = nDataStart + nTmpLen ;
								nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
								vLenBytes = new Uint16Array(nSrcShp);
								nTxtLen = vLenBytes[0];
								nDataLen += nTmpLen ;
								nDataStart += nTmpLen ;
								
								nTxtLen = 2 * nTxtLen ;
								nTmpLen = nTxtLen ;
								nDataEnd = nDataStart + nTmpLen ;
								nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
								vTxtBytes = new Uint16Array(nSrcShp); 
								strOffText = String.fromCharCode.apply(null, vTxtBytes);
								nDataLen += nTmpLen ;
								nDataStart += nTmpLen ;
								
								LstShape.SetOnOffTxt(strOnText, strOffText);
							}							
						}
						else if(Anim_Color == nType)	
						{
							var CumLen = 0, nClrs ;
							var ThisClrAnim = 0 ;
							
							nDataLen = 7 ;
							nDataEnd = nDataStart + nDataLen ;
							nSrcShp = SrcArray.slice(nDataStart, nDataEnd);
							ThisClrAnim = ParseAnimClr(nSrcShp);
							nDataStart += nDataLen ;
							CumLen += nDataLen ;

							nDataLen = 1 ;
							ReadNos(nDataStart, nDataLen, SrcArray, RNo.UI_8);
							nDataStart += nDataLen ;
							CumLen += nDataLen ;
							nClrs = ReadNos[0];
							
							if(nClrs > 0)
							{
								nDataLen = nClrs * 8 ;
								ReadNos(nDataStart, nDataLen, SrcArray, RNo.F_64);
								nDataStart += nDataLen ;
								CumLen += nDataLen ;
								
								var ValArry = new Array();
								for(var iCtr = 0 ; iCtr < nClrs ; iCtr++)
								{
									ValArry[iCtr] = ReadNos[iCtr] ;
								}
								ThisClrAnim.FValAry = ValArry ;

								nDataLen = nClrs * 3 ;
								ReadNos(nDataStart, nDataLen, SrcArray, RNo.UI_8);
								nDataStart += nDataLen ;
								CumLen += nDataLen ;

								var ColorArry = new Array();
								var nBytes = nClrs * 3 ;
								var TmpIdx = 0 ;
								for(var iCtr = 0 ; iCtr < nBytes ; iCtr += 3)
								{
									var r = ReadNos[iCtr] ;
									var g = ReadNos[iCtr + 1] ;
									var b = ReadNos[iCtr + 2] ;
									
									ColorArry[TmpIdx++] = GetColor(r, g, b);
								}
								ThisClrAnim.FClrAry = ColorArry ;
							}
							nDataLen = 1 ;
							ReadNos(nDataStart, nDataLen, SrcArray, RNo.UI_8);
							nClrs = ReadNos[0];
							nDataStart += nDataLen ;
							CumLen += nDataLen ;
							
							if(nClrs > 0)
							{
								nDataLen = nClrs * 8 ;
								ReadNos(nDataStart, nDataLen, SrcArray, RNo.F_64);
								nDataStart += nDataLen ;
								CumLen += nDataLen ;
								
								var ValArry = new Array();
								for(var iCtr = 0 ; iCtr < nClrs ; iCtr++)
								{
									ValArry[iCtr] = ReadNos[iCtr] ;
								}
								ThisClrAnim.BValAry = ValArry ;

								nDataLen = nClrs * 3 ;
								ReadNos(nDataStart, nDataLen, SrcArray, RNo.UI_8);
								nDataStart += nDataLen ;
								CumLen += nDataLen ;
								
								var ColorArry = new Array();
								var nBytes = nClrs * 3 ;
								var TmpIdx = 0 ;
								for(var iCtr = 0 ; iCtr < nBytes ; iCtr += 3)
								{
									var r = ReadNos[iCtr] ;
									var g = ReadNos[iCtr + 1] ;
									var b = ReadNos[iCtr + 2] ;
									
									ColorArry[TmpIdx++] = GetColor(r, g, b);
								}
								ThisClrAnim.BClrAry = ColorArry ;
							}
							nDataLen = CumLen ;
						}
						nPtr += nDataLen ;
					}
				}
				RespReq_hmi = 0 ;
			}
		}
		var url = "http://" + location.hostname + "/" + ShapeFile ;
		xmlhttp_hmi.open("GET", url, true); xmlhttp_hmi.send(null);
		xmlhttp_hmi.responseType = 'arraybuffer';
		RespReq_hmi = 1 ;
	}
	else
	{
		XMLHttpOk = 0 ;
	}
}

function ReadTagData()
{			
	if(XMLHttpOk == 0) {return ;}
	
	if(RespReq_tags == 1){return ;}

	xmlhttp_tags = null ;
	if (window.XMLHttpRequest)
	{
		xmlhttp_tags = new XMLHttpRequest();
	}
	else if (window.ActiveXObject)
	{
		xmlhttp_tags = new ActiveXObject("Microsoft.XMLHTTP"); // IE
	}
	if (xmlhttp_tags != null)
	{		
		xmlhttp_tags.onload = function (oEvent) 
		{
			var SrcArray = this.response;
			
			if (SrcArray) 
			{
				var SrcLen = SrcArray.byteLength ;

				var nType = 0, nPtr = 0, iCtr = 0 ;
				while(nPtr < SrcLen)
				{
					var nTag = TagArray[iCtr] ;

					var nSrc = SrcArray.slice(nPtr, nPtr + 1);
					var nSrcA = new Uint8Array(nSrc);
					nType = nSrcA[0];
					nPtr += 1 ;
					var nDataStart = nPtr , nDataEnd = 0 ;
					if(10 == nType)
					{
						nDataEnd = nDataStart + 4 ;
						nSrc = SrcArray.slice(nDataStart, nDataEnd);
						nSrcA = new Uint32Array(nSrc); 
						if(nTag.Val != nSrcA[0])
						{
							nTag.Val = nSrcA[0];
							nTag.bReady = true ;
						}
						 iCtr++ ;
						nPtr += 4 ;
					}
					else if(20 == nType)
					{
						nDataEnd = nDataStart + 4 ;
						nSrc = SrcArray.slice(nDataStart, nDataEnd);
						nSrcA = new Int32Array(nSrc);


						if(nTag.Val != nSrcA[0])
						{
							nTag.Val = nSrcA[0];
							nTag.bReady = true ;
						}
						 iCtr++ ;
						nPtr += 4 ;
					}
					else if(30 == nType)
					{
						nDataEnd = nDataStart + 8 ;
						nSrc = SrcArray.slice(nDataStart, nDataEnd);
						nSrcA = new Float64Array(nSrc);
						if(nTag.Val != nSrcA[0])
						{
							nTag.Val = nSrcA[0];
							nTag.bReady = true ;
						}
						 iCtr++ ;
						nPtr += 8 ;
					}
					else if(40 == nType)
					{
						var strlen = 0 ;
						nDataEnd = nDataStart + 4 ;
						nSrc = SrcArray.slice(nDataStart, nDataEnd);
						nSrcA = new Uint32Array(nSrc); 
						strlen = nSrcA[0];
						strlen = 2 * strlen ;
						
						nPtr += 4 ;
						nDataStart = nPtr ; nDataEnd = nDataStart + strlen ;
						nSrc = SrcArray.slice(nDataStart, nDataEnd);
						nSrcA = new Uint16Array(nSrc); 
						var str = String.fromCharCode.apply(null, nSrcA);
						
						if(nTag.Val != str)
						{
							nTag.Val = str ;
							nTag.bReady = true ;
						}
						 iCtr++ ;
						
						nPtr += strlen ;
					}
				}
			}
			RespReq_tags = 0 ;
		}

		var url = "http://" + location.hostname + "/" + DataFile ;		
		xmlhttp_tags.open("GET", url, true); xmlhttp_tags.send(null);
		xmlhttp_tags.responseType = "arraybuffer";
		RespReq_tags = 1 ;
	}
	else
	{
		XMLHttpOk = 0 ;
	}
}

