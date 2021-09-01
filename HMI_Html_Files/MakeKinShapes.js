function GrFill(nFilled, w, h, f1clr, f2clr)
{
	var strFill = f1clr ;
	var x1= 0, y1 = 0, x2 = 0, y2 = 0;
	var GrArray = new Array();
	
	if((nFilled >= 100) && (nFilled <= 105)){strFill = '';};
	
	if(nFilled == 100){x1 = 0; y1 = 0; x2 = w; y2 = 0;}
	else if(nFilled == 101){x1 = 0; y1 = 0; x2 = 0; y2 = h;}
	else if(nFilled == 102){x1 = 0; y1 = 0; x2 = w; y2 = h;}
	else if(nFilled == 103){x1 = w; y1 = 0; x2 = 0; y2 = h;}
	else if(nFilled == 104){x1 = 0; y1 = 0; x2 = w; y2 = 0;}
	else if(nFilled == 105){x1 = 0; y1 = 0; x2 = 0; y2 = h;}
	else if(nFilled == 106){x1 = w /2; y1 = h /2 ; x2 = 0; y2 = h;}

	if(nFilled < 104){GrArray = [0, f1clr, 1, f2clr];}
	else if(nFilled <= 105){GrArray = [0, f1clr, 0.5, f2clr, 1, f1clr];}
	else{GrArray = [0, f1clr, 1, f2clr];}
	
	FillAtrribs.strFill = strFill ;
	FillAtrribs.x1 = x1 ; FillAtrribs.x2 = x2 ;
	FillAtrribs.y1 = y1 ; FillAtrribs.y2 = y2 ;
	FillAtrribs.GrArray = GrArray ;
}

function SetupKinetic()
{
	KinStage = new Kinetic.Stage({ container: 'container', width: WinWd, height: WinHt });
	KinLayer_1 = new Kinetic.Layer();
	KinStage.add(KinLayer_1);
}

function AnimPresent()
{
	bProcessAnims = true ;
};

function IsDefined(Obj)
{
	if(typeof(Obj) != "undefined")
	{
		return true ;
	}
	return false ;
}

//=========================================================================
function AddBlinkToArray(BlinkObj)
{
	BlinkArray.push(BlinkObj);
	BlinkPresent = true ;
}

//=========================================================================
function AddTrendToArray(TrendObj)
{
	TrendArray.push(TrendObj);
	TrendPresent = true ;
}

//=========================================================================
function iTag(Idx, AnimType, Type, Val)
{
	this.Idx = Idx ; this.AnimType = AnimType ; this.Type = Type ; this.Val = Val ; this.bReady = true ;
	this.Time = 0 ;
	this.MyShps = new Array();
	if(100 == AnimType)
	{
		this.MyPens = new Array();
	}
};

iTag.prototype.AddAnim = function(Shp)
{
	this.MyShps.push(Shp) ;
};

iTag.prototype.AddPen = function(Pen)
{
	if(100 == this.AnimType)
	{
		this.MyPens.push(Pen) ;
	}
};

iTag.prototype.ExeAnims = function()
{
	var nMax = this.MyShps.length ;
	if(nMax > 0)
	{
		for(var iCtr = 0 ; iCtr < nMax ; iCtr++)
		{
			this.MyShps[iCtr].ExeAnim(this);
		}
	}
	this.bReady = false ;
};

iTag.prototype.ExeTrends = function()
{
	if(100 == this.AnimType)
	{
		var nMax = this.MyPens.length ;
		if(nMax > 0)
		{
			for(var iCtr = 0 ; iCtr < nMax ; iCtr++)
			{
				this.MyPens[iCtr].ExeAnim(this);				
			}
		}
	}
};

function AddTag(Idx, AnimType, Type, Val)
{
	if(0 == TagArray.length)
	{
		var nTimeDiffTag = new iTag(0, 50, 40, 200);
		TagArray.push(nTimeDiffTag);

		var nTimeZoneTag = new iTag(1, 50, 20, 200);
		TagArray.push(nTimeZoneTag);
	}
	var niTag = new iTag(Idx, AnimType, Type, Val);
	TagArray.push(niTag);
}

//=========================================================================
function iRect(Id, lvl, PrtId, x, y, w, h, lw, CRad, f, b, f1clr, f2clr, lclr)
{ 
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ; this.x = x ; this.y = y ; this.w = w ; this.h = h ;  
	this.lw = lw ; this.CRad = CRad ; this.f = f ; this.b = b ; 
	this.f1clr = f1clr ; this.f2clr = f2clr ; this.lclr = lclr  ;
	this.KinShp = 0 ;
};

iRect.prototype.GetKinShp = function()
{
	GrFill(this.f, this.w, this.h, this.f1clr, this.f2clr);
	this.KinShp = new Kinetic.Rect
	({ 
		x: this.x, y: this.y, width: this.w, height: this.h,
		stroke: this.lclr, strokeWidth: this.lw, cornerRadius: this.CRad,
		fill: FillAtrribs.strFill,
		fillLinearGradientStartPoint : [FillAtrribs.x1, FillAtrribs.y1],
		fillLinearGradientEndPoint: [FillAtrribs.x2, FillAtrribs.y2],
		fillLinearGradientColorStops : FillAtrribs.GrArray
	});
	if(0 == this.f){this.KinShp.disableFill();}
	if(0 == this.b){this.KinShp.disableStroke();}	
	return this.KinShp ;
};

iRect.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.Size))
	{
		this.Size.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
	if(IsDefined(this.Blink))
	{
		this.Blink.InitAnim();
	}
};

function AddRect(Id, lvl, PrtId, x, y, w, h, lw, CRad, f, b, f1clr, f2clr, lclr)
{
	LstShape = new iRect(Id, lvl, PrtId, x, y, w, h, lw, CRad, f, b, f1clr, f2clr, lclr);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}
//=========================================================================
function iEllipse(Id, lvl, PrtId, xCtr, yCtr, xRad, yRad, lw, f, b, f1clr, f2clr, lclr)
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ; this.xCtr = xCtr ; this.yCtr = yCtr ; 
	this.xRad  = xRad ; this.yRad = yRad ; this.lw = lw ; this.f = f ; this.b = b ; 
	this.f1clr = f1clr ; this.f2clr = f2clr ; this.lclr = lclr ;
	this.KinShp = 0 ;
};

