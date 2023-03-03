# Geogebra (GGB) Preprocessor
This repo offers  three online services that modify .ggb GGB files. The three services are 
a Translator to build a multilingial version of an existing GGB activities and a Reporter that adds facility to track students work and output student's progress as an HTML file containing a set of PDF snapshots of the student's activity. The third service is an extension of the second that supports batch 
operations for editing a bunch of ggb files that needs some bookkeping to fit in a certain scheme. 
# Geogebra (GGB) Report Support
This first package in this repo offers an online services to modify Geogebra (GGB) .ggb files. The repository contains all the 
code to run these services. You can use it online or copy this locally. If you use the local version you  must load the index
files into a browser that has relaxed security constrants. See the attached .bat files for the right options for Chrome.
The main service provides a  Geogebra javascript package to create a report aware  version of your ggb activities.
[Try this package here](https://twingsister.github.io/GeogebraMultilanguageTranslator/index-private-687-wreporter.html).
You can find an example of the resulting GGB activity [here](https://twingsister.github.io/GeogebraMultilanguageTranslator/examplereport.html). 
This activity is taken from [here](href="http://www.lycee-valin.fr/maths/exercices_en_ligne/moodle.html).
In this exercise you can do something and then  press the button SNAP to snapshot what is on the screen. 
Before closing you press SAVE to compact these snapshots "within" the .ggb file. 

You can save the .ggb  reload it and the snapshots will still be there and you can add more. 
You can download a printout of the snapshots anytime as an HTML file containing one PDF for each snapshot. You will obtain this  by pressing REPORT.  
A proof of concept video is [here](https://youtu.be/75jz8ql19-U).
The GGB activities packaged with this service try their best to snapshot heuristically and automatically. This will be effective if user provides some hints about the names of the variables used in the GGB script for this activity. 
[Docs on heuristics here](https://twingsister.github.io/GeogebraMultilanguageTranslator/indexheurdocreport.html).
You can find an example of the resulting GGB activity [here](https://twingsister.github.io/GeogebraMultilanguageTranslator/examplereport.html).
# Geogebra (GGB) Multi-language Translator
This second package in this repo offers a second online services to modify Geogebra (GGB) .ggb files. The repository contains all the 
code to run these services. You can use it online or copy this locally. If you use the local version you  must load the index
files into a browser that has relaxed security constrants. See the attached .bat files for the right options for Chrome.
The main service provides a  Geogebra javascript package to create a multilanguage version of your ggb activities.
[Try this package here](https://twingsister.github.io/GeogebraMultilanguageTranslator/indexGGBver.html).
A [more detailed documentation about the translator is here](https://twingsister.github.io/GeogebraMultilanguageTranslator/indexGGBver.html). 
You can find an example of the resulting GGB activity [here](https://twingsister.github.io/GeogebraMultilanguageTranslator/example.html) 
that is taken from [here](href="http://www.lycee-valin.fr/maths/exercices_en_ligne/moodle.html). and [here](https://twingsister.github.io/GeogebraMultilanguageTranslator/origexample.html) 
A proof of concept video is [here](https://www.youtube.com/watch?v=A8KA8vFJ0YQ)

In the link you will find different demo systems based on different Geogebra 5.0 versions.
You can set up your self hosted version of this Multi-language translator by copying the HTML
in index-somestring.html  you can find in the root directory of this repo.
You can upgrade your installation to the last Geogebra 5.0 build that is found [here](https://download.geogebra.org/package/geogebra-math-apps-bundle).
I maintain an archive of a few of these GGB bundles [here](https://github.com/TWINGSISTER/Geogebra-Javascript-Bundle) just in the case that you find yourself in a lesson and your applet do not work anymore.
Download a bundle and then unzip into the Geogebra folder so that you have the file 
Geogebra\geogebra-math-apps-bundle-5-0-nnn-x\GeoGebra\deployggb.js. 
Then do some editing to  point your index.html to it. 
If you run into problems and you really need a personal copy of these services just fork this repo!
# Geogebra (GGB) One Step Adapter (OSA)
This third package in this repo offers a third online services to modify Geogebra (GGB) .ggb files. The repository contains all the 
code to run these services. You can use it online or copy this locally. If you use the local version you  must load the index
files into a browser that has relaxed security constrants. See the attached .bat files for the right options for Chrome.
This OSA service provides a  Geogebra javascript package to create a single step version of your ggb activities. This works on a batch of .ggb files and turns a set of  GGB activities that  propose a repetition of several randomized tests into a set of GGB activities that just propose one quiz and stop. 
This OSA is convenient when integrated with reporting provided by the plugin version of question type for geogebra [here](https://github.com/TWINGSISTER/moodle-qtype_geogebra). The OSA service can be run on the spot  [Try this package here](https://twingsister.github.io/GeogebraMultilanguageTranslator/index-private-latest-OSA.html).
A [more detailed documentation about the OSA is here](https://twingsister.github.io/GeogebraMultilanguageTranslator/indexGGBOSAver.html). 
You can find an example of the resulting GGB activity [here](https://twingsister.github.io/GeogebraMultilanguageTranslator/example-osa.html) 
that is taken from [here](href="http://www.lycee-valin.fr/maths/exercices_en_ligne/moodle.html) and [here](https://twingsister.github.io/GeogebraMultilanguageTranslator/origexample-osa.html) 

All the materials in this site, unless specifically noted, are (c) by  TWINGSISTER.
 and are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License. 
You should have received a copy of the license along with this
work.  If not, see <http://creativecommons.org/licenses/by-nc-sa/3.0/>.

Translated materials retain the copyright of the untranslated version as noted in the README file of each particular folder storing translated materials.