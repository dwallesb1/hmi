var TrndOrnt_Horz = 10 ; TrndOrnt_Vert = 20, ScrollDir_Up = 30, ScrollDir_Down = 40, ScrollDir_Left = 50;
var LblPos_None = 5, LblPos_Left = 10, LblPos_Right = 20, LblPos_Both = 30, LblPos_Top = 40, LblPos_Bottom = 50 ;
var Scale_One = 10, Scale_Multiple = 20 ;
var Grid_Main = 10, Grid_Sub = 20 ;

function PenPt(Value, Time)
{
	this.Value = Value ; this.Time = Time ;
	this.x = 0 ; this.y = 0 ;
}

function iTPen(tObj, TagID, lClr, lw, ValMin, ValMax, PosMin_Pct, PosMax_Pct)
{
	this.tObj = tObj ;
	this.TagID = TagID ;
	this.lClr = lClr ; this.lw = lw ;
	this.ValMin = ValMin ; this.ValMax = ValMax ;
	this.PosMin_Pct = PosMin_Pct ; this.PosMax_Pct = PosMax_Pct ;
	this.PosMin = 0 ; this.PosMax = 0 ; this.ValueRatio = 0 ;
	this.Pts = new Array();
	this.xLast = 0 ; this.yLast = 0 ;
	this.bDel = false ;
}

iTPen.prototype.AddPoint = function(Value, Time)
{
	var pTrend = this.tObj ;
	if(Scale_One == pTrend.VScale)
	{
		if(Value < pTrend.ValMin) { Value = pTrend.ValMin ; }
		if(Value > pTrend.ValMax) { Value = pTrend.ValMax ; }
		this.Pts.push(new PenPt(Value, Time));
		this.DelPoints();
	}
	else
	{
		if(Value < this.ValMin) { Value = this.ValMin ; }
		if(Value > this.ValMax) { Value = this.ValMax ; }
		this.Pts.push(new PenPt(Value, Time));
		this.DelPoints();
	}	
}

iTPen.prototype.ExeAnim = function(TagObj)
{
	this.AddPoint(TagObj.Val, TagObj.Time);
}

iTPen.prototype.DelPoints = function()
{
	var Points = this.Pts ; var pTrend = this.tObj ;
	if(Points.length > 0)
	{	
		var nMax = Points.length ;
		var bDeleted = true ;
		while(bDeleted && (nMax > 0))
		{
			bDeleted = false ;
			if(Points[0].Time < pTrend.StTime)
			{
				var ValDiff = 0 ;
				if(Scale_One == pTrend.VScale)
				{
					ValDiff = Points[0].Value - pTrend.ValMin ;
				}
				else
				{
					ValDiff = Points[0].Value - this.ValMin ;
				}
				if(TrndOrnt_Horz == pTrend.Orientation)
				{
					this.yLast = this.GetValPt(ValDiff);
				}
				else
				{
					this.xLast = this.GetValPt(ValDiff);					
				}

				Points.shift();
				bDeleted = true ; this.bDel = true ;
				nMax = Points.length ;
			}
		}
	}
}

iTPen.prototype.GetValPt = function(ValDiff)
{
	var ValRtn = 0, xPos = 0, yPos = 0 ;
	var pTrend = this.tObj ;
	if(TrndOrnt_Horz == pTrend.Orientation)
	{
		if(Scale_One == pTrend.VScale)
		{
			yPos = pTrend.y + pTrend.h - (ValDiff * pTrend.ValueRatio);
		}
		else
		{
			yPos = this.PosMin + (ValDiff * this.ValueRatio);
		}
		ValRtn = yPos ;
	}
	else
	{
		if(Scale_One == pTrend.VScale)
		{
			xPos = pTrend.x + (ValDiff * pTrend.ValueRatio) ;
		}
		else
		{
			xPos = this.PosMin + (ValDiff * this.ValueRatio) ;
		}
		ValRtn = xPos ;
	}
	return ValRtn ;
}

