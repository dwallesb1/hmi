//Constants.
const Shp_Rect = 10, Shp_Ellipse = 11, Shp_Line = 12, Shp_Text = 13, Shp_PtrArry = 14, Shp_Polygon = 15 ;
const Shp_Polyline = 16, Shp_Bitmap = 17, Shp_Arc = 18, Shp_WrapTxt = 19, Shp_Button = 20, Shp_Group = 21, Shp_Trend = 22 ;
const Anim_Tag = 50, Anim_MoveX = 51, Anim_MoveY = 52, Anim_SizeX = 53, Anim_SizeY = 54, Anim_ShowVal = 55 ;
const Anim_Color = 56, Anim_Visi = 57, Anim_Blink = 58, Anim_Rotate = 59 ;

// Relating to Reading file
var ReadNos = new Array(), logstr;
var RNo = new Array();
RNo.UI_8 = 0; RNo.UI_16 = 1; RNo.UI_32 = 2;
RNo.I_8 = 3; RNo.I_16 = 4; RNo.I_32 = 5; 
RNo.F_32 = 6; RNo.F_64 = 7;

// Connection
var Connected = 0 ;

// All Variables.
var KinStage, KinLayer_1, bGotShapes = false, bProcessAnims = false ;
var logData = true, bImgPresent = false ;
var UpdateInterval = 1000 ;
var SrvrTimeDiff = 0 ;
var SrvrTimeZone = 0 ;
var xmlhttp_hmi, xmlhttp_tags, RespReq_hmi = 0, RespReq_tags = 0, XMLHttpOk = 1 ;

var InfiObjArray =  new Array();
var TagArray =  new Array(), TagObjIdx = 0 ;
var ImgArray = new Array();
var FillAtrribs = new Array();
var KinGroupArray = new Array();
var BlinkArray = new Array();
var TrendArray = new Array();
var BlinkPresent = false, TrendPresent = false ;

var LstShape ;
var iCtr ;