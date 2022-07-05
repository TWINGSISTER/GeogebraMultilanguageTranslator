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
	//they also are not asked to the translator as a group in output
	updateDictionary(["\\text{", "}","{","}}","{{","={","}{","}=",
		">it",">en",">fr",">de",">zh",">es",":", "", " ", " ; ", " / ",
		"\\times","\\times ","A","}=\\frac{","+","-","=","/","\\",
		"\\left(","\\right)","\\left","\\right","=\\frac{","θ=\\frac{"," θ=\\frac{" ,
		"a+\\frac{b}{",'=a+\\frac{b}{',"}=\\frac{a"," a&=&\\frac{","a&=&\\frac{","f\(x\)=","ax",
		"\\left\\{","begin{array}{r c l}",".⇔\\left\\{","begin{array}{r c l} a&=&\\frac{",
		"begin{array}{r c l} a&=&","AB=\\sqrt{",
		".⇔\\left\{",
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAA","AAAAAA","AAA","sin", "cos","#ff0000","#0000ff","#6600cc",
		"ff0000","ff00000","ff00ff","FFFFFF",".\\text{","n\\p\\text{","nAlias",
		"×\\textcolor{red}{",'\\textcolor{red}{','}}{\\textcolor{blue}{','=\\frac{\\textcolor{red}{',
		'}×\\textcolor{blue}{','=\\textcolor{red}{',
		'\\frac{\\textcolor{red}{a',
		"}}{\\textcolor{blue}{a",
		'\\frac{\\textcolor{red}{a',
		'}}=\\textcolor{red}{',
		'\\textcolor{red}{a',
		'}×\\textcolor{blue}{a',
		'\\textcolor{red}{a^{',
		'a^n\\text{',
		"     }{   \\textcolor{red}{ (","}{ \\textcolor{red}{ (",
		'\\frac{a ^{',"a^ma^p","ab^3","ab^2",
		"Z=\\frac{","Re","ax+b","cx+d",
		"newnfracenonce","newrepnum","newrepden","newfraction","S=\\sum_","\\overline{","Me=","med",
		"u_n\\text{","×q⇔q=\\frac{v_","v_n\\text{","500ff","rep","raz","AB","BA","BC","CB","AC","CA",
		"trep","f'(x)=\\frac{",
		"(ln(x^2+4))^2",
		"\\ln(",
		"\\ln[",
		"4x/(x^2+4)*ln(x^2+4)",
		"\\ln\\",
		"eft(x^2+4",
		"newfonctionfderive",
		"newderiveTex",
		"newfonction",
		"newfonctionTex",
		"newformuleDeriveTex",
		"newuTex",
		"\\ln[",
		"newcomposeeTex",
		"newderiveuTex",
		"exp(-x+2)",
		"-exp(-x+2)",
		"=\\frac{u\'",
		"f'(x)=\\frac{",
		"=\\frac{w\'",
		"=\\frac{w",
		"(ax+b)(cx+d)", "(ax+b)^2","(a+b)^2=a^2+2ab+b^2" , "(a-b)^2=a^2-2ab+b^2" ,
		"(a+b)^2\\not=" , "(a-b)^2\\not=","[AB]","OI=OJ=1)",
		"AB=","AC=","BC=","ABC",
		"AB^2=AC^2+BC^2⇒AB^2=",
		"^2⇒AB^2=",
		"⇒AB^2=",
		"AB=",
		"xrep+yrep* ί",
		"phantom{.}z^","\\Delta=","\\Delta}","-\\Delta}","n\\text{",
		"z&=&\\frac{"
	]);
	// if //["www word","word"] is in the list below word is sent to the translator and what is back e.g. mot
	// is substituted getting "www mot" see code in divPlainText
	// the first string "www word" cannot  be a REGEXP
	var diffdict = new Map([["^∧2 plutôt que ","plutôt que "],
		["^∧2 pour saisir ","pour saisir "],
		["a^3 b^2 plutôt que a^3*b^2","plutôt que"],
		["text{^∧3 et non pas }ab","et non pas"],
		["Calculer:}}","Calculer:"],
		["v_n\\text{ en fonction de }n.","en fonction de"],
		["n fonction de }n.","fonction de"],
		["Saisir:3/4*(1/3)∧n","Saisir:"]
		]);
	KnowSubsInit(diffdict); 
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
	// for negative args |args| parameters are skipped 
	["begin",-1],
	["end",-1],
	["cr",0],
	["in",0],
	["times",0],
	["dfrac",2],
	["left",0], ["right",0],
	["left[",0], ["right]",0],
	["left(",0], ["right)",0],
	['left{',0],['right}',0],['sqrt{',0],['bold{',0],
	["left\\[",0], ["right\\]",0],
	["left\\(",0], ["right\\)",0],
	['left\\{',0],['right\\}',0],['sqrt\\{',0],['bold\\{',0],['ovalbox{',0],
	["phantom",1],["textbf",1],["varnothing",0],["longleftarrow",0],
	[";",0],
	["alpha",0],
	["beta",0],
	["beta'",0],["Longleftrightarrow",0],
	["cup",0],
	["leqslant",0],
	['mathbb',1],
	["geqslant",0],
	["bold",1],["underline",1],
	["fgcolor",2],
	["pi",0],
	["cos",0],
	["sin",0],
	["infty",0],
	["sqrt",1],["vec",1],["fgcolor",1],
	["cr",0],
	["textcolor",2],
	["cdot",0],
	["longmapsto",0],
	["overrightarrow",1],
	["mathcal",1],
	["\\",0],
	[",",0],
	["begin{array}",-1], // for \begin{array}
	["end{array}",0], 
	["begin{array}{l}",0], // for \begin{array} 
	["begin{array}{c}",0],
	["begin{array}{lc}",0], 
	["begin{array}{rcl}",0],
	["begin{array}{r c l}",0],
	[".\\text{",0],	["n\\text{",0],
	["begin{array}{lrcl}",0]
	//["{l}",0], // for \begin{array} begin skip one argument with -1 
	//["{c}",0],
	//["{lc}",0], 
	//["{rcl}",0],
	//["{array}",0]
			]);
	LatexHandle(dict);
	// regexp patterns to recognize Latex commands. You must enter the args above
	var cmdpattern =[
	'\\\\cr','\\\\\\\\',
	'\\\\;','\\\\,','\\\\!',
	'\\\\left\\\x28','\\\\right\\\x28',
	'\\\\left\\\\[','\\\\right\\\\]',
	'\\\\left\\\\{','\\\\right\\\\}',
	'\\\\left\\(','\\\\right\\)',
	'\\\\left\\[','\\\\right\\]',
	'\\\\left\\{','\\\\right\\}','\\\\sqrt\\{','\\\\bold\\{','\\\\ovalbox\\{',
	'\\\\begin\\{array\\}\\{l\\}',
	'\\\\begin\\{array\\}\\{c\\}',
	'\\\\begin\\{array\\}\\{lc\\}',
	'\\\\begin\\{array\\}\\{r\\s*c\\s*l\\}',
	'\\\\begin\\{array\\}\\{l\\s*r\\s*c\\s*l\\}',
	'\\\\begin\\{array\\}',
	'\\\\end\\{array\\}',
	'\\.\\\\text\\{','n\\\\text\\{',
	'\\\\left','\\\\right', // to get correct match prefixes must be after
	'\\\\[a-zA-Z]{2,}',	
	'\\\\[^a-zA-Z]',	
	'\\\\[^\\{|^\\s|^\\\\]*'
	];
	updateLatexCmdPatterns(cmdpattern);
	// to recognize fragments made up only of Latex code put them here 
	updateLatexComplexPatterns(
	['\\{l\\s*r\\s*c\\s*l\\}','\\{r\\s*c\\s*l\\}','\\{lc\\}','\\{c\\}','\\{l\\}',	
	'\\{array\\}\\{l\\s*r\\s*c\\s*l\\}','\\{array\\}\\{r\\s*c\\s*l\\}','\\{array\\}\\{lc\\}','\\{array\\}\\{c\\}','\\{array\\}\\{l\\}','\\{array\\}'	
	].concat(cmdpattern));
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
		["Inéquationn°","Inequation #"],
		["RAZ","Reset"],["RAZ(àcacher)","Reset (hide)"]
		
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
		["Validerlafigure","Convalida la figura"],
		["RAZ","Reset"],["RAZ(àcacher)","Reset (off)"]
	]);
}
function RT_inittrans() {
	RT_globsto("magic", "ZZ000");
}