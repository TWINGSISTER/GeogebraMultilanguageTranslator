# Geogebra (GGB) Multi-language Translator
THIS README IS OUTDATED AND DOCUMENTATION IS MISSING
As for every one man project the code is running somehow you can
[try this here](https://twingsister.github.io/GeogebraMultilanguageTranslator/).
A working release is planned for September 2021.
Cheerio.

A Geogebra javascript package to create a multilanguage version of your ggb activities.
## Intro
In several repositories you can find a wealth of Geogebra activities. If they are served to students as they are, there could be the legitimate suspicion, the student will surely point out, that some lack in comprehension and poor student performance is due to the crystal clear fact that the activities are not in student's  native language.  The ongoing result is a painful worldwide effort to translate activities into several languages. 

In some framework (e.g. Moodle question banks), turning on  automatic translation within your browser can do the trick and present acceptable translation of school activities. 

With Geogebra this will not work. Furthermore, in many occasions, translating  a Geogebra activity require to get some grasp upon the developer logic and very often, if you are not the developer, to build a new activity from the scratch is easier than translating an existing one. 

This package tries to do its best to extract all textual elements from an activity, feed them through an online translator, record the translation and build some persistent machinery, in the Geogebra ggb document, to record the two (or more) linguistic versions of an activity within a single ggb file. This ggb, then  can be shipped as a standalone classrom activity. 

A proof of concept video is [here](https://www.youtube.com/watch?v=A8KA8vFJ0YQ)

This tool tries to generate automatically a translation using online translation.
The ggb document is scanned translating Text objects and captions. Object names and labels are left alone. However, using this toolset,  the user can still edit these  translations and merge them to obtain a multilanguage ggb. 

This package handles  multilanguage ggb supporting several languages within a single ggb document.
On the other hand, having slightly changed the logic of an activity, the user has the option to fix only strings in a particular language and ask for an update of  all the other translations. 

## Installation 
Copy the whole file hierarchy in this repository (i.e. .ggt, .html, .bat and .js files) in your workspace. Start the appropriate version of Geogebra using the provided .bat(s) and read the ggb(s) into Geogebra (see next section on Operations for details).
## Operations
You simply have to insert in your ggb one of the ggb files distributed with this package. To do this use the insert ggb facility in GGB Classic 5.   The names of the ggb in this package explain the intended Geogebra version to work with.
 
The ```xxx-n-browser-online.ggb``` files require the Geogebra classic browser, version n (i.e. n=5 or n=6 or none for don't care), and when loaded they download from the repository the latest version of this tool. 

The ```xxx-browser-local.ggb``` files require the Geogebra classic browser version and uses the local version  of the Javascript files in this package (you have downloaded). 

A version of this Geogebra classic browser version is not packaged with this repository and the provided .bat files assume the Geogebra code to be in a particular place. See the accompaining video for details about installing GGB for browser. 

If the ggb filename bears no ```-browser-online.ggb``` suffix, then the ggb should work also with the GGB desktop version, too. 
 
Please note that the Geogebra desktop classic version 5 is necessary, within the life cycle of a multilanguage activity, when merging translations. The steps for maintaining multilanguage is what comes next.

# Geogebra multilanguage activities life cycle
In the following we will detail the steps to obtain  a multilanguage ggb and the ggb document life cycle,  supported by this package. 

The steps in this life cycle correspond to the buttons you will see loading the ```translate-xxx.ggb``` document. Details about this are in the next paragraph 

## Translation
To start the translation you are required to load the document to be translated into Geogebra classic 5. This old version is used because it comes with the support for inserting ggb files and this disappeared from version 6. 

Then, after consulting in the activity to be translated,  you have to "insert" one of the ```translate-browser-xxx.ggb``` files. So press Open  and in the filename selection dialog choose for ```Insert file```, then select one of the ```translate-browser-xxx.ggb``` files. 

This insertion loads all the Javascript code and can take some time. When inserting is over, you will see a series of button, do not press them. Save this file with some name chosen from a standardized naming for your documents. I suggest ```my-activity-name-xxx-L1-L2-L3.ggb``` where xxx could be local or online and L1 is the (possibly ISO) code for the original language and L2 L3 the codes for the language of the translations. 

Next step is to close Geogebra Classic 5 and start some browser version using one of the provided .bat.  Then load the saved document and put in the Languages input field a comma separated list of the ISO  languages codes. The first code must be the code of the language of the original document. 

Then push translate. A translation is attempted. This is a lengthy step and several things can go wrong (see the tickets for advice). If you are lucky a window pop up (so window pop up must be enabled in the browser) and a log of the dialog with the online translator is produced. Probably is interesting to take a look at it to spot some troubles you can fix by hand by either configuring the translator (see the section on configuration)  or by editing the translation. 

If you are even more lucky the process terminates producing a valid multilanguage ggb without showing any pitfall in this (permanent alpha) version of this package. In the likely circumstance that this is not the case leave a ticket with the usual wealth of information (i.e. the ggb before and after). 

If this is not the case you then have a stack of small buttons on the top left corner. Right click to place them where they will not disturb the activity. Save this ggb adding a -tra suffix (e.g. -fr-en-it-tra.ggb). 

Keep this file since it will be the starting point either to revise the translations or the activity logic or to add more languages. 

In the following we will see that, to some extent, this package implements what could be an obvious requirement, i.e. that the logic of the activity and each added translation must be in a separate document (we called the "seed") and there should be some way to compose and "glue" them together.

Before going that far let's introduce the simplest scenario: take the multilanguage document and press some buttons.

## Multilanguage
Users can upload into Geogebra Classic 6 desktop or browser versions the file coming auto of the previous phase. 

Clicking on the Multilanguage button the language buttons are enabled and the user can switch from one language to another. To prepare the activity for an end-user one can hide or delete the  translate button and the other buttons, too. 

## Delete
This button deletes the support for the  language in the Languages field. If this is the current language the command aborts doing nothing. If, after delete,  just one language remains all the buttons can be deleted and we obtain a single language activity.

If even the last remaining language is deleted the document retains some strings but those using complex formulas. So the user may think this is going to work. Actually a document where all the languages has been deleted is doomed to fail. On the other hand, deleting all the language buttons, the document continues to work and is stuck at the last known language since no button remains to switch language. 

Deleting a language button without deleting the language is, as well, a bad practice since the document will contain unnecessary data for other languages that might slow down the activity. 

If you want to show the user a single language document and keep a multilanguage document under the hood, probably a good option is to hide all the button objects. 
## Rename
This command takes as input a code (e.g. xy) that you must write in the Languages field before the button is pressed. The code must not be the code for an existing translation (e.g. xy). When the button is pressed this command assigns the code xy to the current translation.
## Copy
This command takes as input a code (e.g. xy) that must be written in the Languages field. The code must not be the code for an existing translation (e.g. xy). When the button is pressed  this command clones the current translation and assign  code xy to it.
## Seed 
When this button is pressed all objects in the document are deleted but the strings of the current language (e.g. xx). 

Then, saving the activity as a 
```someactivity-xx-seed.ggb```, we have the option to insert this language translation in a multilanguage version of
```someactivity-xx-yy.ggb```. To do this we have to use Geogebra Classic 5 desktop version and insert file ```someactivity-xx-seed.ggb``` into the existing multilanguage version of ```someactivity-xx-seed.ggb```. To glue together the inserted "seed" one have to press the Plant button.
## Plant
This button works if you have just inserted the seed file  
```someactivity-xx-seed.ggb```. In this case it  links this translation to the rest of the document. Then you must press the Multilanguage button and will be able to select the added language xx.  

# Editing your translation 
When you press the "Translate" button the underlying Javascript code will do its best to translate all the phrases in the original .ggb document usign a (customizable) online translator. 

In the pop up window you can find the translation used to build a multilanguage version of your activity. Probably, in some cases, you are not satisfied with the translation. 

Now image that we have pressed Translate using string fr,it,en. The first language in the given string (e.g. in ```fr,it,en```) will be assumed as the original language (e.g. French). 

The strings in the original document are assumed to be in French and are not feed to the translator. The other codes in the given string (e.g. ```it``` and ```en```) will generate appropriate translations (i.e. into Italian and into English).
The online translator will receive the original string with the indication that they are in French.

Some translation string might require editing. The user can find the translated strings in the Algebra view as Geogebra Text Auxiliary objects with special names following the pattern ```ZZ000<languageCode><originalObjectName>```.

Therefore, for instance, if your .ggb contains a button named ```BoutonOui``` with caption "Oui" you will find in the Algebra View the strings
```ZZ000frBoutonOui``` with value "Oui" but also ```ZZ000itBoutonOui``` with value "Si" and ```ZZ000enBoutonOui``` with value "Yes". If you are not satisfied with this you can edit these strings and changes will be reflected in your Geogebra activity (e.g. you can put "Yeah!" into ```ZZ000enBoutonOui```).

If you save the file with the result of your work you will have a version of your activity that will preserve the translation you worked out. 

This .ggb it is ready to receive modified translations, too. If you modify the logic of the activity and ask for revising an already worked out translation the existing translation strings are not recomputed and only newly introduced  untranslated objects are translated and inserted. 
 
If you delete a translation string ```ZZ000enBoutonOui```  the relative object will be considered as untranslated and generated again the first time you ask to use an ```en``` translation. 

So, if you operate a single language .ggt you can safely delete all  the ```ZZ000<languagexx><originalObjectName>``` strings in the Algebra view if you are not interested in language "xx" anymore. This is
what the Delete button will do and this will make the ggb document more compact and responsive.   


## Known limitations
The translator tool works only in the Geogebra web version and could be tampered by the limitations of the online translator. 

In this case you will receive a message when you submit too many translations and need to retry the process from a computer with a different IP or later on next days. 

Some other problems might come from security limitations of the browser. You can circumvent it by running the Geogebra applet in Chrome with the option ```--disable-site-isolation-trials --disable-web-security``` 
e.g. in Windows ```"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-site-isolation-trials --disable-web-security --user-data-dir="I:\temp"```

## Configuration
There is a small number of selected places in this JS code where, even the unexperienced programmer, can do some editing to make the translator comply with the known style he  used in textual elements of a set of own ggb activities.

This configuration parameters are strings that are found either in the context of function calls or as assigment to variables. So in the following we list all possible configuration options referring them either as function call parameter or as expression in assignment.

### Assignment to variable ```dict```
The dictionary assigned to this variable can contain as values an array of  four 
strings.

By putting in the dictionary the line 
```"text":["(© ","\\(\\s*©\\s*"," ®)","\\s*®\\s*\\)"]``` we ask to preprocess the string before sending it to the translator by changing ```\text{``` and  ```}``` into 
```"(© "``` and  ```" ®)"```. The remaining two strings ```"\\(\\s*©\\s*"``` and ```"\\s*®\\s*\\)"``` are regexp to match the ```"(© "``` and  ```" ®)"``` strings when postprocessing the output of the translator to restore   ```\text{``` and  ```}```. 

This is necessary to prevent the translator  to translate LaTex commands as natural language elements.
### Parameters to ```updateFalsePair```
A call to 
```updateFalsePair("fr","en",[["Dernier exercice","Last year","Last Exercise"],...]``` instruct the post-processor to locate, in the untranslated French the exact string "Dernier exercice" and in the translation from "fr" to "en" the  exact string "Last year" and correct in English this to 
"Last Exercise".

## Eclipse Repository
The repository contains all files generated by Eclipse. By cloning this in Eclipse with Egit you will get an Eclipse project to modify and develop this package. 

The ```.launch``` files must be imported into Eclipse separately to get debug configurations.  
## Sysinternals
The file index.html loads the GGB activity ```translator.ggb``` into a GGB Applet that runs in a browser.
In most situations a standard browser is ok. Sometimes you need to run the browser from the command line adding some special parameters. 
For Chrome ```--disable-web-security --allow-no-sandbox-job --allow-sandbox-debugging  --no-sandbox  --no-sandbox-and-elevated  --no-zygote --no-zygote-sandbox --run-without-sandbox-for-testing --disable-popup-blocking   --user-data-dir="I:\temp"``` could help. 