iTPen.prototype.GetTimePt = function(TimeDiff)
{
	var ValRtn = 0, xPos = 0, yPos = 0 ;
	var pTrend = this.tObj ;
	if(TrndOrnt_Horz == pTrend.Orientation)
	{
		xPos = pTrend.x + (TimeDiff * pTrend.TimeRatio) ;
		if(xPos > (pTrend.x + pTrend.w))
		{
			xPos = pTrend.x + pTrend.w ;
		}
		ValRtn = xPos ;
	}
	else
	{
		if(ScrollDir_Down == pTrend.ScrollDir)
		{
			yPos = pTrend.y + pTrend.h - (TimeDiff * pTrend.TimeRatio);
			if(yPos < pTrend.y)
			{
				yPos = pTrend.y ;
			}
		}
		else
		{
			yPos = pTrend.y + (TimeDiff * pTrend.TimeRatio);
			if(yPos > (pTrend.y + pTrend.h))
			{
				yPos = pTrend.y + pTrend.h ;
			}
		}
		ValRtn = yPos ;
	}
	return ValRtn ;
}

iTPen.prototype.Draw = function(ct)
{
	var Points = this.Pts ; var pTrend = this.tObj ;
	ct.strokeStyle = this.lClr;
	ct.lineWidth = this.lw ;
	this.DelPoints();
	ct.beginPath();
	if(Points.length > 0)
	{	
		var iNo, nMax = Points.length ;
		var xPos, yPos, xPrev, yPrev ;
		var bPtDrawn = false ;
		for(iNo = 0 ; iNo < nMax ; iNo++)
		{
			if(Points[iNo].Time < pTrend.CurTime)
			{
				var TimeDiff = Points[iNo].Time - pTrend.StTime, ValDiff = 0 ;
				if(Scale_One == pTrend.VScale)
				{
					ValDiff = Points[iNo].Value - pTrend.ValMin ;
				}
				else
				{
					ValDiff = Points[iNo].Value - this.ValMin ;
				}
				if(TrndOrnt_Horz == pTrend.Orientation)
				{
					xPos = this.GetTimePt(TimeDiff);
					yPos = this.GetValPt(ValDiff);
				}
				else
				{
					xPos = this.GetValPt(ValDiff);					
					yPos = this.GetTimePt(TimeDiff);
				}
				if(0 === iNo)
				{
					if(this.bDel)
					{
						if(TrndOrnt_Horz == pTrend.Orientation)
						{
							ct.moveTo(pTrend.x, this.yLast);
							ct.lineTo(xPos, this.yLast);
							ct.lineTo(xPos, yPos);
						}
						else
						{
							if(ScrollDir_Down == pTrend.ScrollDir)
							{
								ct.moveTo(this.xLast, (pTrend.y + pTrend.h));
							}
							else
							{
								ct.moveTo(this.xLast, pTrend.y);
							}
							ct.lineTo(this.xLast, yPos);
							ct.lineTo(xPos, yPos);
						}
					}
					else
					{
						ct.moveTo(xPos, yPos);
					}
					bPtDrawn = true ;
				}
				else
				{
					if(TrndOrnt_Horz == pTrend.Orientation)
					{
						ct.lineTo(xPos, yPrev);
					}
					else
					{
						ct.lineTo(xPrev, yPos);
					}
					ct.lineTo(xPos, yPos);
				}
				xPrev = xPos ; yPrev = yPos ;
			}
		}
		if(bPtDrawn)
		{
			if(TrndOrnt_Horz == pTrend.Orientation)
			{
				if(xPos < (pTrend.x + pTrend.w))
				{
					ct.lineTo(pTrend.x + pTrend.w, yPos);
				}
			}
			else
			{
				if(ScrollDir_Down == pTrend.ScrollDir)
				{
					if(yPos > pTrend.y)
					{
						ct.lineTo(xPos, pTrend.y);
					}
				}
				else
				{
					if(yPos < (pTrend.y + pTrend.h))
					{
						ct.lineTo(xPos, (pTrend.y + pTrend.h));
					}
				}
			}
		}
	}
	else
	{
		if(this.bDel)
		{
			if(TrndOrnt_Horz == pTrend.Orientation)
			{
				ct.moveTo(pTrend.x, this.yLast);
				ct.lineTo(pTrend.x + pTrend.w, this.yLast);
			}
			else
			{
				ct.moveTo(this.xLast, pTrend.y);
				ct.lineTo(this.xLast, pTrend.y + pTrend.h);
			}
		}
	}
	ct.stroke();
}

iTPen.prototype.Init = function()
{
	var pTrend = this.tObj ;
	if(Scale_Multiple == pTrend.VScale)
	{
		if(TrndOrnt_Horz == pTrend.Orientation)
		{
			var bottom = pTrend.y + pTrend.h ;
			this.PosMin = bottom - (pTrend.h * (this.PosMin_Pct / 100)) ; 
			this.PosMax = bottom - (pTrend.h * (this.PosMax_Pct / 100)) ;
		}
		else
		{
			this.PosMin = pTrend.x + (pTrend.w * (this.PosMin_Pct / 100)) ; 
			this.PosMax = pTrend.x + (pTrend.w * (this.PosMax_Pct / 100)) ; 
		}
		this.ValueRatio =  (this.PosMax - this.PosMin) / (this.ValMax - this.ValMin);
	}
}