iEllipse.prototype.GetKinShp = function()
{
	var strFill = this.f1clr ;
	var x1= 0, y1 = 0, x2 = 0, y2 = 0;
	var ElWd = this.xRad, ElHt = this.yRad;
	var nFilled = this.f;
	var GrArray = new Array();

	if((nFilled >= 100) && (nFilled <= 105)){strFill = '';};
	if(nFilled == 100){x1 = -ElWd; y1 = 0; x2 = ElWd; y2 = 0;}
	else if(nFilled == 101){x1 = 0; y1 = -ElHt; x2 = 0; y2 = ElHt;}
	else if(nFilled == 102){x1 = -ElWd; y1 = -ElHt; x2 = ElWd; y2 = ElHt;}
	else if(nFilled == 103){x1 = ElWd; y1 = -ElHt; x2 = -ElWd; y2 = ElHt;}
	else if(nFilled == 104){x1 = -ElWd; y1 = 0; x2 = ElWd; y2 = 0;}
	else if(nFilled == 105){x1 = 0; y1 = -ElHt; x2 = 0; y2 = ElHt;}
	else {x1 = -ElWd; y1 = 0; x2 = ElWd; y2 = 0;}

	if(nFilled < 104){GrArray = [0, this.f1clr, 1, this.f2clr];}
	else if(nFilled <= 105){GrArray = [0, this.f1clr, 0.5, this.f2clr, 1, this.f1clr];}
	else{GrArray = [0, this.f1clr, 1, this.f2clr];}

	this.KinShp = new Kinetic.Ellipse
	({ 
		x: this.xCtr, y: this.yCtr,  
		radius: {x: this.xRad, y: this.yRad}, 
		fill: strFill, 
		stroke: this.lclr, 
		strokeWidth: this.lw,
		fillLinearGradientStartPoint : [x1, y1],
		fillLinearGradientEndPoint: [x2, y2],
		fillLinearGradientColorStops : GrArray
	});
	if(0 == this.f){this.KinShp.disableFill();}
	if(0 == this.b){this.KinShp.disableStroke();}
	return this.KinShp ;
};

iEllipse.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.Size))
	{
		this.Size.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
	if(IsDefined(this.Blink))
	{
		this.Blink.InitAnim();
	}
};

function AddEllipse(Id, lvl, PrtId, xCtr, yCtr, xRad, yRad, lw, f, b, f1clr, f2clr, lclr)
{
	LstShape = new iEllipse(Id, lvl, PrtId, xCtr, yCtr, xRad, yRad, lw, f, b, f1clr, f2clr, lclr);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}
//=========================================================================
function iLine(Id, lvl, PrtId, x1, y1, x2, y2, RtoReqd, lw, lclr)
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ;
	this.x1 = x1 ; this.y1 = y1 ; this.x2 = x2 ; this.y2 = y2 ; 
	this.RtoReqd = RtoReqd ; this.lw = lw ; this.lclr = lclr ;
	this.KinShp = 0 ;
}

iLine.prototype.GetKinShp = function()
{
	var PtsArry = new Array(this.x1, this.y1, this.x2, this.y2);
	this.KinShp = new Kinetic.Line
	({
		points: PtsArry, stroke: this.lclr, 
		strokeWidth: this.lw
	});
	if(this.RtoReqd)
	{
		var PtrArray = new Array();
		var DimArray = new Array();
		var PtrSetArray = new Array();
		for(var iPoly = 0 ; iPoly < PtsArry.length ; iPoly++)
		{
			PtrArray[iPoly] = PtsArry[iPoly] ;
			DimArray[iPoly] = 0 ;
			PtrSetArray[iPoly] = 0 ;
		}
		this.PtrArray = PtrArray ;
		this.DimArray = DimArray ;
		this.PtrSetArray = PtrSetArray ;
	}
	return this.KinShp ;
}

iLine.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.RotAnim))
	{
		this.RotAnim.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
	if(IsDefined(this.Blink))
	{
		this.Blink.InitAnim();
	}
};

function AddLine(Id, lvl, PrtId, x1, y1, x2, y2, RtoReqd, lw, lclr)
{
	LstShape = new iLine(Id, lvl, PrtId, x1, y1, x2, y2, RtoReqd, lw, lclr);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}


//=========================================================================
function iPolyLine(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, lclr)
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ; this.x = x ; this.y = y ; this.w = w ; this.h = h ; 
	this.RtoReqd = RtoReqd ; this.lw = lw ; this.lclr = lclr ;
	this.KinShp = 0 ;
	this.PtrArray = 0 ;
}

iPolyLine.prototype.GetKinShp = function()
{
	this.KinShp = new Kinetic.Line
	({
		points: this.PtrArray, stroke: this.lclr,
		strokeWidth: this.lw
	});
	
	if(this.RtoReqd)
	{
		var DimArray = new Array();
		var PtrSetArray = new Array();
		for(var iPoly = 0 ; iPoly < this.PtrArray.length ; iPoly++)
		{
			DimArray[iPoly] = 0 ;
			PtrSetArray[iPoly] = 0 ;
		}
		this.DimArray = DimArray ;
		this.PtrSetArray = PtrSetArray ;
	}
	
	return this.KinShp ;
}

iPolyLine.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.Size))
	{
		this.Size.InitAnim();
	}
	if(IsDefined(this.RotAnim))
	{
		this.RotAnim.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
	if(IsDefined(this.Blink))
	{
		this.Blink.InitAnim();
	}
};

function AddPolyLine(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, lclr)
{
	LstShape = new iPolyLine(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, lclr);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}

//=========================================================================
function iPolygon(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, f, b, f1clr, f2clr, lclr)
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ; this.x = x ; this.y = y ; this.w = w ; this.h = h ; 
	this.RtoReqd = RtoReqd ; this.lw = lw ; this.f = f ; this.b = b ; 
	this.f1clr = f1clr ; this.f2clr = f2clr ; this.lclr = lclr ;
	this.KinShp = 0 ;
	this.PtrArray = 0 ;
}

iPolygon.prototype.GetKinShp = function()
{
	this.KinShp = new Kinetic.Polygon
	({
		points: this.PtrArray, fill: this.f1clr, 
		stroke: this.lclr, strokeWidth: this.lw
	});
	
	if(this.RtoReqd)
	{
		var DimArray = new Array();
		var PtrSetArray = new Array();
		for(var iPoly = 0 ; iPoly < this.PtrArray.length ; iPoly++)
		{
			DimArray[iPoly] = 0 ;
			PtrSetArray[iPoly] = 0 ;
		}
		this.DimArray = DimArray ;
		this.PtrSetArray = PtrSetArray ;
	}
	
	if(0 == this.f){this.KinShp.disableFill();}
	if(0 == this.b){this.KinShp.disableStroke();}	
	
	return this.KinShp ;
}

iPolygon.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.Size))
	{
		this.Size.InitAnim();
	}
	if(IsDefined(this.RotAnim))
	{
		this.RotAnim.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
	if(IsDefined(this.Blink))
	{
		this.Blink.InitAnim();
	}
};

