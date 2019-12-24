//fileName ="crystal.xyz";
 authors="";
 title="";
 caption="";
 ampl_vib=3;
 ampl_vec=10;
// reference="";
// myscript="";

////////////////////////////////////////////////////////////
//if(typeof(fileName)=="undefined"){fileName="crystal.xyz"}
if(typeof(myscript)=="undefined"){myscript=""}
defaultScript=" set antialiasdisplay ON;";
////////////////////////////////////////////////////////////
function update(){
 var str="select all;";
 if(document.getElementById("vib_on").checked){
  str=str+"vibration ON;"
 }else{
  str=str+"vibration OFF;"
 }
 if(document.getElementById("as1").checked){ str=str+"vibration scale "+ampl_vib+";" }
 if(document.getElementById("as2").checked){ str=str+"vibration scale "+ampl_vib*2+";" }
 if(document.getElementById("as3").checked){ str=str+"vibration scale "+ampl_vib*4+";" }

 if(document.getElementById("vect_on").checked){
  str=str+"vector ON;vector 0.03;"
 }else{
  str=str+"vector OFF;"
 }
 if(document.getElementById("vs1").checked){ str=str+"vector scale "+ampl_vec+";" }
 if(document.getElementById("vs2").checked){ str=str+"vector scale "+ampl_vec*2.5+";" }
 if(document.getElementById("vs3").checked){ str=str+"vector scale "+ampl_vec*5+";" }

 if(periodicity==0){
  document.getElementById("cellCtrl").style.display="none";
 }else{
  if(document.getElementById("cell").checked){
   str=str+"script inline @scrUC;"
  }else{
   str=str+"draw uc*off;"
  }
 }
 if(document.getElementById("persp").checked){
  str=str+"set perspectivedepth ON;"
 }else{
  str=str+"set perspectivedepth OFF;"
 }

 if(document.getElementById("at_tiny").checked){ str=str+"spacefill 5 %;" }
 if(document.getElementById("at_small").checked){ str=str+"spacefill 8 %;" }
 if(document.getElementById("at_normal").checked){ str=str+"spacefill 15 %;" }

 if(document.getElementById("bond_tiny").checked){ str=str+"wireframe 0.05;" }
 if(document.getElementById("bond_small").checked){ str=str+"wireframe 0.1;" }

 model=parseInt(document.getElementById("modes").value);
 if(! model){ model=firstFreq}
str="model "+model+";set echo bottom left;color echo black;font echo 14 serif ;echo "+modelInfo.models[model-1].name+";"+str+myscript +";script inline @commun;"+scr;

 Jmol.script(jmolApplet0,str);


 return str;
}
////////////////////////////////////////////////////////////
        function modelInf(modelSetName,modelCount,models) {
            this.modelSetName = modelSetName;
            this.modelCount = modelCount;
            this.models = models;
        }      
