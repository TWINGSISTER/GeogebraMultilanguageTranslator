# GeogebraMultilanguageTranslator
A Geogebra Custom Tool to add translations to a multilanguage version of your activities

In this repository you will find two distinct Geogebra tools into two distinct .ggt files. translator.ggt and multilanguage.ggt.
The translator tool add a translate button to Geogebra. Upon loading your exercise in Geogebra you are promped to add a comma separated string (e.g. fr,it,en) and to press the "Translate" button. The underlying Javascript code will do its best to translate all the phrases in the original document usign a (cusotmizable) online translator. The first language in the given string (e.g. fr,it,en) will be assumed the original language (i.e. French) and the strings in the original are assumed to be in French and not feed to the translator. The other codes (e.g. it,en) will generate appropriate translations. The user can find the franslated strings in the Algebra view as Geogebra strings objects   
