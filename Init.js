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
	updateDictionary(["\\mbox{","\\text{", "}","{","}}","{{","={","}{","}=",
	"}×\\textcolor{red}{10^{","=\\textcolor{blue}{",
		">it",">en",">fr",">de",">zh",">es",":", "", " ", " ; ", " / ",
		"\\times","\\times ","A","}=\\frac{","+","-","=","/","\\",
		"\\left(","\\right)","\\left","\\right","=\\frac{","θ=\\frac{"," θ=\\frac{" ,
		"a+\\frac{b}{",'=a+\\frac{b}{',"}=\\frac{a"," a&=&\\frac{","a&=&\\frac{","f\(x\)=","ax",
		"\\left\\{","begin{array}{r c l}",".⇔\\left\\{","begin{array}{r c l} a&=&\\frac{",
		"begin{array}{r c l} a&=&","AB=\\sqrt{",
		".⇔\\left\{","\\sqrt{Den}",
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","AAAAA","AAAAAA","AAA","sin", "cos","#ff0000","#0000ff","#6600cc",
		"ff0000","ff00000","ff00ff","FFFFFF",
		".\\text{","n\\p\\text{",
		".\\mbox{","n\\p\\mbox{",
		"nAlias","n\\text{,",
		"\\color{blue}",
		"\\color{blue}\\mbox{x = }",
		"$\\color{blue}\\mbox{x = }$",
		"×\\textcolor{red}{",'\\textcolor{red}{','}}{\\textcolor{blue}{','=\\frac{\\textcolor{red}{',
		'}×\\textcolor{blue}{','=\\textcolor{red}{',
		'\\frac{\\textcolor{red}{a',
		'}{2}=\\frac{',
		"}}{\\textcolor{blue}{a",
		'\\frac{\\textcolor{red}{a',
		'}}=\\textcolor{red}{',
		'\\textcolor{red}{a',
		'f(x)=\\frac{',
		'}×\\textcolor{blue}{a',
		'\\textcolor{red}{a^{',
		"m_{2}=\\textcolor{#009B00}{",
		'a^n\\text{',
		'a^n\\mbox{',
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
		"(ax+b)(cx+d)",
		"(ax+b)(ax-b)",
		"(ax+b)^2","(a+b)^2=a^2+2ab+b^2" , "(a-b)^2=a^2-2ab+b^2" ,
		"(a+b)^2\\not=" , "(a-b)^2\\not=","[AB]","OI=OJ=1)",
		"AB=","AC=","BC=","ABC",
		"AB^2=AC^2+BC^2⇒AB^2=",
		"^2⇒AB^2=",
		"⇒AB^2=",
		"AB=",
		"\\mbox{Δ = b² - 4×a×c\\\\ici : a = {",": a =",
		"xrep+yrep* ί",
		"phantom{.}z^","\\Delta=","\\Delta}","-\\Delta}","n\\text{","ax+b=",
		"z&=&\\frac{","ax^m+bx^p+c","n\\text{,","P(x)=ax^n+bx^m+cx^r","Δ=b^2-4ac=",
		"xA=","yA=","=\\frac{P","= \\frac{P","|z_\\text{","}-z_\\text{",
		"NA1",
		"NA2",
		"NB1",
		"NB2=",
		"NC1",
		"NC2",
		"NA2=",
		"#DA2570",
		"#3A6ED6",
		"#5991FF",
		"#8575FF",
		"#BD6C43",
		"#eeeeee",
		"#2EB00020",
		"NA1=",
		"NB1=",
		"NB2=",
		"NC1=",
		"NC2=",
		"\\text{CHECK (",
		"\\text{Number correct:",
		"\\text{\\color{",
		"1.75cm",
		"re :","im :",
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
		"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
		"AAAAAAAAA","AM","5000ff","kJ/kg.","kJ/kg",
		"=x_B\\Leftrightarrow",
		"_A+x_I=2x_B\\Leftrightarrow",
		"_I=2x_B-x_A \\Leftrightarrow",
		"=y_B\\Leftrightarrow",
		"_A+y_I=2y_B\\Leftrightarrow",
		"\\mbox{min=",
		"\\mbox{max=",
		".{\\tt",
		"e_D = max_D - min_D =", "e_D=max_D-min_D=",
		"e_B= max_B - min_B=","e_B=max_B-min_B=",
		//"\\tiny{",
		"Num","Den",
		"_I=2y_B-y_A \\Leftrightarrow",
		"m=\\frac{",
		"\\bar{x","\\math{s =l","\\math{s =",
		"\\text{,B=","y=mx+q",
		"60pt",
		"q=\\frac{"
	]);
	// if //["www word","word"] is in the list below word is sent to the translator and what is back e.g. mot
	// is substituted getting "www mot" see code in divPlainText
	// the first string "www word" cannot  be a REGEXP
	var diffdict = new Map([["^∧2 plutôt que ","plutôt que "],
		["Aide : pour répondre “8,35€”, saisir}\\tt{ 8.35}","Aide : pour répondre \\“8,35€\\”, saisir"],
		[". Puis{\\tt",". Puis"],
		[" Statistique à une variable}"," Statistique à une variable"],
		["(3). Puis{","(3). Puis"],
		[" Afficher statistiques}."," Afficher statistiques"],
		["^∧2 pour saisir ","pour saisir "],
		["a^3 b^2 plutôt que a^3*b^2","plutôt que"],
		["text{^∧3 et non pas }ab","et non pas"],
		["Calculer:}}","Calculer:"],
		["v_n\\text{ en fonction de }n.","en fonction de"],
		["n fonction de }n.","fonction de"],
		["Saisir:3/4*(1/3)∧n","Saisir:"],
		["q \\text{ as rational numbers","as rational numbers"],
		["\\text{Mathématiques à Valin","Mathématiques à Valin"],
		["\\text{2. Puis divisons par l'effectif total","2. Puis divisons par l'effectif total"],
		["\\text{3. Puis divisons par l'effectif total","3. Puis divisons par l'effectif total"],
		["\\text{Mathématiques à Valin","Mathématiques à Valin"],
		["\\text{Evaluate the following power.","Evaluate the following power."],
		["\\text{\\bold{Solution:","Solution:"],
		["\\textsf{\\bold{Solution:","Solution:"],
		["\\text{Grade:","Grade:"],
		["\\text{Donnez la valeur exacte de la distance ","Donnez la valeur exacte de la distance"],
		["n fonction de }n:","fonction de"],
		[". Pour calculer l'étendue de D :}",". Pour calculer l'étendue de D :"],
		[". Pour calculer l'étendue de B :}",". Pour calculer l'étendue de B :"],
		["Q=mL avec m=","avec"],
		["Q=mL avec m=","avec"],
		['\\mbox{Ici, comme il faut “ ',"Ici, comme il faut "],
		["\\mbox{attention aux valeurs et aux signes \\\\ ici : a = {","attention aux valeurs et aux signes \\\\ ici : a = {"],
		["\\mbox{Identifier les coefficients a, b et c de l'équation \\\\ de type ax² + bx + c = 0 ci-dessous :\\\ \\{",
		 "Identifier les coefficients a, b et c de l'équation \\\\ de type ax² + bx + c = 0 ci-dessous :\\\\ {"],
		["\\mbox{Résoudre l'équation du second degré ci-dessous \\\\en suivant les étapes proposées\\\\  {",
			"Résoudre l'équation du second degré ci-dessous \\\\en suivant les étapes proposées\\\\  {"],
		['Hint}','Hint'],
		['Possible Solution}','Possible Solution'],
		['\\mbox{Le coefficient directeur vaut :\\\\ ',"Le coefficient directeur vaut :"],
		['” la chaleur\\\\',"la chaleur"],
		["\\text{Ma réponse est :","Ma réponse est :"],
		["\\text{Voici le relevé mesurant la","Voici le relevé mesurant la"]
		]);
	KnowSubsInit(diffdict); 
	var dict = new Map( [
	// this dictionary can contain as keys the Latex commands with the number of parameters 
  	["text",1],
  	["bar",1],
	["frac",2],
	["rule",2],
	[",",0],
	[";",0],
	["!",0],
	["ovalbox",1],
	["fbox",1],
	["normalsize",1],
	["br",0],
	["tiny",1],
	// for negative args |args| parameters are skipped 
	["begin",-1],
	["end",-1],
	["cellcolor",1],
	["scalebox",2],
	["color",-1],
	["color",[false,true]],
	["cr",0],
	["in",0],
	["it",0],
	["small",0],
	["times",0],
	["dfrac",2],
	["left",0], ["right",0],
	["left[",0], ["right]",0],
	["left(",0], ["right)",0],
	['left{',0],['right}',0],['sqrt{',0],['bold{',0],
	["left\\[",0], ["right\\]",0],
	["left\\(",0], ["right\\)",0],
	["sqrt",1],
	['left\\{',0],['right\\}',0],['sqrt\\{',0],['bold\\{',0],['ovalbox{',0],
	["phantom",1],["textbf",1],["varnothing",0],["longleftarrow",0],
	[";",0],
	["alpha",0],
	["beta",0],
	["beta'",0],["Longleftrightarrow",0],["Leftrightarrow",0],
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
	["textit",1],
	["vec",1],["fgcolor",1],
	["mbox",1],
	["tt",0],
	["bf",0],
	["Large",0],
	["cr",0],
	["textcolor",[false,true]],
	// this skip the first argument
			// 	["textcolor",[false,true]], there must be TWO arguments skip "false"
			// if you use negative number form you must tell how many arguments there are and will all be skipped
			// ["textcolor",2] this says that there must be 2 arguments and skip none
			//  ["textcolor",-2] this says that there must be 2 arguments and skip two 

	["cdot",0],
	["longmapsto",0],
	["overrightarrow",1],
	["mathcal",1],
	["math",1],
	["\\n",0],
	["\\",0],
	["\\\\",0],
	["textsf",1],
	["hspace",1],
	["vspace",1],
	[",",0],
	["begin{align}",0],
	["begin{array}",-1], // for \begin{array}
	["end{array}",0], 
	["end{align}",0], 
	["begin{array}{l}",0], // for \begin{array} 
	["begin{array}{c}",0],
	["begin{array}{lc}",0], 
	["begin{array}{rcl}",0],
	["begin{array}{r c l}",0],
	[".\\text{",0],	["n\\text{",0],
	[".\\mbox{",0],	["n\\mbox{",0],
	[".\\tt{",0],
	["begin{array}{lrcl}",0],
	//["textcolor{blue}",0],
	//["{l}",0], // for \begin{array} begin skip one argument with -1 
	//["{c}",0],
	//["{lc}",0], 
	//["{rcl}",0],
	//["{array}",0]
			]);
	LatexHandle(dict);
	// regexp patterns to recognize Latex commands. You must enter the args above
	var cmdpattern =[
	'\\\\cr',
	'\\\\bf',
	'\\\\Large',
	'\\\\\\\\[n]',//+'n',
	//'\\\\\\\\[\\s]*n',//+'n',
	'\\\\\\\\',
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
	'\\\\begin\\{align\\}',
	'\\\\begin\\{array\\}',
	//'\\\\textcolor\\{blue\\}',
	'\\\\end\\{array\\}',
	'\\\\end\\{align\\}',
	'\\.\\\\text\\{','n\\\\text\\{',
	'\\.\\\\mbox\\{','n\\\\mbox\\{',
	'\\.\\\\tt\\{',
	'\\\\left','\\\\right', // to get correct match prefixes must be after
	'\\\\[a-zA-Z]{2,}',	
	'\\\\[^a-zA-Z]',	
	'\\\\[^\\{|^\\s|^\\\\]*',
	//'\\\\textcolor\\{blue\\}'
	];
	updateLatexCmdPatterns(cmdpattern);
	// to recognize fragments made up only of Latex code put them here 
	updateLatexComplexPatterns(
	['\\{l\\s*r\\s*c\\s*l\\}','\\{r\\s*c\\s*l\\}','\\{lc\\}','\\{c\\}','\\{l\\}',	
	'\\{array\\}\\{l\\s*r\\s*c\\s*l\\}','\\{array\\}\\{r\\s*c\\s*l\\}','\\{array\\}\\{lc\\}','\\{array\\}\\{c\\}','\\{array\\}\\{l\\}','\\{array\\}','\\{align\\}'	
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
		["Nouvelexercice","New exercise"],
		["RéalisationJoëlGauvainLycéeRenéJosuéValin17000LaRochelle",
		 "Design by Joël Gauvain\nLycée René Josué Valin\n17000 La Rochelle"],
		["Donnerlesdeuxréels","Give the two reals "],
		["Dernierexercice","Last exercise"],
		[")de",") in "],
		["Inéquationn°","Inequation #"],
		["RAZ","Reset"],["RAZ(àcacher)","Reset (hide)"]
		
	]);
	updateFalsePair("IT",[
		["AI","AI"],
		["Réponsenonvalable",
		 "Risposta\nsbagliata"],
		[",affixedupointMdansleplancomplexe.",
		 ", posizione del punto M sul piano complesso."],
		["Leplanestmunid'unrepère(O;I;J).Danschaqueexercice,ilfautplacerunpointAconnaissantsescoordonnées.",
		 "Il piano è dotato di un riferimento (O;I;J). In ogni\nesercizio, un punto A deve essere collocato conoscendo\nle sue coordinate."],
		["Leplanestmunid'unrepère(O;I;J).Danschaqueexercice,ilfautlirelescoordonnéesd'unpointAdanslerepère(O;I;J).",
		 "Il piano è dotato di un riferimento (O;I;J). In ogni\nesercizio, le coordinate del punto A devono essere trovate"], 
		["AbscissedeA:","Ascissa di A:"],
		["OrdonnéedeA:","Ordinata di A:"],	
		["LepointAapourcoordonnées:","Il punto A ha coordinate:"],
		["Lesignedelaconstanteestfaux.","Il segno della costante è sbagliato."],
		["Juste","Giusto"],
		["JUSTE","Giusto"],
		[",affixedupointMdansleplancomplexe.",", immagine del punto M nel piano complesso"],
		["Donner","Dare"],
		["Nouvelénoncé","Nuovo esercizio"],
		["Nouvelexercice","Nuovo esercizio"],
		["RéalisationJoëlGauvainLycéeRenéJosuéValin17000LaRochelle",
		 "Autore: Joël Gauvain\nLycée René Josué Valin\n17000 La Rochelle"],
		["Donnerlesdeuxréels","Dare due numeri "],
		["Score:","Punteggio:"],
		["Score","Punteggio "],
		["Inéquationn°","Disequazione n°"],
		["Commencerlaséried'exercices","Iniziare"],
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
		["RAZ","Reset"],["RAZ(àcacher)","Reset (off)"],
		["Accueil","Inizio"],
		["Ici,commeilfaut","Qui"],
		["PlacerlepointAdecoordonnées","Portare A alle coordinate"],
		["Faux,cepointa","Falso, questo punto ha "],	
		["pourcoordonnées", "come coordinate"],
		["latenteàutiliservaut","latente vale"],["grammed'eau."," grammi d'acqua"],
		["onécritque:","osservo che:"],
		["saisir:sqrt(135)."," scrivere:sqrt(135) "],
		["Calculdedistancedansleplanmunid'unrepèreorthonormé","Calcola la distanza tra due punti"],
		["Leplanestmunid'unrepèreorthonormé", "Il piano ha un riferimento cartesiano"],
		["Leplanestmunid'unrepèredontlesaxesgraduéssontvisiblessur","Il piano e' dotato di un riferimento cartesiano come mostra "	],
		["simplelecturegraphique,lescoordonnéesduvecteur", "semplice lettura grafica, le componenti del vettore "],
		["alors:"," avremo:"],
		["représenté"," rappresentato"],
		["apourcoordonnées"," ha per coordinate "],
		["Démarrerlaséried'exercices","Inizia"],
		["dupointCde(AB)quia"," di C=(x,y) quando A,B,C sono allineati e "],
		["la"," "],
		["LepointAapourcoordonnées", " Il punto A ha per coordinate "],
		["etlepointBapourcoordonnées"," e il punto B ha per coordinate "],
		["apourcoordonnées", " ha per coordinate "],
		["Validercettedroite"," Convalidare questa retta "],
		["Marks","Punti"],
		["Run=","Escursione="],
		["Juste"," Giusto "],
		["exercicesréussissanserreursur"," esercizio riuscito su "],
		["Déterminerl'équationdeladroited"," Determinare l' equazione della retta d "],
		["Déterminerlapentedeladroited",' Determinare la pendenza della retta d '],
		["Déterminerl'ordonnéeàl'originedeladroited"," Determinare l' ordinata dell' intersezione della retta d con l' asse y " ],
		["Lapentedeladroiteestdonca="," La pendenza della retta d e' quindi "],
		["Lorsquelavaleurd'abscissevariede1"," Quando il valore dell' ascissa varia di 1 "],
		["lavaleurd'ordonnéevariede"," il valore dell' ordinata varia di "],
		["L'ordonnéeàl'originecorrespondàl'ordonnéedupoint"," L' ordinata all' origine corrisponde all' ordinata del punto "],
		["d'intersectiondeladroiteavecl'axedesordonnée", " di intersezione della retta con l' asse delle y "],
		["Déterminerl'équationdeladroited", " Determinare l' equazione della retta d "],
		["Ladroiteapouréquation:"," La retta ha equazione:"],
		["Votreéquationn'estpasuneéquationdedroite"," La vostra equazione non e' valida "],
		["Attention,saisieoutyped'équationnonvalide."," Attenzione, equazione non valida."],
		["coefficientdirecteur="," coefficiente direttore (pendenza)="],
		["etl'ordonnéeàl'origineestégaleà:"," e l' ordinata all' origine e':"],
		["Lecoefficientdirecteurvaut:"," Il coefficiente direttore (pendenza) vale:"],
		["ordonnéeàl'origine=divclass="," ordinata all' origine "],
		["Constructiondelasommededeuxvecteursaucompas","Costruzione della somma di due vettori con il compasso"],
		["Aapourcoordonnées"," A ha per coordinate "],
		["apouréquation"," ha come equazione "],
		["etAapourcoordonnées"," e A ha per coordinate "],
		["estl'uniquecouplesolution"," e' l' unica coppia soluzione "],
		["Or"," o "],
		["Juste"," Giusto "],
		["Dernierexercice"," Ultimo esercizio "],
		["Lesdeuxdroites", " Le due rette "],
		["passentpardespointsàcoordonnéesentièresetsontsécantesenA",
			" passano per dei punti di coordinate intere e sono secanti "],
		["CalculerlescoordonnéesexactesdupointAdecoordonnées:"," Calcolare la posizione esatta del punto A di coordinate "],
		["d'intersectiondedeuxdroitessécantesquipassentpardespointsàcoordonnéesentières.",
			" di intersezione di due rette secanti che passano per dei punti a coordinate intere. " ]
]);
}
function RT_inittrans() {
	RT_globsto("magic", "ZZ000");
}