////////////////////////////////////////////////////////////
        function modell(name,num,vibrationVectors,modelProperties) {
            this.name = name;
            this.num = num;
            this.vibrationVectors = vibrationVectors;
            this.modelProperties = modelProperties;
}
////////////////////////////////////////////////////////////
        function modelproperty(FreqValue,Frequency,FrequencyLabel,IRactivity,IRintensity,Ramanactivity,vibrationalSymmetry) {
            this.FreqValue = FreqValue;
            this.Frequency = Frequency;
            this.FrequencyLabel = FrequencyLabel;
            this.IRactivity = IRactivity;
            this.IRintensity = IRintensity;
            this.Ramanactivity = Ramanactivity;
            this.vibrationalSymmetry = vibrationalSymmetry;
}
////////////////////////////////////////////////////////////
function createModelInfo(m){
  models=new Array();
  nbfreq=0;
  for(im=0;im<m.modelCount;im++){
   vibrationVectors=m.models[im].vibrationVectors;
   modelname=m.models[im].name;
   num=m.models[im].num;
   if(vibrationVectors){
    nbfreq++;
    tstr=modelname.split(";");
    vibrationalSymmetry=tstr[2].split('=')[1];
    FreqValue=tstr[4].split('=')[1]
    Frequency=tstr[6].split('=')[1]
    IRintensity=tstr[5].split('=')[1]
    IRactivity=tstr[3].split('=')[1]
    Ramanactivity=tstr[1].split('=')[1]
    FrequencyLabel=tstr[0].split('=')[1]
    modelp=new modelproperty(FreqValue,Frequency,FrequencyLabel,IRactivity,IRintensity,Ramanactivity,vibrationalSymmetry) 
    modelname="["+nbfreq+"]  "+Frequency+"  Sym : "+vibrationalSymmetry+"  "+FrequencyLabel+"  IRintens : "+IRintensity;
   }else{
    modelp=""; 
    modelname="Click on a frequency to see the corresponding mode";
   }
   models[im]= new modell(modelname,num,vibrationVectors,modelp);
  }
  modelInfo= new modelInf(m.modelSetName,m.modelCount,models);
  return modelInfo;
}
////////////////////////////////////////////////////////////
function setUC(){
if(crystalOutput){
// periodicity=Jmol.getPropertyAsString(jmolApplet0,"auxiliaryInfo.symmetryType");
// temp=periodicity.indexOf('D');
// periodicity=Number(periodicity.substring(temp-1,temp));
 strUC=Jmol.evaluate(jmolApplet0,"script('model 3;show unitcell')");
 strUC=strUC.split('\n')[1];
 strUC=strUC.replace("["," ").replace("]"," ").replace(/,/g,'\n');
}else{
 strUC=Jmol.evaluate(jmolApplet0,"UC");
 periodicity=Jmol.evaluate(jmolApplet0,"periodicity");
}
//     strUC=strUC.replace("["," ").replace("]"," ");
// strUC=strUC.replace("{"," ").replace("}"," ").;
//if (periodicity>0){
 tstrUC=strUC.split('\n');
 orig=tstrUC[0].trim();
 switch (periodicity){
  case 1:
   veca=tstrUC[1].trim();
   vecb='{0 0 0}';
   vecc='{0 0 0}';
   break;
  case 2:
   veca=tstrUC[1].trim();
   vecb=tstrUC[2].trim();
   vecc='{0 0 0}';
   break;
  case 3:
   veca=tstrUC[1].trim();
   vecb=tstrUC[2].trim();
   vecc=tstrUC[3].trim();
   break;
  }
// }
}
////////////////////////////////////////////////////////////
//function set_title(a){
// title=a;
//}
////////////////////////////////////////////////////////////
//function set_authors(a){
// authors=a;
//}
////////////////////////////////////////////////////////////
//function set_caption(a){
// caption=a;
//}
////////////////////////////////////////////////////////////
function buildUC(o,a,b,c){
 var O=orig.replace('{','').replace('}','').trim().split(' '); 
 var va=a.replace('{','').replace('}','').trim().split(' '); 
 var vb=b.replace('{','').replace('}','').trim().split(' '); 
 var vc=c.replace('{','').replace('}','').trim().split(' '); 
 for(var i=0;i<O.length;i++){O[i]=parseFloat(O[i]);}
 for(var i=0;i<va.length;i++){va[i]=parseFloat(va[i]);}
 for(var i=0;i<vb.length;i++){vb[i]=parseFloat(vb[i]);}
 for(var i=0;i<vc.length;i++){vc[i]=parseFloat(vc[i]);}

 var pt1="{"+O.join(',')+"}";
 var pt2="{"+(O[0]+va[0])+","+(O[1]+va[1])+","+(O[2]+va[2])+"}";
 var pt3="{"+(O[0]+va[0]+vb[0])+","+(O[1]+va[1]+vb[1])+","+(O[2]+va[2]+vb[2])+"}";
 var pt4="{"+(O[0]+vb[0])+","+(O[1]+vb[1])+","+(O[2]+vb[2])+"}";

 var pt5="{"+(O[0]+vc[0])+","+(O[1]+vc[1])+","+(O[2]+vc[2])+"}";
 var pt6="{"+(O[0]+va[0]+vc[0])+","+(O[1]+va[1]+vc[1])+","+(O[2]+va[2]+vc[2])+"}";
 var pt7="{"+(O[0]+va[0]+vb[0]+vc[0])+","+(O[1]+va[1]+vb[1]+vc[1])+","+(O[2]+va[2]+vb[2]+vc[2])+"}";
 var pt8="{"+(O[0]+vb[0]+vc[0])+","+(O[1]+vb[1]+vc[1])+","+(O[2]+vb[2]+vc[2])+"}";

 var srcUc="";
 srcUc+="draw uc01 "+pt1+" "+pt2+" color black;"
 srcUc+="draw uc02 "+pt2+" "+pt3+" color black;"
 srcUc+="draw uc03 "+pt3+" "+pt4+" color black;"
 srcUc+="draw uc04 "+pt4+" "+pt1+" color black;"
 srcUc+="draw uc05 "+pt1+" "+pt5+" color black;"
 srcUc+="draw uc06 "+pt2+" "+pt6+" color black;"
 srcUc+="draw uc07 "+pt3+" "+pt7+" color black;"
 srcUc+="draw uc08 "+pt4+" "+pt8+" color black;"
 srcUc+="draw uc09 "+pt5+" "+pt6+" color black;"
 srcUc+="draw uc10 "+pt6+" "+pt7+" color black;"
 srcUc+="draw uc11 "+pt7+" "+pt8+" color black;"
 srcUc+="draw uc12 "+pt8+" "+pt5+" color black;"
 return srcUc;
}
////////////////////////////////////////////////////////////
function init(s){
 var scr="set refreshing false;load '"+fileName+"';"+defaultScript;
 Jmol.scriptWait(jmolApplet0,scr+s);
 periodicity=Jmol.getPropertyAsString(jmolApplet0,"auxiliaryInfo.symmetryType");
 temp=periodicity.indexOf('D');
 if(temp>0){
 periodicity=Number(periodicity.substring(temp-1,temp));
 }else{
  periodicity=3;
 }
 firstFreq=0;
 atomInfo=Jmol.getPropertyAsArray(jmolApplet0,"atomInfo");
 if(crystalOutput){
 modelInfo=Jmol.getPropertyAsArray(jmolApplet0,"modelInfo");
}else{
 modelInfoRaw=Jmol.getPropertyAsArray(jmolApplet0,"modelInfo");
 modelInfo=createModelInfo(modelInfoRaw);
}
if(typeof(authors)=="undefined"){authors="CRYSTAL user"}
if(typeof(title)=="undefined"){title=modelInfo.modelSetName}
if(typeof(reference)=="undefined"){reference="Unpublished"}

  document.getElementById("cite").innerHTML=reference;
  document.getElementById("auth").innerHTML=authors;
  document.getElementById("titre").innerHTML=title;
  document.getElementById("caption").innerHTML=caption;

 for(isymm=0;isymm<document.getElementById("symmetries").length;isymm++){
  document.getElementById("symmetries").options[isymm]=null;
 }

 vibSymm=new Array();
 nbDiffSymm=0;
 for(imod=1;imod<modelInfo.modelCount;imod++){
  if(modelInfo.models[imod].vibrationVectors){
  Symm=modelInfo.models[imod].modelProperties.vibrationalSymmetry;
  if(firstFreq==0 && modelInfo.models[imod].modelProperties.FreqValue<50){firstFreq=imod+1}
  found=false;
  for(isymm=0;isymm<vibSymm.length;isymm++){
   if(Symm==vibSymm[isymm]){found=true;break}
  }
  if(! found){
   vibSymm[nbDiffSymm]=Symm;
   document.getElementById("symmetries").options[nbDiffSymm]=new Option(Symm,Symm);
   nbDiffSymm++;
  }
  }
 }
 document.getElementById("symmetries").options[0].defaultSelected=true;


 updateModes();


 str="<TABLE border='1'><TR>\n";
 nbDiffElem=0;
 sysElem=new Array();
 sysSym=new Array();
 sysColor=new Array();
 for(iat=0;iat<atomInfo.length;iat++){
  elem=atomInfo[iat].elemno;
  found=false;
  for(ielem=0;ielem<sysElem.length;ielem++){
   if(elem==sysElem[ielem]){found=true;break}
  }
  if(! found){
   sysElem[ielem]=elem;
   sysSym[ielem]=atomInfo[iat].sym;
   sysColor[ielem]="#"+atomInfo[iat].color.substr(2,6).toUpperCase();
   str=str+"<TD WIDTH=30 ALIGN='center' STYLE='background-color:";
   str=str+sysColor[ielem];
   str=str+";'><B><BIG>"+sysSym[ielem]+"</BIG></B></TD>";
   ielem++;
  }
 }
str=str+"</TR></TABLE>";
 document.getElementById("legend").innerHTML= str;
 if(periodicity>0 || xyzFile){
  setUC();
  var scrUC=buildUC(orig,veca,vecb,vecc);
  scr="scrUC=\""+scrUC+"\";";
 }else{
  scr='';
 }
 Jmol.script(jmolApplet0,"set refreshing true;"+scr+"model "+(firstFreq+1)+";center visible;unitcell off;axes off;"+myscript+"set refreshing true;");
 update();
}
////////////////////////////////////////////////////////////
function updateModes(){
 ionly=0;

 for(imod=document.getElementById("modes").length-1;imod>=0;imod--){
  document.getElementById("modes").options[imod]=null;
 }
 radio=document.getElementsByName("Only")
 for(iradio=radio.length-1;iradio>=0;iradio--){
  if(radio[iradio].checked){ionly=iradio;}
 }
 imodOnly=0;
 for(imod=1;imod<modelInfo.modelCount;imod++){
  isWithVib=modelInfo.models[imod].vibrationVectors;
if(isWithVib){
  Freq=modelInfo.models[imod].modelProperties;
  switch(ionly) {
   case 0:  // All
    document.getElementById("modes").options[imodOnly]=new Option(Freq.FreqValue,imod+1);
    imodOnly++;
    break;
   case 1: // IR
    if(Freq.IRactivity=="A"){
     document.getElementById("modes").options[imodOnly]=new Option(Freq.FreqValue,imod+1);
     imodOnly++;
    }
    break;
   case 2: // Raman
    if(Freq.Ramanactivity=="A"){
     document.getElementById("modes").options[imodOnly]=new Option(Freq.FreqValue,imod+1);
     imodOnly++;
    }
    break;
   case 3: // Symmetry
    if(Freq.vibrationalSymmetry==document.getElementById("symmetries").value){
     document.getElementById("modes").options[imodOnly]=new Option(Freq.FreqValue,imod+1);
     imodOnly++;
    }
    break;
  }
}
 }
}


////////////////////////////////////////////////////////////
jmolIsReady = function(theJmol) { document.title = theJmol._id + " is ready"; }
