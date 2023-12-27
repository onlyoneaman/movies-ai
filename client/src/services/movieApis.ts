import { helpers } from '../helpers'

const movieApis = {
  getMovies: async (params: any, headers: any = {}) => {
    return helpers.api.get({
      url: '/movies',
      params: params,
      headers: headers
    })
  },
}

export default movieApis;
