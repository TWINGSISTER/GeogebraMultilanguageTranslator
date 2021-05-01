/**
 * http://usejsdoc.org/
 */
function ResetTo(...args) {
}
function nextQuiz() {
	var quizzes=RT_globlod("quizzes");
	RT_globsto("quizzies",quizzes+1);
	alert("foo");
	RT_lod("grade");
}