//===================================================================================================================
function ShiftTime(time, ms)
{
	var milli = Date.parse(time);
	return new Date(milli + ms);
}

function iGridLine(x1, y1, x2, y2, type, t, val, tObj)
{
	this.x1 = x1 ; this.y1 = y1 ; 
	this.x2 = x2 ; this.y2 = y2 ;
	this.type = type ;
	this.t = t ;
	this.val = val ;
	this.tObj = tObj ;
}

iGridLine.prototype.Draw = function(ct)
{
	ct.moveTo(this.x1, this.y1);
	ct.lineTo(this.x2, this.y2);
}

//===================================================================================================================
function iTrend(Id, lvl, PrtId, x, y, w, h, lw, f, b, f1Clr, f2Clr, lClr) 
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ;
	this.x = x ; this.y = y ; this.w = w ; this.h = h ;
	this.lw = lw ; this.f = f ; this.b = b ;
	this.f1Clr = f1Clr ; this.f2Clr = f2Clr ; this.lClr = lClr ;
	this.Orientation = TrndOrnt_Horz ; this.ScrollDir = ScrollDir_Left ; this.ValLblPos = LblPos_Left ;
	this.TimeLblPos = LblPos_Bottom ; this.VScale = Scale_One ;
	this.InitDone = false ; this.UpdateRate = 1000 ;
	this.PrevSrvrTimeDiff = 0 ;
	
	this.TimeLblClr = 'RGB(0, 0, 0)'; this.ValLblClr = 'RGB(0, 0, 0)';
	this.Pens = new Array();

	AddTrendToArray(this);

	// Other members. CurTime, TimeSpan, StTime. ValMin, ValMax, TimeRatio, ValueRatio, ValLines, TimeLines, TimeDelta
	// nValGrid, ValGridClr, nSubValGrid, SubValGridClr, nTimeGrid, TimeGridClr, nSubTimeGrid, SubTimeGridClr
	//TimeLblClr, ValLblClr
}

function AddTrend(Id, lvl, PrtId, x, y, w, h, lw, f, b, f1Clr, f2Clr, lClr)
{
	LstShape = new iTrend(Id, lvl, PrtId, x, y, w, h, lw, f, b, f1Clr, f2Clr, lClr);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}

iTrend.prototype.GetKinShp = function()
{
	this.KinObj = new Kinetic.Shape
	({
		drawFunc: function(canvas) 
		{
			this.piTrend.Draw(canvas);
		}
	});
	this.KinObj.piTrend = this ;
	return this.KinObj ;
}

iTrend.prototype.SetGrid = function(nValGrid, ValGridClr, nSubValGrid, SubValGridClr, nTimeGrid, TimeGridClr, nSubTimeGrid, SubTimeGridClr)
{
	this.nValGrid = nValGrid ; this.ValGridClr = ValGridClr ; this.nTimeGrid = nTimeGrid ; this.TimeGridClr = TimeGridClr ;
	this.nSubValGrid = nSubValGrid ; this.SubValGridClr = SubValGridClr ;
	this.nSubTimeGrid = nSubTimeGrid ; this.SubTimeGridClr = SubTimeGridClr ;
}