function AddPolygon(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, f, b, f1clr, f2clr, lclr)
{
	LstShape = new iPolygon(Id, lvl, PrtId, x, y, w, h, RtoReqd, lw, f, b, f1clr, f2clr, lclr);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}

//=========================================================================
function iText(Id, lvl, PrtId, x, y, w, h, FntSz, Bold, Align, tclr)
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ; this.x = x ; this.y = y ; this.w = w ; this.h = h ; 
	this.FntSz = FntSz ; this.Bold = Bold ; this.Align = Align ; this.tclr = tclr ;
	this.strText = 'Text' ; this.strFont = 'Arial' ;
	this.KinShp = 0 ;
}

iText.prototype.GetKinShp = function()
{
	var boldstr = '', alignstr = 'left';

	if(this.Bold & 2){ boldstr += " bold";}
	if(this.Bold & 1){ boldstr += " italic";}
	
	if(0 == this.Align){ alignstr = "left";}
	else if(1 == this.Align){ alignstr = "center";}
	else if(2 == this.Align){ alignstr = "right";}

	this.KinShp = new Kinetic.Text
	({
		x: this.x, y: this.y, width: this.w, height: this.h,
		text: this.strText,
		fontSize: this.FntSz, fontFamily: this.strFont, fill: this.tclr,
		fontStyle: boldstr, align: alignstr
	});
		
	return this.KinShp ;
}

iText.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.ShowVal))
	{
		this.ShowVal.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
	if(IsDefined(this.Blink))
	{
		this.Blink.InitAnim();
	}
};

iText.prototype.SetOnOffTxt = function(strOn, strOff)
{
	if(IsDefined(this.ShowVal))
	{
		this.ShowVal.OnText = strOn ; this.ShowVal.OffText = strOff ;
	}
}

function AddText(Id, lvl, PrtId, x, y, w, h, FntSz, Bold, Align, tclr)
{
	LstShape = new iText(Id, lvl, PrtId, x, y, w, h, FntSz, Bold, Align, tclr);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}

//=========================================================================
function iArc(Id, lvl, PrtId, xCtr, yCtr, Radius, lw, clk, f, b, closed, ArcType, f1clr, f2clr, lclr, StAng, EndAng)
{
	this.Id =Id  ; this.lvl = lvl ; this.PrtId = PrtId ; this.xCtr = xCtr ; this.yCtr = yCtr ; 
	this.Radius = Radius ; this.lw = lw ; this.clk = clk ; this.f = f ; this.b = b ; 
	this.closed = closed ; this.ArcType = ArcType ;
	this.f1clr = f1clr ; this.f2clr = f2clr ; this.lclr = lclr ; this.StAng = StAng ; this.EndAng = EndAng ;
	this.KinShp = 0 ;
}

iArc.prototype.GetKinShp = function()
{
	var niArc = new Kinetic.Shape		// Arc, Chord, Pid
	({
		drawFunc: function(canvas) 
		{
			if(this.visible)
			{
				var StAngR = GetRadAng_Arc(this.StAng);
				var EndAngR = GetRadAng_Arc(this.EndAng);

				var StAngR1 = Deg2Rad(this.StAng);
				var EndAngR1 = Deg2Rad(this.EndAng);

				var x1, y1, x2, y2, x, y, Rad ;
				x = this.xCtr ; y = this.yCtr ;
				Rad = this.Radius ;
				
				x1 = x + Rad * Math.cos(StAngR1)
				y1 = y - Rad * Math.sin(StAngR1)

				x2 = x + Rad * Math.cos(EndAngR1)
				y2 = y - Rad * Math.sin(EndAngR1)

				var ct = canvas.getContext();
				ct.beginPath();

				ct.lineWidth = this.lw;
				ct.strokeStyle = this.lclr;
				ct.fillStyle = this.f1clr;

				if(12 == this.ArcType )
				{
					DrawLine(ct, x, y, x1, y1)
				}
				ct.arc(x,y,Rad, StAngR, EndAngR, this.clk);
				
				if(12 == this.ArcType )
				{
					DrawLine(ct, x, y, x2, y2)
				}

				if (this.closed) {ct.closePath();};
				if (this.b) {ct.stroke()};
				if(this.f){ct.fill();};
			}
		}
	});
	
	niArc.visible = true ;
	niArc.lw = this.lw ;
	niArc.lclr = this.lclr;
	niArc.f1clr = this.f1clr ;
	niArc.f2clr = this.f2clr ;
	niArc.xCtr = this.xCtr;
	niArc.yCtr = this.yCtr;
	niArc.Radius= this.Radius;
	niArc.StAng = this.StAng ;
	niArc.EndAng = this.EndAng ;
	niArc.clk = this.clk;
	niArc.closed = this.closed ;
	niArc.ArcType = this.ArcType ;
	niArc.b = this.b;
	niArc.f = this.f;
	
	this.KinShp = niArc ;
	return this.KinShp ;
}

iArc.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
	if(IsDefined(this.Blink))
	{
		this.Blink.InitAnim();
	}
};

function AddArc(Id, lvl, PrtId, xCtr, yCtr, Radius, lw, clk, f, b, closed, ArcType, f1clr, f2clr, lclr, StAng, EndAng)
{
	LstShape = new iArc(Id, lvl, PrtId, xCtr, yCtr, Radius, lw, clk, f, b, closed, ArcType, f1clr, f2clr, lclr, StAng, EndAng);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}

//=========================================================================
function iBitmap(Id, lvl, PrtId, x, y, w, h)
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ; this.x = x ; this.y = y ; this.w = w ; this.h = h ; 
	this.strImage = ''; this.ImgIdx = -1 ;
	this.KinShp = 0 ;
}

iBitmap.prototype.GetKinShp = function()
{
	this.KinShp = new Kinetic.Image
	({ 
		x: this.x, y: this.y, 
		width: this.w, height: this.h, 
		image: ImgArray[this.ImgIdx]
	});
	return this.KinShp ;
}

iBitmap.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.Size))
	{
		this.Size.InitAnim();
	}
};

function AddBitmap(Id, lvl, PrtId, x, y, w, h)
{
	LstShape = new iBitmap(Id, lvl, PrtId, x, y, w, h);
	bImgPresent = true ;
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}

//=========================================================================
function iGroup(Id, lvl, PrtId, GroupId)
{
	this.Id = Id ; this.lvl = lvl ; this.PrtId = PrtId ; this.GroupId = GroupId ;
	this.Children = new Array();
	this.KinShp = 0 ;
}

iGroup.prototype.AddiShape = function(niShape)
{
	this.KinShp.add(niShape.GetKinShp());
	this.Children.push(niShape);
}

