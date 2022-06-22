import { defineStore } from 'pinia'
import axios from 'axios'

export const useMaarvelStore = defineStore({
  id: 'marvel',
  state: () => ({
    url: 'http://localhost:5550/marvel',
    characterId: 0,
    character: [],
    imageUrl: '',
    name:'',
    description: '',
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    //* GET DETAIL
    // async getDetailCharacter() {
    //   try {
    //     console.log('haiiii >>>>>', this.characterId);
    //     const { data } = await axios.get(`${this.url}/characters/${this.characterId}`)

    //     // console.log(data);
    //     // console.log(data.data.results, '<><><><><>');
    //     const result = data.data.results
    //     result.forEach((el) => {
    //       el.url = `${el.thumbnail.path}/${this.size}`;
    //       this.character.push(el);
    //       console.log(el);
    //     });

    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  }
})