iTrend.prototype.InitAnims = function()
{
	if(this.InitDone)
	{
		return ;
	}
	
	this.ValLines = new Array();
	this.TimeLines = new Array();
	var vDelta, vPrint, iCtr ;
	var drawn, nSubCtr, hSpc, hSubSpc, vSpc, vSubSpc, xPos, yPos, xStart, xEnd, yStart, yEnd ;
	var nTLines = this.nTimeGrid + 1 ;

	this.SetCurTime(new Date());
	
	vDelta = (this.ValMax - this.ValMin) / (this.nValGrid + 1);
	this.TimeDelta = (this.TimeSpan * 1000)/ (nTLines);
	vPrint = this.ValMin + vDelta ;

	if(TrndOrnt_Horz == this.Orientation)
	{
		this.TimeRatio = this.w / (this.TimeSpan * 1000);
		this.ValueRatio = this.h / (this.ValMax - this.ValMin);

		vSpc = this.h / (this.nValGrid + 1);
		if(this.nSubValGrid > 0)
		{
			vSubSpc = vSpc / (this.nSubValGrid + 1);
		}
		yPos = this.y + this.h - vSpc ;
		xStart = this.x, xEnd = xStart + this.w ;
		drawn = 0 ;
		while(drawn < this.nValGrid)
		{
			this.ValLines.push(new iGridLine(xStart, yPos, xEnd, yPos, Grid_Main, 0, vPrint, this));

			if(this.nSubValGrid > 0)
			{
				var ySubPos ;
				if(0 == drawn)
				{
					for(nSubCtr = 0 ; nSubCtr < this.nSubValGrid ; nSubCtr++)
					{
						ySubPos = yPos + (vSubSpc * (nSubCtr + 1));
						this.ValLines.push(new iGridLine(xStart, ySubPos, xEnd, ySubPos, Grid_Sub, 0, vPrint, this));
					}
				}
				for(nSubCtr = 0 ; nSubCtr < this.nSubValGrid ; nSubCtr++)
				{
					ySubPos = yPos - (vSubSpc * (nSubCtr + 1));
					this.ValLines.push(new iGridLine(xStart, ySubPos, xEnd, ySubPos, Grid_Sub, 0, vPrint, this));
				}
			}
			vPrint += vDelta ; yPos -= vSpc ; drawn++;
		}
	}
	else
	{
		this.TimeRatio = this.h / (this.TimeSpan * 1000);
		this.ValueRatio = this.w / (this.ValMax - this.ValMin);
		
		hSpc = this.w / (this.nValGrid + 1);
		if(this.nSubValGrid > 0)
		{
			hSubSpc = hSpc / (this.nSubValGrid + 1);
		}

		xPos = this.x + hSpc ;
		yStart = this.y, yEnd = yStart + this.h ;
		drawn = 0 ;
		while(drawn < this.nValGrid)
		{
			this.ValLines.push(new iGridLine(xPos, yStart, xPos, yEnd, Grid_Main, 0, vPrint, this));

			if(this.nSubValGrid > 0)
			{
				var xSubPos ;
				if(0 == drawn)
				{
					for(nSubCtr = 0 ; nSubCtr < this.nSubValGrid ; nSubCtr++)
					{
						xSubPos = xPos - (hSubSpc * (nSubCtr + 1));
						this.ValLines.push(new iGridLine(xSubPos, yStart, xSubPos, yEnd, Grid_Sub, 0, vPrint, this));
					}
				}
				for(nSubCtr = 0 ; nSubCtr < this.nSubValGrid ; nSubCtr++)
				{
					xSubPos = xPos + (hSubSpc * (nSubCtr + 1));
					this.ValLines.push(new iGridLine(xSubPos, yStart, xSubPos, yEnd, Grid_Sub, 0, vPrint, this));
				}
			}

			vPrint += vDelta ; xPos += hSpc ; drawn++;
		}
	}
	if(Scale_Multiple == this.VScale)
	{
		for(iCtr = 0 ; iCtr < this.Pens.length ; iCtr++)
		{
			this.Pens[iCtr].Init();
		}
	}

	for(iCtr = 0 ; iCtr < this.Pens.length ; iCtr++)
	{
		var Pen = this.Pens[iCtr] ;
		AddPenToTag(Pen, Pen.TagID);
	}
	
	drawn = 0 ;
	var TLineTime = this.CurTime ;
	var yr, mon, dt, hr, min, sec, delta = this.TimeDelta ;
	yr = TLineTime.getFullYear() ; mon = TLineTime.getMonth() ; dt = TLineTime.getDate() ; 
	hr = TLineTime.getHours() ; min = TLineTime.getMinutes() ; sec = TLineTime.getSeconds() ;
	if(delta > 3600000)
	{
		if((min > 0) || (sec > 0))
		{
			hr++ ;
			min = 0 ; sec = 0 ;
		}
	}
	else if(delta > 60000)
	{
		if(sec > 0)
		{
			min++ ; sec = 0 ;
		}
	}
	else if(delta >= 30000)
	{
		if(sec > 30)
		{
			min++ ; sec = 0 ;
		}
		else
		{
			sec = 30 ;
		}
	}
	else if(delta >= 10000)
	{
		var rem = sec % 10 ;
		rem = (sec - rem) / 10 ;
		
		sec = 10 * (rem + 1);
	}
	
	TLineTime = new Date(yr, mon, dt , hr, min, sec, 0);
	var SubTimeDelta, SubTime ;
	if(this.nSubTimeGrid > 0)
	{
		SubTimeDelta = this.TimeDelta / (this.nSubTimeGrid + 1);
	}
	while(drawn < (nTLines + 1))
	{
		this.TimeLines.unshift(new iGridLine(0, 0, 0, 0, Grid_Main, TLineTime, 0, this));
		if(this.nSubTimeGrid > 0)
		{
			var nSubCtr ;
			SubTime = TLineTime ;
			for(nSubCtr = 0 ; nSubCtr < this.nSubTimeGrid ; nSubCtr++)
			{
				SubTime = ShiftTime(SubTime, - SubTimeDelta);
				this.TimeLines.unshift(new iGridLine(0, 0, 0, 0, Grid_Sub, SubTime, 0, this));
			}
		}
		TLineTime = ShiftTime(TLineTime, - this.TimeDelta);
		drawn++;
	}
	
	this.InitDone = true ;
}

