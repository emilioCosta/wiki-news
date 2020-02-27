import axios from 'axios';

export default {
  getWikipedia() {
    return axios.get('https://en.wikipedia.org/w/api.php?&origin=*&action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json');
  }
}