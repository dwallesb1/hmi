function IsCanvasSupported()
{
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

function GetAngle(x1, y1, x0, y0)
{
	var x = x1 - x0, y = y1 - y0 ;
	var vToRtn = 0 ;
	if((0 == x) && (0 == y)){vToRtn = 0 ;}
	else if(0 == x){if(y > 0){vToRtn = 90 ;}else{vToRtn = 270 ;}}
	else if(0 == y){if(x > 0){vToRtn = 0 ;}else{vToRtn = 180 ;}}
	else
	{
		var AngRad = Math.atan(y / x);var AngDeg = (AngRad * 180) / Math.PI ;
		if(x < 0){AngDeg = 180 + AngDeg ;}
		else
		{
			if(y < 0){AngDeg = 360 + AngDeg ;}
		}
		vToRtn = AngDeg ;
	}
	return vToRtn ;
}

function GetDist(x1, y1, x2, y2)
{
	var xDist = x2 - x1, yDist = y2 - y1 ;
	var DistSqr = xDist * xDist + yDist * yDist ;
	var Rad = Math.pow(DistSqr, 0.5)
	return Rad ;
}

function GetRotSweep(AngMin, AngMax, RotDir)
{
	var nRotations = 0;
	var rAngleMax = AngMax;
	
	if (rAngleMax >= 360)
	{
		while (rAngleMax >= 360)
		{
			rAngleMax -= 360;
			nRotations++;
		}
	}
	else if (rAngleMax < -360)
	{
		while (rAngleMax <= -360)
		{
			rAngleMax += 360;
			nRotations++;
		}
	}

	var rAngleMin = AngMin;

	if (rAngleMin >= 360)
	{
		while (rAngleMin >= 360)
		{
			rAngleMin -= 360;
			nRotations++;
		}
	}
	else if (rAngleMin < -360)
	{
		while (rAngleMin <= -360)
		{
			rAngleMin += 360;
			nRotations++;
		}
	}
	var  dSweep = Math.abs(rAngleMax - rAngleMin);

	if (RotDir == 1)
	{
		if (dSweep && (rAngleMax > rAngleMin))
		{
			dSweep = 360 - dSweep;
		}
		if (nRotations)
		{
			dSweep += nRotations * 360;
		}
		if (dSweep == 0)
		{
			dSweep = 360;
		}
		dSweep = -dSweep;
	}
	else
	{
		if (dSweep && (rAngleMin > rAngleMax))
		{
			dSweep = 360 - dSweep;
		}
		if (nRotations)
		{
			dSweep += nRotations * 360;
		}
		if (dSweep == 0)
		{
			dSweep = 360;
		}
	}
	return dSweep ;
}

function GetRadAng_Arc(x)
{
	var Rtn = 0 ;
	if(x>0){x=360-x;}else if(x<0){x= -x;}
	Rtn=(x*Math.PI)/180;
	return Rtn;
}

function Deg2Rad(x)
{
	return (x * Math.PI) / 180 ;
}

function DrawLine(ct, x1, y1, x2, y2)
{
	ct.moveTo(x1, y1);
	ct.lineTo(x2, y2);
}

function LoadImgs()
{
	if(true == bImgPresent)
	{
		var ImgIdx = 0 ;
		for(iCtr = 0 ; iCtr < InfiObjArray.length ; iCtr++)
		{
			var nShape = InfiObjArray[iCtr];
			if(Shp_Bitmap == nShape.Id)
			{
				ImgArray[ImgIdx] = new Image ; 
				ImgArray[ImgIdx].src = nShape.strImage; 
				nShape.ImgIdx = ImgIdx ;
				ImgIdx++;
			}
		}
	}
}

function CreateKinShapes()
{
	KinGroupArray[0] = 100 ; // Dummy
	for(iCtr = 0 ; iCtr < InfiObjArray.length ; iCtr++)
	{
		var iShpObj = InfiObjArray[iCtr];
		if(Shp_Group == iShpObj.Id)
		{
			KinGroupArray[iShpObj.GroupId] = iShpObj ;
		}
		
		if(0 == iShpObj.PrtId)
		{
			KinLayer_1.add(iShpObj.GetKinShp());
		}
		else
		{
			KinGroupArray[iShpObj.PrtId].AddiShape(iShpObj);
		}
	}
	KinStage.add(KinLayer_1);
	KinStage.draw();
	
	if(bProcessAnims)
	{
		for(iCtr = 0 ; iCtr < InfiObjArray.length ; iCtr++)
		{
			var iShpObj = InfiObjArray[iCtr];
			iShpObj.InitAnims();
		}
		AttemptAnims();
	}
}

function AttemptShapes()
{
	ShpInterval = setInterval("CheckShapes()", 200);
}

function CheckShapes()
{
	if(bGotShapes)
	{
		bGotShapes = false ;
		if(true == bImgPresent)
		{
			LoadImgs();
			ImgArray[0].onload = function() 
			{
				CreateKinShapes();
			}			
		}
		else
		{
			CreateKinShapes();
		}
		clearInterval(ShpInterval);
	}
}

function AttemptAnims()
{
	if(bProcessAnims)
	{
		connect();
		var AnimInterval = setInterval("DoAnims()", UpdateInterval);
		
		if(BlinkPresent)
		{
			var BlinkInterval = setInterval("ExeBlinks()", 500);
		}

		if(TrendPresent)
		{
			var TrendInterval = setInterval("UpdateTrends()", 1000);
		}
	}
}

function DoAnims()
{
	SendToSrvr();
	ExeAnims();
}

function ExeBlinks()
{
	var nMax = BlinkArray.length ;
	for(iCtr = 0 ; iCtr < nMax ; iCtr++)
	{
		BlinkArray[iCtr].ExeBlink();
	}
	KinLayer_1.draw();
}

function UpdateTrends()
{
	var nMax = TrendArray.length ;
	for(iCtr = 0 ; iCtr < nMax ; iCtr++)
	{
		TrendArray[iCtr].Update();
	}
	KinLayer_1.draw();
}

function ExeAnims()
{
	for(iCtr = 0 ; iCtr < TagArray.length ; iCtr++)
	{
		var TagObj = TagArray[iCtr] ;
		if(true === TagObj.bReady)
		{
			TagObj.ExeAnims();
		}
	}
	KinLayer_1.draw();
}

function AddAnimToTag(AnimObj, TagIdx)
{
	var iTagCtr = 0 , nTagMax = TagArray.length ;
	for(iTagCtr = 0 ; iTagCtr < nTagMax ; iTagCtr++)
	{
		var TagObj = TagArray[iTagCtr] ;
		if(TagIdx === TagObj.Idx)
		{
			TagObj.AddAnim(AnimObj);
			break ;
		}
	}
}

function AddPenToTag(PenObj, TagIdx)
{
	var iTagCtr = 0 , nTagMax = TagArray.length ;
	for(iTagCtr = 0 ; iTagCtr < nTagMax ; iTagCtr++)
	{
		var TagObj = TagArray[iTagCtr] ;
		if(TagIdx === TagObj.Idx)
		{
			TagObj.AddPen(PenObj);
			break ;
		}
	}
}