iTrend.prototype.AddPen = function(TagID, lClr, lw)
{
	this.Pens.push(new iTPen(this, TagID, lClr, lw, 0, 0, 0, 0));
}

iTrend.prototype.AddPen_S = function(TagID, lClr, lw, ValMin, ValMax, PosMin_Pct, PosMax_Pct)
{
	this.Pens.push(new iTPen(this, TagID, lClr, lw, ValMin, ValMax, PosMin_Pct, PosMax_Pct));
}

iTrend.prototype.DrawTimeGrid = function(ct)
{	
	ct.lineWidth = 1 ;
	var iCtr, nTLines = this.TimeLines.length ;
	var TLine, tDiff ;
	if(TrndOrnt_Horz == this.Orientation)
	{
		var Right = this.x + this.w ;
		ct.strokeStyle = this.TimeGridClr;
		ct.beginPath();
		for(iCtr = 0 ; iCtr < nTLines ; iCtr++)
		{
			TLine = this.TimeLines[iCtr];
			if(Grid_Main == TLine.type)
			{
				tDiff = TLine.t - this.StTime ;
				TLine.x1 = (this.TimeRatio * tDiff) + this.x ;
				TLine.x2 = TLine.x1 ;
				if((TLine.x1 >= this.x) && (TLine.x1 <= Right))
				{
					ct.moveTo(TLine.x1, this.y);
					ct.lineTo(TLine.x1, this.y + this.h);
				}
			}
		}
		ct.stroke();

		ct.strokeStyle = this.SubTimeGridClr;
		ct.beginPath();
		for(iCtr = 0 ; iCtr < nTLines ; iCtr++)
		{
			TLine = this.TimeLines[iCtr];
			if(Grid_Main != TLine.type)
			{
				tDiff = TLine.t - this.StTime ;
				TLine.x1 = (this.TimeRatio * tDiff) + this.x ;
				TLine.x2 = TLine.x1 ;
				if((TLine.x1 >= this.x) && (TLine.x1 <= Right))
				{
					ct.moveTo(TLine.x1, this.y);
					ct.lineTo(TLine.x1, this.y + this.h);
				}
			}
		}
		ct.stroke();
	}
	else
	{
		ct.strokeStyle = this.TimeGridClr;
		ct.beginPath();
		var bottom = this.y + this.h ;
		for(iCtr = 0 ; iCtr < nTLines ; iCtr++)
		{
			TLine = this.TimeLines[iCtr];
			if(Grid_Main == TLine.type)
			{
				tDiff = TLine.t - this.StTime ;
				if(ScrollDir_Down == this.ScrollDir)
				{
					TLine.y1 = bottom - (this.TimeRatio * tDiff) ;
				}
				else
				{
					TLine.y1 = this.y + (this.TimeRatio * tDiff) ;
				}
				if((TLine.y1 >= this.y) && (TLine.y1 <= bottom))
				{
					TLine.y2 = TLine.y1 ;
					ct.moveTo(this.x, TLine.y1);
					ct.lineTo(this.x + this.w, TLine.y1);
				}
			}
		}
		ct.stroke();
		
		ct.strokeStyle = this.SubTimeGridClr;
		ct.beginPath();
		var bottom = this.y + this.h ;
		for(iCtr = 0 ; iCtr < nTLines ; iCtr++)
		{
			TLine = this.TimeLines[iCtr];
			if(Grid_Main != TLine.type)
			{
				tDiff = TLine.t - this.StTime ;
				if(ScrollDir_Down == this.ScrollDir)
				{
					TLine.y1 = bottom - (this.TimeRatio * tDiff) ;
				}
				else
				{
					TLine.y1 = this.y + (this.TimeRatio * tDiff) ;
				}
				if((TLine.y1 >= this.y) && (TLine.y1 <= bottom))
				{
					TLine.y2 = TLine.y1 ;
					ct.moveTo(this.x, TLine.y1);
					ct.lineTo(this.x + this.w, TLine.y1);
				}
			}
		}
		ct.stroke();
	}
}