iGroup.prototype.GetKinShp = function()
{
	this.KinShp = new Kinetic.Group
	({ 
		x: 0, y: 0
	});
	
	return this.KinShp ;
}

iGroup.prototype.InitAnims = function()
{
	if(IsDefined(this.Visi))
	{
		this.Visi.InitAnim();
	}
	if(IsDefined(this.Move))
	{
		this.Move.InitAnim();
	}
	if(IsDefined(this.ClrAnim))
	{
		this.ClrAnim.InitAnim();
	}
};

iGroup.prototype.ShowHide = function(bShow)
{
	var iCtr, nMax = this.Children.length ;
	for(iCtr = 0 ; iCtr < nMax ; iCtr++)
	{
		ShowShape(this.Children[iCtr], bToShow);	
	}
}

iGroup.prototype.SetColor = function(ClrToSet, Brdr_Int)
{
	var iCtr, nMax = this.Children.length ;
	for(iCtr = 0 ; iCtr < nMax ; iCtr++)
	{
		ColorElement(this.Children[iCtr], this.Children[iCtr].Id, ClrToSet, Brdr_Int);
	}
}

function AddGroup(Id, lvl, PrtId, GroupId)
{
	LstShape = new iGroup(Id, lvl, PrtId, GroupId);
	InfiObjArray.push(LstShape) ; bGotShapes = true ;
}

//=========================================================================
function iMoveAnim(Id, TagIdx, ShpIdx, ShpType, PosMin, PosMax, ValMin, ValMax)
{
	this.Id = Id ; this.TagIdx = TagIdx ; this.ShpIdx = ShpIdx ; this.ShpType = ShpType ; 
	this.PosMin = PosMin ; this.PosMax = PosMax ; this.ValMin = ValMin ; this.ValMax = ValMax ;
	this.pShp = 0 ;
	
	var PosDiff = PosMax - PosMin ; var ValDiff = ValMax - ValMin ;
	this.Ratio = PosDiff / ValDiff ;
	this.PosOrgX = 0 ; this.PosOrgY = 0 ;
};

iMoveAnim.prototype.InitAnim = function()
{
	var ShpType = this.ShpType ;
	//TagArray[this.TagIdx].AddAnim(this);
	AddAnimToTag(this, this.TagIdx);
	
	if((Shp_Rect == ShpType) || (Shp_Text == ShpType) || (Shp_Bitmap == ShpType) || (Shp_WrapTxt == ShpType))
	{
		if(Anim_MoveX == this.Id)
		{
			this.PosOrgX = this.pShp.x + this.PosMin ; 
			this.PosOrgY = this.pShp.y ;
		}
		else
		{
			this.PosOrgX = this.pShp.x ; 
			this.PosOrgY = this.pShp.y + this.PosMin ;
		}
	}
	else if((Shp_Ellipse == ShpType) || (Shp_Arc == ShpType))
	{
		if(Anim_MoveX == this.Id)
		{
			this.PosOrgX = this.pShp.xCtr + this.PosMin ; 
			this.PosOrgY = this.pShp.yCtr ;
		}
		else
		{
			this.PosOrgX = this.pShp.xCtr ; 
			this.PosOrgY = this.pShp.yCtr + this.PosMin ;
		}
	}
	else
	{
		if(Anim_MoveX == this.Id)
		{
			this.PosOrgX = this.PosMin ; 
			this.PosOrgY = 0 ;
		}
		else
		{
			this.PosOrgX = 0 ; 
			this.PosOrgY = this.PosMin ;
		}
	}
};

iMoveAnim.prototype.ExeAnim = function(TagObj)
{
	var ShpType = this.ShpType ;
	var TagVal = TagObj.Val ;
	if(TagVal < this.ValMin) {TagVal = this.ValMin ;}
	if(TagVal > this.ValMax) {TagVal = this.ValMax ;}
	var ValDiff = TagVal - this.ValMin ;
	var CurPos = 0 ;
	var ShpType = this.ShpType ;

	if((Shp_Rect == ShpType) || (Shp_Ellipse == ShpType) || (Shp_Line == ShpType) || (Shp_Text == ShpType) || (Shp_Polygon == ShpType) || (Shp_Polyline == ShpType) || (Shp_Bitmap == ShpType) || (Shp_Group== ShpType))
	{
		if(Anim_MoveX == this.Id )
		{
			CurPos = this.PosOrgX + ValDiff * this.Ratio ;
			this.pShp.KinShp.setX(CurPos);
		}
		else
		{
			CurPos = this.PosOrgY + ValDiff * this.Ratio ;
			this.pShp.KinShp.setY(CurPos);
		}
	}
	else if(Shp_Arc == ShpType)
	{
		if(Anim_MoveX == this.Id)
		{
			CurPos = this.PosOrgX + ValDiff * this.Ratio ;
			this.pShp.KinShp.xCtr = CurPos ;
		}
		else
		{
			CurPos = this.PosOrgY + ValDiff * this.Ratio ;
			this.pShp.KinShp.yCtr = CurPos ;
		}
	}
};

function AddMoveAnim(ShpObj, Id, TagIdx, ShpIdx, ShpType, PosMin, PosMax, ValMin, ValMax)
{
	ShpObj.Move = new iMoveAnim(Id, TagIdx, ShpIdx, ShpType, PosMin, PosMax, ValMin, ValMax);
	ShpObj.Move.pShp = ShpObj ;
	AnimPresent();	
}


//=========================================================================
function iVisiAnim(Id, TagIdx, ShpIdx, ShpType, VisiType, ValMin, ValMax)
{
	this.Id = Id ; this.TagIdx = TagIdx ; this.ShpIdx = ShpIdx ; this.ShpType = ShpType ; 
	this.VisiType = VisiType ; this.ValMin = ValMin ; this.ValMax = ValMax ;
}

iVisiAnim.prototype.InitAnim = function()
{
	//TagArray[this.TagIdx].AddAnim(this);
	AddAnimToTag(this, this.TagIdx);
};

function ShowShape(ShpObj, bToShow)
{
	if(Shp_Group != ShpObj.ShpType)
	{
		if(Shp_Arc != ShpObj.ShpType)
		{
			if(bToShow)
			{
				ShpObj.KinShp.show();
			}
			else
			{
				ShpObj.KinShp.hide();
			}
		}
		else
		{
			ShpObj.KinShp.visible = bToShow ;
		}
	}
	else
	{
		ShpObj.ShowHide(bToShow);
	}
}

