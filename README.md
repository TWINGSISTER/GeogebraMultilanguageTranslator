# Geogebra Multi-language Translator
A Geogebra Custom Tool to create a multi-language version of your activities

In this repository you will find two distinct Geogebra tools into two distinct .ggt files. ```translator.ggt``` and ```multilanguage.ggt```. The first file add a translator tool.

## Translator
The translator tool add a translate button to Geogebra. Upon loading your exercise in Geogebra you are required to add a comma separated string (e.g. ```fr,it,en```). Then you have to press the "Translate" button. The underlying Javascript code will do its best to translate all the phrases in the original .ggb document usign a (customizable) online translator. 

The first language in the given string (e.g. in ```fr,it,en```) will be assumed the original language (i.e. French). The strings in the original document are assumed to be in French and are not feed to the translator. The other codes in the given string (e.g. ```it``` and ```en```) will generate appropriate translations (i.e. into Italian and into English). The user can find the translated strings in the Algebra view as Geogebra strings objects with special names following the pattern ```ZZ000<languageCode><originalObjectName>``` therefore for instance if your .ggb contains a button named ```BoutonOui``` with caption "Oui" you will find in the Algebra View the strings
```ZZ000frBoutonOui``` with value "Oui" but also ```ZZ000itBoutonOui``` with value "Si" and ```ZZ000enBoutonOui``` with value "Yes". If not satisfied you can edit these strings and changes will be reflected in your Geogebra activity (e.g. you can put "Yeah!" into ```ZZ000enBoutonOui```).

If you save the file with the result of your work you will have a version of your activity that will preserve the translation you worked out. This .ggb it is ready to receive more translations. If you modify the logic of the activity and ask for an already worked out translation the existing translations are not recomputed and only newly introduced  untranslated objects are updated.  
If you delete a translation string ```ZZ000enBoutonOui```  the relative oobject will be considered as untranslated and generated again the first time you ask for an ```en``` translation.

## Multi-language 
So far this machinery can assist you in producing multi-language version of your Geogebra activities. You can save your multi-language document without the translate tool and reload it in  Geogebra (eitehr application or applet) where you installed the ```multilanguage.ggt``` and you will have the option to switch language in a multi-language environment. If no tool at all is loaded the activity will retain the language in use at the time of ggt file saving. If you operate a single language .ggt you can safely delete all  the ```ZZ000<languageXX><originalObjectName>``` strings in the Algebra view if you are not interested in language "XX".  

## Known limitations
The translator tool works only in the Geogebra Applet version and could be tampered by the limitations of the online translator.
In this case you will receive a message when you submit too many translations and need to retry the process from a computer with a different IP or later on next days. Some other problems might come from security limitations of the browser. You can circumvent it by running the Geogebra applet in Chrome with the option ```--disable-site-isolation-trials --disable-web-security``` 
e.g. in Windows ```"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-site-isolation-trials --disable-web-security --user-data-dir="I:\temp"```

## Configuration
To do...