iTrend.prototype.DrawValGrid = function(ct)
{
	ct.lineWidth = 1 ;
	var iCtr, vLine ;

	ct.beginPath();	
	ct.strokeStyle = this.ValGridClr;
	for(iCtr = 0 ; iCtr < this.ValLines.length ; iCtr++)
	{
		vLine = this.ValLines[iCtr] ;
		if(Grid_Main == vLine.type)
		{
			this.ValLines[iCtr].Draw(ct);
		}
	}
	ct.stroke();
	
	ct.beginPath();
	ct.strokeStyle = this.SubValGridClr;
	for(iCtr = 0 ; iCtr < this.ValLines.length ; iCtr++)
	{
		vLine = this.ValLines[iCtr] ;
		if(Grid_Main != vLine.type)
		{
			this.ValLines[iCtr].Draw(ct);
		}
	}
	ct.stroke();
}

iTrend.prototype.DrawGrid = function(ct)
{
	ct.globalAlpha = 0.8 ;
	this.DrawTimeGrid(ct);

	this.DrawValGrid(ct);

	//if(Scale_One == this.VScale)
	//{
	//	this.DrawValGrid(ct);
	//}
}

iTrend.prototype.DrTimeLbls = function(ct, XorY, pos)
{
	ct.fillStyle = this.TimeLblClr ;
	var iCtr, nTLines = this.TimeLines.length, TLine ;
	for(iCtr = 0 ; iCtr < nTLines ; iCtr++)
	{
		TLine = this.TimeLines[iCtr];
		if(Grid_Main == TLine.type)
		{
			var TimeStr = TLine.t.getHours() + ":" + TLine.t.getMinutes() + ":" + TLine.t.getSeconds() ;
			var xPos, yPos ;
			if(0 == XorY)
			{
				xPos = pos ;
				yPos = TLine.y1 ;
			}
			else
			{
				xPos = TLine.x1 ;
				yPos = pos ;
			}
			if(TrndOrnt_Horz == this.Orientation)
			{
				if(xPos < (this.x + this.w))
				{
					ct.fillText(TimeStr, xPos, yPos);
				}
			}
			else
			{
				if(ScrollDir_Down == this.ScrollDir)
				{
					if(yPos > this.y)
					{
						ct.fillText(TimeStr, xPos, yPos);
					}
				}
				else
				{
					if(yPos < (this.y + this.h))
					{
						ct.fillText(TimeStr, xPos, yPos);
					}
				}
			}
		}
	}
}

iTrend.prototype.DrawTimeLbls = function(ct)
{
	ct.textAlign = 'right';
	var xPos, yPos, vMargin = 2, hMargin = 4 ;
	if(TrndOrnt_Horz == this.Orientation)
	{
		if((LblPos_Bottom == this.TimeLblPos) || (LblPos_Both == this.TimeLblPos))
		{
			ct.textBaseline = 'top'; yPos = this.y + this.h + vMargin ;
			this.DrTimeLbls(ct, 1, yPos);
		}
		if((LblPos_Top == this.TimeLblPos) || (LblPos_Both == this.TimeLblPos))
		{
			ct.textBaseline = 'bottom'; yPos = this.y - vMargin ;
			this.DrTimeLbls(ct, 1, yPos);
		}
	}
	else
	{
		ct.textBaseline = 'middle';
		if( (LblPos_Left == this.TimeLblPos) ||  (LblPos_Both == this.TimeLblPos))
		{
			ct.textAlign = 'right'; xPos = this.x -hMargin ;
			this.DrTimeLbls(ct, 0, xPos);
		}
		if( (LblPos_Right == this.TimeLblPos) ||  (LblPos_Both == this.TimeLblPos))
		{
			ct.textAlign = 'left'; xPos = this.x + this.w + hMargin ;
			this.DrTimeLbls(ct, 0, xPos);
		}
	}
}