iVisiAnim.prototype.ExeAnim = function(TagObj)
{
	var bToShow = false ;
	if(this.VisiType < 2)
	{
		if(TagObj.Val != 0)
		{
			bToShow = true ;
		}
		if(1 == this.VisiType){bToShow = !bToShow ;}
	}
	else
	{
		if((TagObj.Val >= this.ValMin) && (TagObj.Val <= this.ValMax))
		{
			bToShow = true ;
		}
		if(3 == this.VisiType){bToShow = !bToShow ;}
	}
	ShowShape(this.pShp, bToShow);	
}

function AddVisiAnim(ShpObj, Id, TagIdx, ShpIdx, ShpType, VisiType, ValMin, ValMax)
{
	ShpObj.Visi = new iVisiAnim(Id, TagIdx, ShpIdx, ShpType, VisiType, ValMin, ValMax);
	ShpObj.Visi.pShp = ShpObj ;
	AnimPresent();	
}

//=========================================================================
function iShowValAnim(Id, TagIdx, ShpIdx, ShpType, ShowType)
{
	this.Id = Id ; this.TagIdx = TagIdx ; this.ShpIdx = ShpIdx ; this.ShpType = ShpType ; this.ShowType = ShowType ;
	this.OnText = '' ; this.OffText = '' ;
}

iShowValAnim.prototype.InitAnim = function()
{
	//TagArray[this.TagIdx].AddAnim(this);
	AddAnimToTag(this, this.TagIdx);
};

iShowValAnim.prototype.ExeAnim = function(TagObj)
{
	var strPrt = '' ;
	if(1 == this.ShowType)
	{
		if(0 != TagObj.Val)
		{
			strPrt = this.OnText ;
		}
		else
		{
			strPrt = this.OffText ;
		}
	}
	else
	{
		if(20 == TagObj.Type)	// Bool
		{
			if(0 == TagObj.TagVal)
			{
				strPrt = "Off" ;
			}
			else
			{
				strPrt = "On" ;
			}
		}
		else if(30 == TagObj.Type) // String
		{
			strPrt = TagObj.Val ;
		}
		else if(40 == TagObj.Type)	// Unsigned
		{
			strPrt = sprintf("%d", TagObj.Val);
		}
		else if(50 == TagObj.Type)	// Signed
		{
			strPrt = sprintf("%d", TagObj.Val);
		}
		else if(60 == TagObj.Type)	// Real
		{
			strPrt = sprintf("%2.3f", TagObj.Val);
		}
	}
	this.pShp.KinShp.setText(strPrt);
}

function AddShowVal(ShpObj, Id, TagIdx, ShpIdx, ShpType, ShowType)
{
	if(Shp_Text == ShpType)
	{
		ShpObj.ShowVal = new iShowValAnim(Id, TagIdx, ShpIdx, ShpType, ShowType);
		ShpObj.ShowVal.pShp = ShpObj ;
		AnimPresent();	
	}
}

//=========================================================================
function iRotAnim(Id, TagIdx, ShpIdx, ShpType, xCtr, yCtr, ValMin, ValMax, AngMin, AngMax, RotType, RotDir)
{
	this.Id = Id ; this.TagIdx = TagIdx ; this.ShpIdx = ShpIdx ; this.ShpType = ShpType ; 
	this.xCtr = xCtr ; this.yCtr = yCtr ; this.ValMin = ValMin ; this.ValMax = ValMax ;
	this.AngMin = AngMin ; this.AngMax = AngMax ; this.RotType = RotType ; this.RotDir = RotDir ;
};

iRotAnim.prototype.InitAnim = function()
{
	//TagArray[this.TagIdx].AddAnim(this);
	AddAnimToTag(this, this.TagIdx);

	for(var iCtr = 0 ; iCtr < this.pShp.PtrArray.length ; iCtr  += 2)
	{
		var x = this.pShp.PtrArray[iCtr], y = this.pShp.PtrArray[iCtr + 1] ;
		var Angle = GetAngle(x, y, this.xCtr, this.yCtr);
		var Radius = GetDist(x, y, this.xCtr, this.yCtr);
		this.pShp.DimArray[iCtr] = Angle ;
		this.pShp.DimArray[iCtr + 1] = Radius ;
	}
	var MaxAngDiff = GetRotSweep(this.AngMin, this.AngMax, this.RotDir);
	var MaxValDif = this.ValMax - this.ValMin ;
	this.nRatio = MaxAngDiff / MaxValDif;
};

iRotAnim.prototype.ExeAnim = function(TagObj)
{
	var TagVal = TagObj.Val ;
	if(TagVal < this.ValMin) {TagVal = this.ValMin ;}
	if(TagVal > this.ValMax) {TagVal = this.ValMax ;}
	var ValDiff = TagVal - this.ValMin ;

	var CurAng = this.AngMin + this.nRatio * ValDiff ;

	var RotShp = this.pShp ;
	var RotKinShp = this.pShp.KinShp ;
	for(var iCtr = 0 ; iCtr < RotShp.PtrArray.length ; iCtr  += 2)
	{
		var TmpAng = RotShp.DimArray[iCtr] - CurAng ;
		var TmpRad = TmpAng * (Math.PI / 180);
		var Radius = RotShp.DimArray[iCtr + 1];
		var x = this.xCtr + Radius * Math.cos(TmpRad);
		var y = this.yCtr + Radius * Math.sin(TmpRad);
		RotShp.PtrSetArray[iCtr] = x ;
		RotShp.PtrSetArray[iCtr + 1] = y ;
	}
	RotKinShp.setPoints(RotShp.PtrSetArray);
};

function AddRotateAnim(nShObj, Id, TagIdx, ShpIdx, ShpType, xCtr, yCtr, ValMin, ValMax, AngMin, AngMax, RotType, RotDir )
{
	if((Shp_Line == ShpType) || (Shp_Polygon == ShpType) || (Shp_Polyline == ShpType))
	{
		nShObj.RotAnim = new  iRotAnim(Id, TagIdx, ShpIdx, ShpType, xCtr, yCtr, ValMin, ValMax, AngMin, AngMax, RotType, RotDir);
		nShObj.RotAnim.pShp = nShObj ;
		AnimPresent();	
	}
}

//=========================================================================
function iColorAnim(Id, TagIdx, ShpIdx, ShpType)
{
	this.Id = Id ; this.TagIdx = TagIdx ; this.ShpIdx = ShpIdx ; this.ShpType = ShpType ;
	this.FClrAry = -1 ; this.FValAry = -1 ; this.BClrAry = -1 ; this.BValAry = -1 ;
}

iColorAnim.prototype.InitAnim = function()
{
	//TagArray[this.TagIdx].AddAnim(this);
	AddAnimToTag(this, this.TagIdx);
}

