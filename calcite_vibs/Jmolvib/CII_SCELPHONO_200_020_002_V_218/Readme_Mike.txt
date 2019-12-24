Ciao Mike!

How are you? I hope everything's fine. Here you find some notes 
concerning the creation of the web-animations of the vibrational 
modes of diamond. The procedure, thanks to the amazing work made 
by Yves, is quite straightforward: 

- Open MOZILLA (it is important, do not forget; this step works only with Mozilla). 

- Go to the following website: http://www.pmmp.jussieu.fr/yves/jmoledit2/

- This jmol editor allows you to open the CRYSTAL output of a frequency calculation. 

- This stage is up to the user and is the slowest part of the whole procedure: cutting 
the cell, understand which are the important atoms to be shown in the figure. 

- After you are satisfied of the results, save the corresponding XYZ-file. 

- One of the directories contained in this shared Dropbox folder is "Jmolvib". 
Basically, in order to create the nice web page with the animations of the normal modes 
you need to open the "index.html" web page with Safari (until it is not uploaded on a 
web server, you need Safari to see the resulting webpage).
The index.html is common for all the different structures and should not be modified. 
In order to generate the webpage for your structure of interest you need two files: 
- the myfile.XYZ file that you have created at the previous step and contains structure 
and modes; 
- the myfile.spt file, which is a JMOL script that allows you to draw the lines, set 
the labels, change the color of the atoms, and so on. The "drawc" function allows to 
automatically draw the lines of the cell. It must be added in all the myfile.spt 
scripts that you do, and the syntax is the following: 

drawc(@1,@2,@3,@4,@5,@6,@7,@8,'Mike_chose_a_name')

Atoms @X is the label of the atom and can vary when different structures are considered. 
The important thing is that they must have the following mutual orientation:

           7_________8
           /|       /|           
         6/_|_____5/ |
          | |      | |
          | |      | |
          | |3_____|_|4
          | /      | /
          |/_______|/
          2        1
 
The complete url address of the resulting webpage will be like this: 
file:///Users/simonesalustro/Dropbox/Yves_Paris/Jmolvib/index.html?name=myfile.xyz&spt=myfile.spt

and is built in three parts: 
1) file: Yves_Paris/Jmolvib/index.html
   Path where the index.html file is contained; 
2) ?name=myfile.xyz
   Add the myfile.xyz in order to load the structure and the modes; 
3) &spt=myfile.spt
   Add the myfile.spt Jmol script.

Tell me whether it is clear or not. 

Ciao, a presto!

SSSS
