import Vue from "vue"
import { parseISO, format } from 'date-fns'

const getRandomArbitrary = (min, max) => {
    return parseInt(Math.random() * (max - min) + min)
}

Vue.filter('fromNowAgo', function (value) {
    const parseDate = (parseISO(value));

    return format(parseDate, 'MMM dd, yyyy') + " - " + `${getRandomArbitrary(1, 5)}m read time`
})