function ColorElement(nShape, nShpType, ClrToSet, Brdr_Int)
{
	if(Shp_Group != nShpType)
	{
		var nKinObj = nShape.KinShp ;
		if(0 == Brdr_Int)		// Border
		{
			if(nShpType < Shp_Arc)
			{
				nKinObj.setStroke(ClrToSet);
			}
			else
			{
				nKinObj.lclr = ClrToSet ;
			}
		}
		else						// Interior
		{
			if(nShpType < Shp_Arc)
			{
				nKinObj.setFill(ClrToSet);
			}
			else
			{
				nKinObj.f1clr = ClrToSet ;
			}
		}
	}
	else
	{
		nShape.SetColor(ClrToSet, Brdr_Int);
	}
}

iColorAnim.prototype.ExeAnim = function(TagObj)
{
	var TagVal = TagObj.Val ;
	var bClrSet, nClrs, nClrCtr, ClrToSet ;
	if(-1 != this.FClrAry)
	{
		bClrSet = false ;
		nClrs = this.FValAry.length ;
						
		for(nClrCtr = 1 ; nClrCtr < nClrs; nClrCtr++)
		{
			if(TagVal < this.FValAry[nClrCtr])
			{
				ClrToSet = this.FClrAry[nClrCtr - 1];
				bClrSet = true ;
				break ;
			}
		}
		if(bClrSet == false)
		{
			ClrToSet = this.FClrAry[nClrCtr - 1];
		}
		
		ColorElement(this.pShp, this.ShpType, ClrToSet, 1);
	}

	if(-1 != this.BClrAry)
	{
		bClrSet = false ;
		nClrs = this.BValAry.length ;
						
		for(nClrCtr = 1 ; nClrCtr < nClrs; nClrCtr++)
		{
			if(TagVal < this.BValAry[nClrCtr])
			{
				ClrToSet = this.BClrAry[nClrCtr - 1];
				bClrSet = true ;
				break ;
			}
		}
		if(bClrSet == false)
		{
			ClrToSet = this.BClrAry[nClrCtr - 1];
		}
		
		ColorElement(this.pShp, this.ShpType, ClrToSet, 0);
	}
}

function AddColorAnim(nShObj, Id, TagIdx, ShpIdx, ShpType)
{
	nShObj.ClrAnim = new iColorAnim(Id, TagIdx, ShpIdx, ShpType);
	nShObj.ClrAnim.pShp = nShObj ;
	AnimPresent();	
	return nShObj.ClrAnim ;
}

//=========================================================================
function iSizeAnim(Id, TagIdx, ShpIdx, ShpType, AncType, Dir, PosMin, PosMax, ValMin, ValMax)
{
	this.Id = Id ; this.TagIdx = TagIdx ; this.ShpIdx = ShpIdx ; this.ShpType = ShpType ;
	this.AncType = AncType ; this.Dir = Dir ; this.PosMin = PosMin ; this.PosMax = PosMax ; 
	this.ValMin = ValMin ; this.ValMax = ValMax ;
}

iSizeAnim.prototype.InitAnim = function()
{
	//TagArray[this.TagIdx].AddAnim(this);
	AddAnimToTag(this, this.TagIdx);

	var MaxSzDiff = this.PosMax - this.PosMin ;		// SizeMax - SizeMin
	var MaxValDif = this.ValMax - this.ValMin ;
	this.nRatio = MaxSzDiff / MaxValDif;
	var nShpType = this.ShpType ;

	if((Shp_Rect == nShpType) || (Shp_Bitmap == nShpType) || (Shp_WrapTxt == nShpType))
	{
		this.nSzOrgX = this.pShp.w ;
		this.nSzOrgY = this.pShp.h ;
		var nDir = this.Dir ;
		this.nFixedDim = 0 ;
		if(1 == nDir)
		{
			this.nFixedDim = this.pShp.x + this.pShp.w;
		}
		else if(2 == nDir)
		{
			this.nFixedDim = this.pShp.x + 0.5 * this.pShp.w;
		}
		else if(4 == nDir)
		{
			this.nFixedDim = this.pShp.y + this.pShp.h;
		}				
		else if(5 == nDir)
		{
			this.nFixedDim = this.pShp.y + 0.5 * this.pShp.h;
		}				
	}
	else if(Shp_Ellipse == nShpType)	// Ellipse
	{
		this.nSzOrgX = this.pShp.xRad;
		this.nSzOrgY = this.pShp.yRad ;
		
		this.nPosOrgX = this.pShp.xCtr ;
		this.nPosOrgY = this.pShp.yCtr ;
		
		var nDir = this.Dir ;
		var HalfMinDiff = this.PosMin / 2 ;
		if(0 == nDir)
		{
			this.nFixedDim = this.nPosOrgX - this.nSzOrgX;
			this.nSzOrgX = this.pShp.xRad + HalfMinDiff ;
		}
		else if(1 == nDir)
		{
			this.nFixedDim = this.nPosOrgX + this.nSzOrgX;
			this.nSzOrgX = this.pShp.xRad + HalfMinDiff ;
		}
		else if(2 == nDir)
		{
			this.nSzOrgX = this.pShp.xRad + HalfMinDiff ;
		}
		else if(3 == nDir)
		{
			this.nFixedDim = this.nPosOrgY - this.nSzOrgY;
			this.nSzOrgY = this.pShp.yRad + HalfMinDiff ;
		}
		else if(4 == nDir)
		{
			this.nFixedDim = this.nPosOrgY + this.nSzOrgY;
			this.nSzOrgY = this.pShp.yRad + HalfMinDiff ;
		}
		else if(5 == nDir)
		{
			this.nSzOrgY = this.pShp.yRad + HalfMinDiff ;
		}
	}
	else if((Shp_Polygon == nShpType) || (Shp_Polyline == nShpType))
	{
		this.nSzOrgX = this.w;
		this.nSzOrgY = this.h ;
		this.nFixedDim = this.x ;
	
		var DimArray = this.pShp.DimArray ;
		var PtrArray = this.pShp.PtrArray ;
		var iCtr, nDir = this.Dir ;

		if((0 == nDir) || (1 == nDir))
		{
			var nFixed = 0 ;
			if(0 == nDir)
			{
				nFixed = this.pShp.x ;
			}
			else
			{
				nFixed = this.pShp.x + this.pShp.w ;
			}
			this.nFixedDim =  nFixed ;
			this.nSzOrgX = this.pShp.w + this.PosMin ;

			var SzOrg = this.pShp.w ;
			var SzMin = this.pShp.w + this.PosMin ;

			for(iCtr = 0 ; iCtr < PtrArray.length ; iCtr ++)
			{
				if((0 == iCtr) || (0 == iCtr % 2))
				{	
					if(0 == nDir)
					{
						DimArray[iCtr] = PtrArray[iCtr] - nFixed ;
					}
					else
					{
						DimArray[iCtr] = nFixed - PtrArray[iCtr] ;
					}
					DimArray[iCtr] = DimArray[iCtr] * ( SzMin / SzOrg );
				}
				else
				{
					DimArray[iCtr] = PtrArray[iCtr] ;
				}
			}
		}
		else if((3 == nDir) || (4 == nDir))
		{
			var nFixed = 0 ;
			if(3 == nDir)
			{
				nFixed = this.pShp.y ;
			}
			else
			{
				nFixed = this.pShp.y + this.pShp.h ;
			}
			this.nFixedDim =  nFixed ;
			this.nSzOrgY = this.pShp.h + this.PosMin ;
			
			var SzOrg = this.pShp.h ;
			var SzMin = this.pShp.h + this.PosMin ;
			for(iCtr = 0 ; iCtr < PtrArray.length ; iCtr ++)
			{
				if((0 == iCtr) || (0 == iCtr % 2))
				{	
					DimArray[iCtr] = PtrArray[iCtr] ;
				}
				else
				{
					if(3 == nDir)
					{
						DimArray[iCtr] = PtrArray[iCtr] - nFixed ;
					}
					else
					{
						DimArray[iCtr] = nFixed - PtrArray[iCtr] ;
					}
					DimArray[iCtr] = DimArray[iCtr] * ( SzMin / SzOrg );
				}
			}
		}
	}
}

