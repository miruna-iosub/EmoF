class AllStatistics {
    fieldName;
    mapEmotions;
    totalNumberCategory;


    constructor(fieldName) {
        this.fieldName = fieldName;
        this.mapEmotions = new Map();
        this.mapEmotions.set('vigilance', 0);
        this.mapEmotions.set('anticipation', 0);
        this.mapEmotions.set('interest', 0);
        this.mapEmotions.set('rage', 0);
        this.mapEmotions.set('anger', 0);
        this.mapEmotions.set('annoyance', 0);
        this.mapEmotions.set('loathing', 0);
        this.mapEmotions.set('disgust', 0);
        this.mapEmotions.set('boredom', 0);
        this.mapEmotions.set('grief', 0);
        this.mapEmotions.set('sadness', 0);
        this.mapEmotions.set('pensiveness', 0);
        this.mapEmotions.set('amazement', 0);
        this.mapEmotions.set('surprise', 0);
        this.mapEmotions.set('distraction', 0);
        this.mapEmotions.set('terror', 0);
        this.mapEmotions.set('fear', 0);
        this.mapEmotions.set('apprehension', 0);
        this.mapEmotions.set('admiration', 0);
        this.mapEmotions.set('trust', 0);
        this.mapEmotions.set('acceptance', 0);
        this.mapEmotions.set('ecstasy', 0);
        this.mapEmotions.set('joy', 0);
        this.mapEmotions.set('serenity', 0);

    }

    addOneEmotion(emotion) {
        let oldVal = this.mapEmotions.get(emotion);
        this.mapEmotions.delete(emotion);
        this.mapEmotions.set(emotion, oldVal + 1);
        console.log(this.mapEmotions.toString());
    }

    setNumberInCategory(number) {
        this.totalNumberCategory = number;
    }

}

module.exports = (AllStatistics);