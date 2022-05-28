/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
//-----------------------------------------------------------------------
// initialization with configuration
//-----------------------------------------------------------------------
function init() {
	RT_initIncoreOff();
	//list here strings that need no translation
	//They will remain as they are if they are EXACTLY occurring as strings
	//if you put "XYZ" here also \text{XYZ} ""XYZ", "  XYZ  " will pass untranslated.
	updateDictionary(["\\text{", "}","{","}}","{{","={","}{","}=",
		">it",">en",">fr", "", " ", " ; ", " / ",
		"\\times","\\times ","A","}=\\frac{","+","-","=","/","\\",
		"\\left(","\\right)","\\left","\\right","=\\frac{","θ=\\frac{"," θ=\\frac{" ]);
	var dict = new Map( [
	// this dictionary can contain as keys the Latex commands with the number of parameters 
  	["text",1],
  	["bar",1],
	["frac",2],
	[",",0],
	[";",0],
	["!",0],
	["ovalbox",1],
	["br",0],
	["begin",-1],
	["end",-1],
	["cr",0],
	["in",0],
	["times",0],
	["dfrac",2],
	["left",0], ["right",0],
	["left[",0], ["right]",0],
	["left(",0], ["right)",0],
	['left{',0],['right}',0],
	["phantom",1],
	[";",0],
	["alpha",0],
	["beta",0],
	["beta'",0],
	["leqslant",0],
	["geqslant",0],
	["fgcolor",2],
	["pi",0],
	["cos",0],
	["sin",0],
	["sqrt",1],
	["cr",0],
	["textcolor",2],
	["cdot",0],
	["longmapsto",0],
	["overrightarrow",1],
	["\\",0],
	[",",0]
	,
	["{array}{l}",0],
	["{array}",0]
			]);
	LatexHandle(dict);
	// regexp patterns to recognize Latex commands. You must enter the args above
	updateLatexPatterns([
	'\\\\cr','\\\\\\\\',
	'\\\\;','\\\\,','\\\\!',
	'\\\\left\\(','\\\\right\\)',
	'\\\\left\\[','\\\\right\\]',
	'\\\\left\\{','\\\\right\\}',
	'\\\\left','\\\\right', // to get correct match prefixes must be after
	'\\\\[a-zA-Z]{2,}',	
	'\\\\[^a-zA-Z]',	
	'\\\\[^\\{|^\\s|^\\\\]*',
	'\\{array\\}\\{l\\}','\\{array\\}'	
	]);
	//updateNotToTranslatePattern([
	//'UnicodeToLetter\\([0-9]+\\)'	
	//]);
	// if one of  these command is detected  in a string a surrounding  \texts is  not placed 
	// to protect spaces within
	RT_globsto("latexcmds","frac|dfrac|phantom|ovalbox");// "latexcmds" not used elsewhere probably this line can be deleted
	RT_globsto("simplelatexcmds","br|cr|times|right|left");// they do not need curly// "simplelatexcmds" not used elsewhere probably this line can be deleted
	RT_inittrans();
	}
function initFalsePair() {
	updateFalsePair("EN",[
		["Réponsenonvalable",
		 "Wrong\nanswer"],
		[",affixedupointMdansleplancomplexe.",
		 ", affix of point M in the complex plane."],
		["Leplanestmunid'unrepère(O;I;J).Danschaqueexercice,ilfautplacerunpointAconnaissantsescoordonnées.",
		 "The plan is equipped with a coordinate system (O; I; J). In\neach exercise, a point A must be placed knowing \nits coordinates."],
		["Juste","Correct"],
		["Lesignedelaconstanteestfaux.","The sign of the constant is wrong."],
		["Nouvelénoncé","New  exercise"],
		["RéalisationJoëlGauvainLycéeRenéJosuéValin17000LaRochelle",
		 "Design by Joël Gauvain\nLycée René Josué Valin\n17000 La Rochelle"],
		["Donnerlesdeuxréels","Give the two reals "],
		["Dernierexercice","Last exercise"],
		[")de",") in "],
		["Inéquationn°","Inequation #"]
	]);
	updateFalsePair("IT",[
		["Réponsenonvalable",
		 "Risposta\nsbagliata"],
		[",affixedupointMdansleplancomplexe.",
		 ", posizione del punto M sul piano complesso."],
		["Leplanestmunid'unrepère(O;I;J).Danschaqueexercice,ilfautplacerunpointAconnaissantsescoordonnées.",
		 "Il piano è dotato di un riferimento (O;I;J). In ogni\nesercizio, un punto A deve essere collocato conoscendo\nle sue coordinate."],
		["Lesignedelaconstanteestfaux.","Il segno della costante è sbagliato."],
		["Juste","Giusto"],
		[",affixedupointMdansleplancomplexe.",", immagine del punto M nel piano complesso"],
		["Donner","Dare"],
		["Nouvelénoncé","Nuovo esercizio"],
		["RéalisationJoëlGauvainLycéeRenéJosuéValin17000LaRochelle",
		 "Autore: Joël Gauvain\nLycée René Josué Valin\n17000 La Rochelle"],
		["Donnerlesdeuxréels","Dare due numeri "],
		["Score","Punteggio"],
		["Inéquationn°","Disequazione n°"],
		["Dernierexercice","Ultimo esercizio"],
		["L'arctracéestassociéàuneinéquation","L' arco tracciato è associato ad una disequazione"],
		["Leplan","Il piano"],
		["l'inéquationsuivante:","la disequazione seguente "],
		["Lesnombres","I numeri"],
		["dutype","del tipo"],
		[")de",") in "],
		["Vousaveztracélacourbedelafonctionsinus","Avete tracciato il grafico della funzione seno"],
		["n'appartientpasàl'intervalledonné"," non appartiene all' intervallo dato"],
		["Validerlafigure","Convalida la figura"]
	]);
}
function RT_inittrans() {
	RT_globsto("magic", "ZZ000");
}