iSizeAnim.prototype.ExeAnim = function(TagObj)
{
	var nShpType = this.ShpType ;
	var TagVal = TagObj.Val ;
	if(TagVal < this.ValMin) {TagVal = this.ValMin ;}
	if(TagVal > this.ValMax) {TagVal = this.ValMax ;}
	var ValDiff = TagVal - this.ValMin ;
	var nDir = this.Dir;
	var nKinObj = this.pShp.KinShp ;

	if((Shp_Rect == nShpType) || (Shp_Bitmap == nShpType) || (Shp_WrapTxt == nShpType))
	{
		if(nDir < 3)
		{
			var NewSz = this.nSzOrgX + this.PosMin + ValDiff * this.nRatio;
			if(1 == nDir)
			{
				var nStartX = this.nFixedDim - NewSz ;
				nKinObj.setX(nStartX);
			}
			else if(2 == nDir)
			{
				var nStartX = this.nFixedDim - 0.5 * NewSz ;
				nKinObj.setX(nStartX);
			}
			nKinObj.setWidth(NewSz);
		}
		else if(nDir < 6)
		{
			var NewSz = this.nSzOrgY + this.PosMin + ValDiff * this.nRatio;
			if(4 == nDir)
			{
				var nStartY = this.nFixedDim - NewSz ;
				nKinObj.setY(nStartY);
			}
			else if(5 == nDir)
			{
				var nStartY = this.nFixedDim - 0.5 * NewSz ;
				nKinObj.setY(nStartY);
			}
			nKinObj.setHeight(NewSz);
		}
	}
	else if(Shp_Ellipse == nShpType)
	{
		var nDir = this.Dir, xPos = 0, yPos = 0 ;
		var NewSz = 0.5 * ValDiff * this.nRatio;
		if(nDir < 3)
		{
			NewSz += this.nSzOrgX ;
			nKinObj.setRadius(NewSz, this.nSzOrgY);
		}
		else
		{
			NewSz += this.nSzOrgY ;
			nKinObj.setRadius(this.nSzOrgX, NewSz);
		}
		
		if(0 == nDir)
		{
			xPos = this.nFixedDim + NewSz ;
			nKinObj.setX(xPos);
		}
		else if(1 == nDir)
		{
			xPos = this.nFixedDim - NewSz ;
			nKinObj.setX(xPos);
		}
		else if(3 == nDir)
		{
			yPos = this.nFixedDim + NewSz ;
			nKinObj.setY(yPos);
		}
		else if(4 == nDir)
		{
			yPos = this.nFixedDim - NewSz ;
			nKinObj.setY(yPos);
		}
	}
	else if((Shp_Polygon == nShpType) || (Shp_Polyline == nShpType))
	{
		var NewSz, SizeRatio ;
		var PtrArray = this.pShp.PtrArray ;
		var DimArray = this.pShp.DimArray ;
		var PtrSetArray = this.pShp.PtrSetArray ;
		if((0 == nDir) || (1 == nDir))				// ExeAnim
		{
			NewSz = this.nSzOrgX + ValDiff * this.nRatio;
			SizeRatio = NewSz / this.nSzOrgX ;

			for(var iCtr = 0 ; iCtr < PtrArray.length ; iCtr ++)
			{
				if((0 == iCtr) || (0 == iCtr %2))
				{
					if(0 == nDir)
					{
						PtrSetArray[iCtr] = this.nFixedDim + (DimArray[iCtr] * SizeRatio);
					}
					else
					{
						PtrSetArray[iCtr] = this.nFixedDim - (DimArray[iCtr] * SizeRatio);
					}
				}
				else
				{
					PtrSetArray[iCtr] = PtrArray[iCtr] ;
				}
			}
		}
		else if((3 == nDir) || (4 == nDir))
		{
			NewSz = this.nSzOrgY + ValDiff * this.nRatio;
			SizeRatio = NewSz / this.nSzOrgY ;

			for(var iCtr = 0 ; iCtr < PtrArray.length ; iCtr ++)
			{
				if((0 == iCtr) || (0 == iCtr %2))
				{
					PtrSetArray[iCtr] = PtrArray[iCtr] ;
				}
				else
				{
					if(3 == nDir)
					{
						PtrSetArray[iCtr] = this.nFixedDim + (DimArray[iCtr] * SizeRatio);
					}
					else
					{
						PtrSetArray[iCtr] = this.nFixedDim - (DimArray[iCtr] * SizeRatio);
					}
				}
			}
		}
		nKinObj.setPoints(PtrSetArray);
	}
}

function AddSizeAnim(nShObj, Id, TagIdx, ShpIdx, ShpType, AncType, Dir, PosMin, PosMax, ValMin, ValMax)
{
	nShObj.Size = new iSizeAnim(Id, TagIdx, ShpIdx, ShpType, AncType, Dir, PosMin, PosMax, ValMin, ValMax);
	nShObj.Size.pShp = nShObj ;
	AnimPresent();	
}