iTrend.prototype.DrValLbls = function(ct, XorY, pos)
{
	var iCtr ;
	for(iCtr = 0 ; iCtr < this.ValLines.length ; iCtr++)
	{
		var ValLn = this.ValLines[iCtr];
		if(Grid_Main == ValLn.type)
		{
			if(0 == XorY)
			{
				ct.fillText(ValLn.val, pos, ValLn.y1);
			}
			else
			{
				ct.fillText(ValLn.val, ValLn.x1, pos);
			}
		}
	}
}

iTrend.prototype.DrawValLbls = function(ct)
{
	var hMargin = 5, vMargin = 2;
	var xPos, yPos ;
	ct.fillStyle = this.ValLblClr ;
	if(TrndOrnt_Horz == this.Orientation)
	{
		ct.textBaseline = 'middle';
		if((LblPos_Left == this.ValLblPos) || (LblPos_Both == this.ValLblPos))
		{
			ct.textAlign = 'right'; xPos = this.x - hMargin; 
			ct.fillText(this.ValMin, xPos, this.y + this.h); ct.fillText(this.ValMax, xPos, this.y);
			this.DrValLbls(ct, 0, xPos);
		}
		if((LblPos_Right == this.ValLblPos) || (LblPos_Both == this.ValLblPos))
		{
			ct.textAlign = 'left'; xPos = this.x + this.w + hMargin; 
			ct.fillText(this.ValMin, xPos, this.y + this.h); ct.fillText(this.ValMax, xPos, this.y);
			this.DrValLbls(ct, 0, xPos);
		}
	}
	else
	{
		ct.textAlign = 'center';
		if((LblPos_Top == this.ValLblPos) || (LblPos_Both == this.ValLblPos))
		{
			ct.textBaseline = 'bottom'; yPos = this.y - vMargin;
			ct.fillText(this.ValMin, this.x, yPos); ct.fillText(this.ValMax, this.x + this.w, yPos);
			this.DrValLbls(ct, 1, yPos);
		}
		if((LblPos_Bottom == this.ValLblPos) || (LblPos_Both == this.ValLblPos))
		{
			ct.textBaseline = 'top'; yPos = this.y +this.h + vMargin;
			ct.fillText(this.ValMin, this.x, yPos); ct.fillText(this.ValMax, this.x + this.w, yPos);
			this.DrValLbls(ct, 1, yPos);
		}
	}
}

iTrend.prototype.DrawLbls = function(ct)
{
	ct.font = '10pt Calibri';
	ct.fillStyle = 'black';

	if(Scale_One == this.VScale)
	{
		if(LblPos_None != this.ValLblPos)
		{
			this.DrawValLbls(ct);
		}
	}
	if(LblPos_None != this.TimeLblPos)
	{
		this.DrawTimeLbls(ct);
	}
}

iTrend.prototype.Draw = function(canvas)
{
	if(this.InitDone)
	{
		var ct = canvas.getContext();

		ct.lineWidth = 1 ;
		ct.globalAlpha = 1 ;
		
		ct.fillStyle = this.f1Clr ;
		if((this.f < 100) || (106 == this.f))
		{
			ct.fillStyle = this.f1Clr ;
			ct.fillRect(this.x, this.y, this.w, this.h);
		}
		else
		{
			var grd=ct.createLinearGradient(this.x, this.y, this.x + this.w, this.y);
			if(100 == this.f)
			{
				grd=ct.createLinearGradient(this.x, this.y, this.x + this.w, this.y);
			}
			else if(101 == this.f)
			{
				grd=ct.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
			}
			else if(102 == this.f)
			{
				grd=ct.createLinearGradient(this.x, this.y, this.x + this.w, this.y + this.h);
			}
			else if(103 == this.f)
			{
				grd=ct.createLinearGradient(this.x + this.w, this.y, this.x, this.y + this.h);
			}
			else if(104 == this.f)
			{
				grd=ct.createLinearGradient(this.x, this.y, this.x + this.w, this.y);
			}
			else if(105 == this.f)
			{
				grd=ct.createLinearGradient(this.x, this.y, this.x, this.y + this.h);
			}
			
			if(this.f < 104)
			{
				grd.addColorStop(0,this.f1Clr);
				grd.addColorStop(1,this.f2Clr);
				ct.fillStyle = grd;
			}
			else
			{
				grd.addColorStop(0,this.f1Clr);
				grd.addColorStop(0.5,this.f2Clr);
				grd.addColorStop(1,this.f1Clr);
				ct.fillStyle = grd;
			}
		
			ct.fillRect(this.x, this.y, this.w, this.h);
		}
		
		this.DrawGrid(ct);

		ct.globalAlpha = 1;
		var iPenCtr = 0, nPenMax = this.Pens.length ;
		for(iPenCtr  = 0; iPenCtr < nPenMax; iPenCtr++)
		{
			this.Pens[iPenCtr].Draw(ct);
		}
		
		if(1 == this.b)
		{
			ct.lineWidth = this.lw ;
			ct.globalAlpha = 1 ; ct.strokeStyle = this.lClr;
			ct.strokeRect(this.x, this.y, this.w, this.h);
		}
		
		this.DrawLbls(ct);
	}
}

