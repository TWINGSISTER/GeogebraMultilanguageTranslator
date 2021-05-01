/**
 * http://usejsdoc.org/
 * @copyright TWINGSISTER 2021  (licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.) 
 * @author TWINGSISTER (twingsister@gmail.com) 
 */
function ResetTo(...args) {
}
function nextQuiz() {
	var quizzes=RT_globlod("quizzes");
	RT_globsto("quizzies",quizzes+1);
	alert("foo");
	RT_lod("grade");
}