//=========================================================================
function iBlinkAnim(Id, TagIdx, ShpIdx, ShpType, BlinkBits, ValMin, ValMax, BClrOn, BClrOff, IClrOn, IClrOff, TClrOn, TClrOff)
{
	this.Id = Id ; this.TagIdx = TagIdx ; this.ShpIdx = ShpIdx ; this.ShpType = ShpType ; 
	this.BlinkBits = BlinkBits ; this.ValMin = ValMin ; this.ValMax = ValMax ; this.BClrOn = BClrOn ; this.BClrOff = BClrOff ;
	this.IClrOn = IClrOn ; this.IClrOff = IClrOff ; this.TClrOn = TClrOn ; this.TClrOff = TClrOff ;
}

iBlinkAnim.prototype.InitAnim = function()
{
	//TagArray[this.TagIdx].AddAnim(this);
	AddAnimToTag(this, this.TagIdx);
	AddBlinkToArray(this);

	var bBits = this.BlinkBits ; this.bfType = bBits & 7 ;
	bBits = this.BlinkBits >> 3 ; this.bfHow = bBits & 1 ;
	
	bBits = this.BlinkBits >> 4 ; var bfWhat = bBits & 7 ;
	bBits = this.BlinkBits >> 7 ; var bfRate = bBits & 3 ;
	
	this.bBlink = false ; this.bShow = true ;
	this.ShowCtr = 0 ; this.MaxCtr = 3 ;
	this.OrgBrdrClr = "RGB(0, 0, 0)";
	this.OrgFillClr = "RGB(255, 0, 0)";
	this.OrgTxtClr = "RGB(0, 255, 0)";
	this.BlinkBorder = false ; this.BlinkFill = false ; this.BlinkText = false ;
	
	if(bfWhat & 1) { this.BlinkBorder = true ; }
	if(bfWhat & 2) { this.BlinkFill = true ; }
	if(bfWhat & 4) { this.BlinkText = true ; }

	if(0 == bfRate) { this.MaxCtr = 4 ; }
	else if(1 == bfRate) { this.MaxCtr = 2 ; }
	else{ this.MaxCtr = 1 ; }
	
	var nShpType = this.ShpType ;
	if((Shp_Rect == nShpType) || (Shp_Ellipse == nShpType) || (Shp_Polygon == nShpType) || (Shp_Arc == nShpType))
	{
		this.OrgFillClr = this.pShp.f1clr ;
		this.OrgBrdrClr = this.pShp.lclr ;
	}
	else if((Shp_Line == nShpType) || (Shp_Polyline == nShpType))
	{
		this.OrgBrdrClr = this.pShp.lclr ;
	}
	else if(Shp_Text == nShpType)
	{
		this.OrgTxtClr = this.pShp.tclr ;
	}
}

iBlinkAnim.prototype.ExeAnim = function(TagObj)
{
	var bBlinkToSet = false ;
	var TagVal = TagObj.Val ;
	if(0 == this.bfType)
	{
		if(TagVal != 0)
		{
			bBlinkToSet = true ;
		}
	}
	else if(1 == this.bfType)
	{
		if(TagVal == 0)
		{
			bBlinkToSet = true ;
		}
	}
	else
	{
		if((TagVal >= this.ValMin) && (TagVal <= this.ValMax))
		{
			if(2 == this.bfType)
			{
				bBlinkToSet = true ;
			}
		}
		else
		{
			if(3 == this.bfType)
			{
				bBlinkToSet = true ;
			}
		}
	}
	this.bBlink = bBlinkToSet ;
}

iBlinkAnim.prototype.ExeBlink = function()
{
	var bToShow = false, bChgd = false ;
	var nShpType = this.ShpType ;
	var nKinObj = this.pShp.KinShp ;
	
	if(this.bBlink)
	{
		this.ShowCtr++ ;
		if(this.ShowCtr >= this.MaxCtr)
		{
			this.ShowCtr = 0 ;
			bChgd = true ;
			this.bShow = ! this.bShow ;
		}
	}
	else
	{
		if(0 == this.bfHow)
		{
			nKinObj.show();
		}
		else
		{
			if((Shp_Rect == nShpType) || (Shp_Ellipse == nShpType) || (Shp_Polygon == nShpType)) 
			{
				nKinObj.setFill(this.OrgFillClr);
				nKinObj.setStroke(this.OrgBrdrClr);
			}
			else if((Shp_Line == nShpType) || (Shp_Polyline == nShpType))	
			{
				nKinObj.setStroke(this.OrgBrdrClr);
			}
			else if(Shp_Text == nShpType)	
			{
				nKinObj.setFill(this.OrgTxtClr);
			}
			else if(Shp_Arc == nShpType)
			{
				nKinObj.lclr = this.OrgBrdrClr ;
				nKinObj.f1clr  = this.OrgFillClr ;
			}
		}
	}
	
	if(bChgd)
	{
		if(this.bShow)
		{
			if(0 == this.bfHow)
			{
				nKinObj.show();
			}
			else
			{
				if(true == this.BlinkFill)
				{
					if(Shp_Arc == nShpType)
					{
						nKinObj.f1clr = this.IClrOn ;
					}
					else
					{
						nKinObj.setFill(this.IClrOn);
					}
				}
				if(true == this.BlinkText)
				{
					nKinObj.setFill(this.TClrOn);
				}
				if(true == this.BlinkBorder)
				{
					if(Shp_Arc == nShpType)
					{
						nKinObj.lclr = this.BClrOn ;
					}
					else
					{
						nKinObj.setStroke(this.BClrOn);
					}
				}
			}
		}
		else
		{
			if(0 == this.bfHow)
			{
				nKinObj.hide();
			}
			else
			{	
				if(true == this.BlinkFill)
				{
					if(Shp_Arc == nShpType)
					{
						nKinObj.f1clr = this.IClrOff ;
					}
					else
					{
						nKinObj.setFill(this.IClrOff);
					}
				}
				if(true == this.BlinkText)
				{
					nKinObj.setFill(this.TClrOff);
				}
				if(true == this.BlinkBorder)
				{
					if(Shp_Arc == nShpType)
					{
						nKinObj.lclr = this.BClrOff ;
					}
					else
					{
						nKinObj.setStroke(this.BClrOff);
					}
				}
			}
		}
	}
}

function AddBlinkAnim(nShObj, Id, TagIdx, ShpIdx, ShpType, BlinkBits, ValMin, ValMax, BClrOn, BClrOff, IClrOn, IClrOff, TClrOn, TClrOff)
{
	nShObj.Blink = new iBlinkAnim(Id, TagIdx, ShpIdx, ShpType, BlinkBits, ValMin, ValMax, BClrOn, BClrOff, IClrOn, IClrOff, TClrOn, TClrOff);
	nShObj.Blink.pShp = nShObj ;
	AnimPresent();	
}

//=========================================================================
