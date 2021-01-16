import {instance} from './instance';

export const cardsAPI = {
  getCards() {
    return instance.get(`/cards`).then(res => res.data)

}
}