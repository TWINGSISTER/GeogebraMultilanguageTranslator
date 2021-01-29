# GeogebraMultilanguageTranslator
A Geogebra Custom Tool to add translations to a multilanguage version of your activities

In this repository you will find two distinct Geogebra tools into two distinct .ggt files. translator.ggt and multilanguage.ggt.
The translator tool add a translate button to Geogebra. Upon loading your exercise in Geogebra you are promped to add a comma separated string (e.g. fr,it,en) and to press the "Translate" button. The underlying Javascript code will do its best to translate all the phrases in the original document usign a (cusotmizable) online translator. The first language in the given string (e.g. fr,it,en) will be assumed the original language (i.e. French) and the strings in the original are assumed to be in French and not feed to the translator. The other codes (e.g. it,en) will generate appropriate translations. The user can find the franslated strings in the Algebra view as Geogebra strings objects .

The translator tool works only in the Geogebra Applet version and could be tampered by the limitations of the online translator.
In this case you will receive a message when you submit too many translations and need to retry the process from a computer with a different IP or later on next days. Some other problems might come from security limitations of the browser. You can circumvent it by running the Geogebra applet in Chrome with the option '''--disable-site-isolation-trials --disable-web-security''' 
e.g. in Windows '''"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-site-isolation-trials --disable-web-security --user-data-dir="I:\temp"'''