iTrend.prototype.SetVals = function(ValMin, ValMax, VScale)
{
	this.ValMin = ValMin ; this.ValMax = ValMax ;
	this.VScale = VScale ;
}

iTrend.prototype.CalcStTime = function()
{
	var CurMilli = Date.parse(this.CurTime);
	var StMilli = CurMilli - (this.TimeSpan * 1000);
	this.StTime = new Date(StMilli);
}

iTrend.prototype.SetTimes = function(UpdateRate, TimeSpan)
{
	this.UpdateRate = UpdateRate * 1000; this.TimeSpan = TimeSpan ;
}

iTrend.prototype.ShiftTimeGrids = function()
{
	if(this.InitDone)
	{
		var nTLines, TLine, LstTime, bShifted = true ;
		if(0 == this.nSubTimeGrid)
		{
			bShifted = true ;
			while(bShifted)
			{
				bShifted = false ;
				nTLines = this.TimeLines.length;
				TLine = this.TimeLines[0];
				if(TLine.t < this.StTime)
				{
					LstTime = this.TimeLines[nTLines - 1].t ;
					LstTime = ShiftTime(LstTime, this.TimeDelta); 
					this.TimeLines.shift();
					this.TimeLines.push(new iGridLine(0, 0, 0, 0, Grid_Main, LstTime, 0, this));
					bShifted = true ;
				}
			}
		}
		else
		{
			var LstOut ;
			SubTimeDelta = this.TimeDelta / (this.nSubTimeGrid + 1);
			bShifted = true ;
			while(bShifted)
			{
				bShifted = false ;
				nTLines = this.TimeLines.length;
				TLine = this.TimeLines[0];
				LstOut = TLine.type ;
				if(TLine.t < this.StTime)
				{
					LstTime = this.TimeLines[nTLines - 1].t ;
					LstTime = ShiftTime(LstTime, SubTimeDelta); 
					this.TimeLines.shift();
					this.TimeLines.push(new iGridLine(0, 0, 0, 0, LstOut, LstTime, 0, this));
					bShifted = true ;
				}
			}
		}
	}
}

iTrend.prototype.SetCurTime = function(CurTime)
{
	//this.CurTime = ShiftTime(CurTime, SrvrTimeDiff);
	this.CurTime = CurTime ;
	this.CalcStTime();
}

iTrend.prototype.Update = function()
{
	var NewTime, bProcess = true ;
/*
	if(0 == this.PrevSrvrTimeDiff)
	{
		if(0 != SrvrTimeDiff)
		{
			this.PrevSrvrTimeDiff = SrvrTimeDiff ;
			
			NewTime = ShiftTime(new Date(), SrvrTimeDiff)
			this.CurTime = NewTime ;
			this.CalcStTime();
			this.ShiftTimeGrids();
			bProcess = false ;
		}
	}
*/
	if(bProcess)
	{
		//NewTime = ShiftTime(new Date(), SrvrTimeDiff)
		var NewTime = new Date();
		var Diff = NewTime - this.CurTime ;
		if(Diff >= this.UpdateRate)
		{
			this.CurTime = NewTime ;
			this.CalcStTime();
			this.ShiftTimeGrids();
		}
	}
}

iTrend.prototype.SetLblPos = function(TimeLblPos, ValLblPos)
{
	this.TimeLblPos = TimeLblPos ;
	this.ValLblPos = ValLblPos ;
}

iTrend.prototype.SetLblClrs = function(TimeLblClr, ValLblClr)
{
	this.TimeLblClr = TimeLblClr ;
	this.ValLblClr = ValLblClr ;
}

iTrend.prototype.SetOrient = function(Orient, ScrollDir)
{
	this.Orientation = Orient ;
	this.ScrollDir = ScrollDir ;
	if(TrndOrnt_Horz == this.Orientation)
	{
		this.ScrollDir = ScrollDir_Left ;
	}
}

//===================================================================================================================
