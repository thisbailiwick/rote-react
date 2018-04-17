import MainEditor from '../components/MainEditor';
// import OriginalEditor from '../components/OriginalEditor';
// import wordMap from './wordMap';

export default class originalDisplay {

	constructor(){
		this.correct_count = 0;
		this.incorrect_count = 0;
		this.prefilled_starting_count = 0;
		this.percentage_correct = 0;
		this.percentage_display = document.getElementById('percentage_done');
		this.elements = [];
		this.default_classes = 'word';
		this.correct_classes = 'word correct';
		this.correct_temp_classes = 'correct_temp';
		this.incorrect_classes = 'word incorrect';
		this.deleted_classes = 'word deleted';
		this.fancy_classes = 'fancy';
	};

	// reset: function() {
	//     while (this.handle.firstChild) {
	//         this.handle.removeChild(this.handle.firstChild);
	//     }
	//     this.elements = []
	// };

	word_state_compare = (state, total_words) => {
		return this.elements[total_words].word_state == state;
	};

	set_correct = (total_words, set_fancy, prefilled) => {
		//only set the fancy class and mark this word as correct in the editor if this is a fully matched word
		if (!this.word_state_compare('correct', total_words) && set_fancy === true) {
			this.set_percentage_correct();
			this.elements[total_words].word_state = 'correct';
			return this.correct_classes + ' ' + this.fancy_classes;
		} else {
			if (prefilled === true) {
				this.set_percentage_correct_prefilled();
			}
			return this.correct_classes;
		}
	};

	set_correct_default = (total_words, prefilled) => {
		if (prefilled === true) {
			this.set_percentage_correct();
		}
		return this.default_classes + ' ' + this.correct_temp_classes;
	};

	set_incorrect = (total_words) => {
		this.set_percentage_correct();
		return this.incorrect_classes;
	};

	set_deleted = (total_words) => {
		//we are currently (02-27-2015) only setting this delete state when a word is correct. When word is incorrect we just keep it set as incorrect
		//If the state is not already temp_correct, we set it back.
		if (!this.word_state_compare('correct_temp', total_words)) {
			this.set_percentage_correct();
			this.elements[total_words].word_state = 'correct_temp';
			return this.default_classes + ' ' + this.correct_temp_classes + ' ' + this.fancy_classes;
		} else {
			return this.default_classes + ' ' + this.correct_temp_classes;
		}
	};

	set_percentage_correct = () => {
		window.setTimeout(function () {
			let correct_words = Array.prototype.filter.call(MainEditor.instance.querySelectorAll('.cm-correct, .cm-prefilled'), this.check_if_empty_word);
			this.percentage_correct = (correct_words / originalDisplay.original_length) * 100;
			this.percentage_display.innerText = this.percentage_correct;
		}, 10);

	};

	check_if_empty_word = (word) => {
		return !word.classList.contains('cm-empty');
	};
	set_percentage_correct_prefilled = () => {
		window.setTimeout(function () {
			this.percentage_correct = ((this.prefilled_starting_count - MainEditor.instance.querySelectorAll('.cm-empty.cm-prefilled').length) / this.prefilled_starting_count) * 100;
			this.percentage_display.innerText = this.percentage_correct;
		}, 10);
	};
}