/**
 * Created by Administrator on 2016/7/19.
 */
var Pet = {
    words: '...',
    speak: function (say) {
        console.log(say + ' ' + this.words);
    }
};

var Dog = {
    words: 'wang'
};

Pet.speak.call(Dog, 'Speak');

function PetEx(words) {
    this.words = words;
    this.speak = function () {
        console.log(this.words);
    }
}

function DogEx(words) {
    PetEx.call(this, words);
}

var dog = new DogEx('wang');
dog.speak();